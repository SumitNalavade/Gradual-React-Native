import { useEffect } from "react";
import { ScrollView } from "react-native";
import AssignmentsList from "./AssignmentsList";
import ClassAverage from "./ClassAverage"; 

export default function ClassDetails({ navigation, route }) {
    useEffect(() => {
        navigation.setOptions({ title: course.courseName, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" })
    }, [])
    
    const { course } = route.params;

    const allMajorAssignments = course["assignments"].filter(assignment => assignment["category"] === "Major Grades")
    const allMinorAssignments = course["assignments"].filter(assignment => assignment["category"] === "Minor Grades")
    const allNonGradedAssignments = course["assignments"].filter(assignment => assignment["category"] === "Non-graded")

    const validMajorAssignments = allMajorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validMinorAssignments = allMinorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validNonGradedAssignments = course["assignments"].filter(assignment => parseFloat(assignment["score"]))

    const majorAssignmentsGrade = validMajorAssignments.reduce((previousValue, currentValue) => (previousValue += parseFloat(currentValue["score"])/validMajorAssignments.length), 0).toFixed(2);
    const minorAssignmentsGrade = validMinorAssignments.reduce((previousValue, currentValue) => previousValue += parseFloat(currentValue["score"]/validMinorAssignments.length), 0).toFixed(2)
    const nonGradedAssignmentsGrade = validNonGradedAssignments.reduce((previousValue, currentValue) => previousValue += parseFloat(currentValue["score"]/validNonGradedAssignments.length), 0).toFixed(2)
    
    return (
        <ScrollView contentContainerStyle={{justifyContent: "space-between"}} style={{backgroundColor: "white"}}>
            <ClassAverage majorAssignmentsGrade={majorAssignmentsGrade} minorAssignmentsGrade={minorAssignmentsGrade} totalGrade={parseFloat(course.grade)} />
            
            <AssignmentsList assignments={allMajorAssignments} type="Major Grades" totalGrade={majorAssignmentsGrade}/>
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades" totalGrade={minorAssignmentsGrade}/>
            <AssignmentsList assignments={allNonGradedAssignments} type="Non Graded" totalGrade={nonGradedAssignmentsGrade}/>
        </ScrollView>
    )
}