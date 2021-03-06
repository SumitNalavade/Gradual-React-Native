import { useEffect, useState } from "react";
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet, View } from "react-native";
import StudentInfo from "./StudentInformation.jsx";
import CoursesInfo from "./CoursesInformation.jsx";
import GPAOverlay from "./GPAOverlay.jsx";
import { getPredictedGPA, storeStudent } from "../../utils.js";

export default function Profile({ navigation, route }) {
    const { student } = route.params
    const [selfStudent, setStudent] = useState(student)
    const [GPAS, setGPAS] = useState({finalWeightedGPA: "...", finalUnweightedGPA: "..."  })
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    useEffect( async () => {
        navigation.setOptions({ title: student.info.name, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" });
    }, [])

    const updateStudent = async(selectedItem, courseName, type) => {
        const studentCopy = {...selfStudent}

        const studentToUpdateIndex = studentCopy.classes.findIndex(course => course.name === courseName);

        type === "credits" ? studentCopy.classes[studentToUpdateIndex].credits = parseFloat(selectedItem)  : studentCopy.classes[studentToUpdateIndex].weight = parseFloat(selectedItem)

        setStudent(studentCopy)
    }

    const updateGrade = (courseName, newGrade) => {
        const studentCopy = {...selfStudent}
        const studentToUpdateIndex = studentCopy.classes.findIndex(course => course.name === courseName);

        studentCopy.classes[studentToUpdateIndex].grade = newGrade;

        setStudent(studentCopy);
    }

    const toggleClass = (c) => {
        const studentCopy = {...selfStudent}

        const courseToUpdateIndex = studentCopy.classes.findIndex(course => course === c);
        const courseToUpate = studentCopy.classes[courseToUpdateIndex]

        courseToUpate.disabled == false ? courseToUpate.disabled = true : courseToUpate.disabled == true ? courseToUpate.disabled = false : courseToUpate.disabled = true

        setStudent(studentCopy);
    }

    const predictGPA = async() => {
        setIsVisible(true);
        setIsLoading(true);

        let { finalWeightedGPA, finalUnweightedGPA } = await getPredictedGPA(selfStudent);
        setGPAS({finalWeightedGPA: finalWeightedGPA.toFixed(3), finalUnweightedGPA: finalUnweightedGPA.toFixed(3)});

        setIsLoading(false);
    }

    return (
        <SafeAreaView >

            <GPAOverlay isVisible={isVisible} setIsVisible={setIsVisible} gpas={GPAS} isLoading={isLoading} />

            <ScrollView>
                <StudentInfo studentInfo={student.info}/>

                <CoursesInfo student={student} updateStudent={updateStudent} toggleClass={toggleClass} predictGPA={predictGPA} updateGrade={updateGrade}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigateToHome()
                        storeStudent(null)
                    }}>
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