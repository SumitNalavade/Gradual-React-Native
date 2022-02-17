import { useEffect } from "react";
import { TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import StudentInfo from "./StudentInformation.jsx";
import CoursesInfo from "./CoursesInformation.jsx";

export default function Profile({ navigation, route }) {

    const { student } = route.params;
    const { info, classes } = student

    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    useEffect(() => {
        navigation.setOptions({ title: info.name })
    }, [])

    return (

        <SafeAreaView >
            <ScrollView>
                <StudentInfo studentInfo={info}/>

                <CoursesInfo courses={classes} />

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