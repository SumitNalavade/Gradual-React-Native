import { useEffect } from "react";
import { TouchableOpacity, Text, View, SafeAreaView } from "react-native";
import StudentInfo from "./StudentInformation.jsx";

export default function Profile({ navigation, route }) {

    const { studentInfo } = route.params;

    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    useEffect(() => {
        navigation.setOptions({ title: studentInfo.name })
    }, [])

    return (

        <SafeAreaView >
            <StudentInfo studentInfo={studentInfo}/>

            <TouchableOpacity onPress={() => navigateToHome()}>
                <Text style={{color: "red", textAlign: "center", marginTop: 40, width: "90%", backgroundColor: "white", margin: "auto", padding: 10, borderRadius: 10}}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>


        
    )
}