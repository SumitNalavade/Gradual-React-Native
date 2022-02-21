import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import AssignmentsList from "./AssignmentsList";
import Donut from "./Donut";

export default function ClassDetails({ navigation, route }) {
    const [doomsdayCalcActive, setDoomsdayCalcActive] = useState(false);

    useEffect(() => {
        navigation.setOptions({ title: course.courseName, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" })
    }, [])
    
    const { course } = route.params;

    const [allAssignments, setAllAssignments] = useState(course.assignments);
    
    const allMajorAssignments = allAssignments.filter(assignment => assignment["category"] === "Major Grades")
    const allMinorAssignments = allAssignments.filter(assignment => assignment["category"] === "Minor Grades")
    const allNonGradedAssignments = allAssignments.filter(assignment => assignment["category"] === "Non-graded")

    const validMajorAssignments = allMajorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validMinorAssignments = allMinorAssignments.filter(assignment => parseFloat(assignment["score"]));

    const majorAssignmentsGrade = validMajorAssignments.reduce((previousValue, currentValue) => (previousValue += parseFloat(currentValue["score"])/validMajorAssignments.length), 0).toFixed(2);
    const minorAssignmentsGrade = validMinorAssignments.reduce((previousValue, currentValue) => previousValue += parseFloat(currentValue["score"]/validMinorAssignments.length), 0).toFixed(2)
    
    const finalGrade = ((majorAssignmentsGrade * 0.6) + (minorAssignmentsGrade * 0.4)).toFixed(2)

    const calcGrade = (newAssignment, newGrade) => {
        const assignmentsCopy = [...course.assignments]

        const assignmentToUpdateIndex = assignmentsCopy.findIndex(assignment => assignment === newAssignment);
        assignmentsCopy[assignmentToUpdateIndex].score = newGrade

        setAllAssignments(assignmentsCopy);
    }

    return (
        <ScrollView contentContainerStyle={{justifyContent: "space-between"}} style={{backgroundColor: "white"}}>
            <Donut percentage={finalGrade} />
            
            <TouchableOpacity style={styles.button} onPress={() => {
                setDoomsdayCalcActive(!doomsdayCalcActive)
            }}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 12}}>Doomsday Calculator</Text>
            </TouchableOpacity>

            <AssignmentsList assignments={allMajorAssignments} type="Major Grades" totalGrade={majorAssignmentsGrade} doomsdayCalcActive={doomsdayCalcActive} calcGrade={calcGrade}/>
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades" totalGrade={minorAssignmentsGrade} doomsdayCalcActive={doomsdayCalcActive} calcGrade={calcGrade}/>
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