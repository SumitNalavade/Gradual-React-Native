import { useEffect } from "react";
import { ScrollView } from "react-native";
import AssignmentsList from "./AssignmentsList";
import ClassInformation from "./ClassInformation";

export default function ClassDetails({ navigation, route }) {
    useEffect(() => {
        navigation.setOptions({ title: course.courseName, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" })
    }, [])
    
    const { course } = route.params;

    const allMajorAssignments = course["assignments"].filter(assignment => assignment["category"] === "Major Grades")
    const allMinorAssignments = course["assignments"].filter(assignment => assignment["category"] === "Minor Grades")

    const validMajorAssignments = allMajorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const validMinorAssignments = allMinorAssignments.filter(assignment => parseFloat(assignment["score"]));
    const nonValidAssignments = course["assignments"].filter(assignment => assignment["category"] === "Non-graded")

    const majorAssignmentsGrade = validMajorAssignments.reduce((previousValue, currentValue) => (previousValue += parseFloat(currentValue["score"])/validMajorAssignments.length), 0);
    const minorAssignmentsGrade = validMinorAssignments.reduce((previousValue, currentValue) => previousValue += parseFloat(currentValue["score"]/validMinorAssignments.length), 0)

    return (
        <ScrollView contentContainerStyle={{justifyContent: "space-between"}} style={{backgroundColor: "white"}}>
            <AssignmentsList assignments={allMajorAssignments} type="Major Grades"/>
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades"/>
            <AssignmentsList assignments={nonValidAssignments} type="Non Graded"/>

            <ClassInformation course={course} />
        </ScrollView>
    )
}