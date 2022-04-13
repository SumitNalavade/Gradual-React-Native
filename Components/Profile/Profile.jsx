import { useEffect, useState, useContext } from "react";
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet, View } from "react-native";
import StudentInfo from "./StudentInformation.jsx";
import CoursesInfo from "./CoursesInformation.jsx";
import GPAOverlay from "./GPAOverlay.jsx";
import { getPredictedGPA, storeStudent } from "../../utils.js";
import { userDetailsContext } from "../userDetailsProvider";


export default function Profile({ navigation }) {
    const [userDetails, setUserDetails] = useContext(userDetailsContext);

    const [selfStudent, setStudent] = useState(userDetails)
    const [GPAS, setGPAS] = useState({finalWeightedGPA: "...", finalUnweightedGPA: "..."  })

    const [isVisible, setIsVisible] = useState(false)

    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    useEffect( async () => {
        navigation.setOptions({ title: userDetails.info.name, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white" });
    }, [])

    const updateStudent = async(selectedItem, courseName, type) => {
        const studentCopy = {...userDetails}

        const studentToUpdateIndex = studentCopy.classes.findIndex(course => course.name === courseName);

        type === "credits" ? studentCopy.classes[studentToUpdateIndex].credits = parseFloat(selectedItem)  : studentCopy.classes[studentToUpdateIndex].weight = parseFloat(selectedItem)

        setUserDetails(studentCopy)
    }

    const updateGrade = (courseName, newGrade) => {
        const studentCopy = {...userDetails}
        const studentToUpdateIndex = studentCopy.classes.findIndex(course => course.name === courseName);

        studentCopy.classes[studentToUpdateIndex].grade = newGrade;

        setUserDetails(studentCopy);
    }

    const toggleClass = (c) => {
        const studentCopy = {...userDetails}

        const courseToUpdateIndex = studentCopy.classes.findIndex(course => course === c);
        const courseToUpate = studentCopy.classes[courseToUpdateIndex]

        courseToUpate.disabled == false ? courseToUpate.disabled = true : courseToUpate.disabled == true ? courseToUpate.disabled = false : courseToUpate.disabled = true

        setUserDetails(studentCopy);
    }

    const predictGPA = async() => {
        setIsVisible(true);

        let { finalWeightedGPA, finalUnweightedGPA } = await getPredictedGPA(userDetails)

        setGPAS({finalWeightedGPA: finalWeightedGPA.toFixed(3), finalUnweightedGPA: finalUnweightedGPA.toFixed(3)})
    }

    return (
        <SafeAreaView >

            <GPAOverlay isVisible={isVisible} setIsVisible={setIsVisible} setGPAS={setGPAS} gpas={GPAS} />

            <ScrollView>
                <StudentInfo studentInfo={userDetails.info}/>

                <CoursesInfo student={userDetails} updateStudent={updateStudent} toggleClass={toggleClass} predictGPA={predictGPA} updateGrade={updateGrade}/>

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