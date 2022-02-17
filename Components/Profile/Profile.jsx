import { useEffect } from "react";
import { TouchableOpacity, Text, View, SafeAreaView } from "react-native";
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
            <StudentInfo studentInfo={info}/>

            <CoursesInfo courses={classes} />

            <TouchableOpacity onPress={() => navigateToHome()}>
                <Text style={{color: "red", textAlign: "center", marginTop: 40, width: "90%", backgroundColor: "white", margin: "auto", padding: 10, borderRadius: 10}}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>


        
    )
}