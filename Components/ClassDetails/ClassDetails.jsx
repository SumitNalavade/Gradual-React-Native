import { useEffect, useState, useRef } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import AssignmentsList from "./AssignmentsList";
import { storeClass, readClass } from "../../utils";
import ClassAverage from "./ClassAverage";
import AddTransaction from "../AddAssignment/AddAssignment";

export default function ClassDetails({ navigation, route }) {
    useEffect(async() => { 
        navigation.setOptions({ title: course.courseName, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" });
        await storeClass(course.assignments)
    }, [])

    console.log(allAssignments);

    const [doomsdayCalcActive, setDoomsdayCalcActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { course } = route.params;

    const [allAssignments, setAllAssignments] = useState(course.assignments);

    const allMajorAssignments = allAssignments.filter(assignment => assignment["category"] === "Major Grades")
    const allMinorAssignments = allAssignments.filter(assignment => assignment["category"] === "Minor Grades")
    const allNonGradedAssignments = allAssignments.filter(assignment => assignment["category"] === "Non-graded")

    const validMajorAssignments = allMajorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validMinorAssignments = allMinorAssignments.filter(assignment => parseFloat(assignment["score"]));

    const majorAssignmentsGrade = validMajorAssignments.reduce((previousValue, currentValue) => (previousValue += parseFloat((currentValue["score"] / currentValue["totalPoints"]) * 100)/validMajorAssignments.length), 0).toFixed(2);
    const minorAssignmentsGrade = validMinorAssignments.reduce((previousValue, currentValue) =>( previousValue += parseFloat((currentValue["score"] / currentValue["totalPoints"]) * 100)/validMinorAssignments.length), 0).toFixed(2)
    
    const addAssignment = (name, grade, category) => {
        const assignmentsCopy = [...allAssignments]
        assignmentsCopy.push({assignment: name, score: grade, category, totalPoints: "100.0"})
        setAllAssignments(assignmentsCopy);
    }

    const updateAssignments = (newAssignment, newGrade) => {
        const assignmentsCopy = [...allAssignments]

        const assignmentToUpdateIndex = assignmentsCopy.findIndex(assignment => assignment.assignment === newAssignment.assignment);
        assignmentsCopy[assignmentToUpdateIndex].score = newGrade

        setAllAssignments(assignmentsCopy);
    }

    const reset = async() => {
        setAllAssignments(await readClass());
    }

    return (
        <ScrollView contentContainerStyle={{justifyContent: "space-between"}} style={{backgroundColor: "white"}}>
            <ClassAverage majorAssignmentsGrade={majorAssignmentsGrade} minorAssignmentsGrade={minorAssignmentsGrade} percentage={doomsdayCalcActive ? ((majorAssignmentsGrade * 0.6) + (minorAssignmentsGrade * 0.4)).toFixed(2) : course.grade} />
            
            <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 15}}>
                <TouchableOpacity style={styles.button} onPress={async() => {
                    setDoomsdayCalcActive(!doomsdayCalcActive);
                    await reset();
                }}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 12}}>{doomsdayCalcActive ? "Reset" : "Doomsday Calculator"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { alignSelf: "flex-end", display: doomsdayCalcActive == true ? "flex" : "none" }]} onPress={async() => {
                    setModalVisible(true);
                }}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 12}}>Add Assignment</Text>
                </TouchableOpacity>
            </View>

            <AssignmentsList assignments={allMajorAssignments} type="Major Grades" totalGrade={majorAssignmentsGrade} doomsdayCalcActive={doomsdayCalcActive} updateAssignments={updateAssignments} />
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades" totalGrade={minorAssignmentsGrade} doomsdayCalcActive={doomsdayCalcActive} updateAssignments={updateAssignments} />
            <AssignmentsList assignments={allNonGradedAssignments} type="Non Graded" totalGrade=""/>

            <AddTransaction modalVisible={modalVisible} setModalVisible={setModalVisible} addAssignment={addAssignment} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#00C801",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      margin: 12,
      alignSelf: "flex-start"
    }
})