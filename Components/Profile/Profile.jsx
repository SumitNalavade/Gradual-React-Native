import { useEffect, useState } from "react";
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentInfo from "./StudentInformation.jsx";
import CoursesInfo from "./CoursesInformation.jsx";

export default function Profile({ navigation, route }) {

    const [student, setStudent] = useState(route.params.student);

    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('student')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        // error reading value
        }
    }


    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    useEffect( async () => {
        const { student } = route.params;
        setStudent(student);
        navigation.setOptions({ title: student.info.name });
    }, [])

    console.log(student.info);

    return (
        <SafeAreaView >
            <ScrollView>
                <StudentInfo studentInfo={student.info}/>

                <CoursesInfo courses={student.classes} />

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