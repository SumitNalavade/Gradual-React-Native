import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import DashboardHeader from "./DashboardHeader";
import Tabview from "./Tabview";

export default function Dashboard({ route, navigation }) {
    const { student } = route.params;
    
    useEffect(() => {    
        navigation.setOptions({ title: ``, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white", headerRight: () => <TouchableOpacity onPress={() => navigateToProfile()}>
        <Ionicons name="person-outline" size={24} color="white" />
</TouchableOpacity>, headerLeft: () => <View></View>})
    }, [])

    const navigateToClassDetails = (course, courseInfo) => {
        return navigation.navigate("Class Details", { course: { ...course, ...courseInfo } })
    }

    const navigateToProfile = () => {
        return navigation.navigate("Profile", { student: student });
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
            <DashboardHeader student={student} navigateToProfile={navigateToProfile} />
            
            <Tabview student={student} navigateToClassDetails={navigateToClassDetails} />
        </SafeAreaView>
    )
}
