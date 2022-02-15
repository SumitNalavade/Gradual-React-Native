import { useEffect } from "react";
import { View, Text } from "react-native";
import AssignmentsList from "./AssignmentsList";

export default function ClassDetails({ navigation, route }) {
    const { course } = route.params;
    
    const allMajorAssignments = course["assignments"].filter(assignment => assignment["category"] === "Major Grades")
    const allMinorAssignments = course["assignments"].filter(assignment => assignment["category"] === "Minor Grades")

    const validMajorAssignments = allMajorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validMinorAssignments = allMinorAssignments.filter(assignment => parseFloat(assignment["score"]));

    const majorAssignmentsGrade = validMajorAssignments.reduce((previousValue, currentValue) => (previousValue += parseFloat(currentValue["score"])/validMajorAssignments.length), 0);
    const minorAssignmentsGrade = validMinorAssignments.reduce((previousValue, currentValue) => previousValue += parseFloat(currentValue["score"]/validMinorAssignments.length), 0)

    useEffect(() => {
        navigation.setOptions({ title: course.courseName, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" })
    }, [])

    return (
        <View style={{height: "100%", display: "flex", justifyContent: "flex-start" ,backgroundColor: "white" }}>
            <AssignmentsList assignments={allMajorAssignments} type="Major Grades"/>
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades"/>
        </View>
    )
}