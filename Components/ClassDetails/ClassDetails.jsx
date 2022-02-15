import { useEffect } from "react";
import { ScrollView } from "react-native";
import AssignmentsList from "./AssignmentsList";
import ClassInformation from "./ClassInformation";

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
        <ScrollView contentContainerStyle={{justifyContent: "space-between"}}>
            <AssignmentsList assignments={allMajorAssignments} type="Major Grades"/>
            <AssignmentsList assignments={allMinorAssignments} type="Minor Grades"/>

            <ClassInformation course={course} />
        </ScrollView>
    )
}