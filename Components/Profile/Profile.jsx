import { useEffect, useState } from "react";
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet, View } from "react-native";
import { Overlay } from "react-native-elements";
import StudentInfo from "./StudentInformation.jsx";
import CoursesInfo from "./CoursesInformation.jsx";
import { getPredictedGPA } from "../../utils.js";

export default function Profile({ navigation, route }) {
    const { student } = route.params
    const [selfStudent, setStudent] = useState(student)
    const [GPAS, setGPAS] = useState({finalWeightedGPA: "...", finalUnweightedGPA: "..."  })

    const [isVisible, setIsVisible] = useState(false)

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

        let { finalWeightedGPA, finalUnweightedGPA } = await getPredictedGPA(selfStudent)

        setGPAS({finalWeightedGPA: finalWeightedGPA.toFixed(3), finalUnweightedGPA: finalUnweightedGPA.toFixed(3)})
    }

    return (
        <SafeAreaView >
            <Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} style={styles.overlay}>
                <View style={{paddingHorizontal: 50, paddingVertical: 30}}>
                    <View style={{marginVertical: 30, borderRadius: 15}}>
                        <Text style={{textAlign: "center"}}>Weighted GPA</Text>
                        <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center"}}>{GPAS.finalWeightedGPA}</Text>
                    </View>

                    <View style={{marginVertical: 30}}>
                        <Text style={{textAlign: "center"}}>Unweighted GPA</Text>
                        <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center"}}>{GPAS.finalUnweightedGPA}</Text>
                    </View>
                </View>
            </Overlay>

            <ScrollView>
                <StudentInfo studentInfo={student.info}/>

                <CoursesInfo student={student} updateStudent={updateStudent} toggleClass={toggleClass} predictGPA={predictGPA}/>

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
    },

    overlay: {
        width: 300
    }
  });