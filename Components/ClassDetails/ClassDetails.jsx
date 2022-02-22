import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import AssignmentsList from "./AssignmentsList";
import { storeStudent, readStudent } from "../../utils";
import Donut from "./Donut";

export default function ClassDetails({ navigation, route }) {
    useEffect(async() => {
        navigation.setOptions({ title: course.courseName, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" });
        await storeStudent(course.assignments);
    }, [])

    const [doomsdayCalcActive, setDoomsdayCalcActive] = useState(false);

    const { course } = route.params;

    const [allAssignments, setAllAssignments] = useState(course.assignments);

    const allMajorAssignments = allAssignments.filter(assignment => assignment["category"] === "Major Grades")
    const allMinorAssignments = allAssignments.filter(assignment => assignment["category"] === "Minor Grades")
    const allNonGradedAssignments = allAssignments.filter(assignment => assignment["category"] === "Non-graded")

    const validMajorAssignments = allMajorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validMinorAssignments = allMinorAssignments.filter(assignment => parseFloat(assignment["score"]));

    const majorAssignmentsGrade = validMajorAssignments.reduce((previousValue, currentValue) => (previousValue += parseFloat((currentValue["score"] / currentValue["totalPoints"]) * 100)/validMajorAssignments.length), 0).toFixed(2);
    const minorAssignmentsGrade = validMinorAssignments.reduce((previousValue, currentValue) =>( previousValue += parseFloat((currentValue["score"] / currentValue["totalPoints"]) * 100)/validMinorAssignments.length), 0).toFixed(2)
    
    const updateAssignments = (newAssignment, newGrade) => {
        const assignmentsCopy = [...course.assignments]

        const assignmentToUpdateIndex = assignmentsCopy.findIndex(assignment => assignment.assignment === newAssignment.assignment);
        assignmentsCopy[assignmentToUpdateIndex].score = newGrade

        setAllAssignments(assignmentsCopy);
    }

    const reset = async() => {
        setAllAssignments(await readStudent())
    }

    return (
        <ScrollView contentContainerStyle={{justifyContent: "space-between"}} style={{backgroundColor: "white"}}>
            <Donut percentage={doomsdayCalcActive ? ((majorAssignmentsGrade * 0.6) + (minorAssignmentsGrade * 0.4)).toFixed(2) : course.grade} />
            
            <TouchableOpacity style={styles.button} onPress={async() => {
                setDoomsdayCalcActive(!doomsdayCalcActive);
                await reset();
            }}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 12}}>{doomsdayCalcActive ? "Reset" : "Doomsday Calculator"}</Text>
            </TouchableOpacity>

            <AssignmentsList assignments={allMajorAssignments} type="Major Grades" totalGrade={majorAssignmentsGrade} doomsdayCalcActive={doomsdayCalcActive} updateAssignments={updateAssignments}/>
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades" totalGrade={minorAssignmentsGrade} doomsdayCalcActive={doomsdayCalcActive} updateAssignments={updateAssignments}/>
            <AssignmentsList assignments={allNonGradedAssignments} type="Non Graded" totalGrade=""/>
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
      alignSelf: "flex-end",
      margin: 12
    }
})