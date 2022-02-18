import { useEffect, useState } from "react";
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import StudentInfo from "./StudentInformation.jsx";
import CoursesInfo from "./CoursesInformation.jsx";
import { getPredictedGPA } from "../../utils.js";

export default function Profile({ navigation, route }) {
    const { student } = route.params
    const [selfStudent, setStudent] = useState(student)

    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    useEffect( async () => {
        navigation.setOptions({ title: student.info.name });
    }, [])

    const updateStudent = async(selectedItem, courseName, type) => {
        const studentCopy = {...selfStudent}

        const studentToUpdateIndex = studentCopy.classes.findIndex(course => course.name === courseName);

        type === "credits" ? studentCopy.classes[studentToUpdateIndex].credits = parseFloat(selectedItem)  : studentCopy.classes[studentToUpdateIndex].weight = parseFloat(selectedItem)

        setStudent(studentCopy)
        
        console.log(await getPredictedGPA(studentCopy))
    }

    return (
        <SafeAreaView >
            <ScrollView>
                <StudentInfo studentInfo={student.info}/>

                <CoursesInfo courses={student.classes} student={student} updateStudent={updateStudent}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigateToHome()}>
                    <Text style={{color: "red"}}>Sign out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "white",
      padding: 15,
      margin: 20,
      borderRadius: 10
    }
  });