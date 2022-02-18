import { useEffect } from "react";
import { SafeAreaView, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import DashboardHeader from "./DashboardHeader";
import DashboardClassList from "./DashboardClassList";

export default function Dashboard({ route, navigation }) {
    const { student } = route.params;
    const {info, classes, schedule } = student
    
    useEffect(() => {    
        navigation.setOptions({ title: ``, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white", headerRight: () => <TouchableOpacity onPress={() => navigateToProfile()}>
        <Ionicons name="person-outline" size={24} color="white" />
    </TouchableOpacity>})
    }, [])

    const navigateToClassDetails = (course, courseInfo) => {
        return navigation.navigate("Class Details", { course: { ...course, ...courseInfo } })
    }

    const navigateToProfile = () => {
        return navigation.navigate("Profile", { student: student });
    }
      
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
            <DashboardHeader student={student} info={info} navigateToProfile={navigateToProfile} />
            <DashboardClassList classes={classes} schedule={schedule} navigateToClassDetails={navigateToClassDetails} />
        </SafeAreaView>
    )
}
