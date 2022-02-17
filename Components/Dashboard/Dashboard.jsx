import { useEffect } from "react";
import { SafeAreaView, } from "react-native";

import DashboardHeader from "./DashboardHeader";
import DashboardClassList from "./DashboardClassList";

export default function Dashboard({ route, navigation }) {
    const { student } = route.params;
    const {info, classes, schedule } = student
    
    let finalWeightedGPA = 0;
    let finalUnweightedGPA = 0

    if(student.finalWeightedGPA) {
        finalWeightedGPA = student.finalWeightedGPA
    }

    if(student.finalUnweightedGPA) {
        finalUnweightedGPA = student.finalUnweightedGPA
    }

    const navigateToClassDetails = (course, courseInfo) => {
        return navigation.navigate("Class Details", { course: { ...course, ...courseInfo } })
    }

    const navigateToProfile = () => {
        return navigation.navigate("Profile", { student: student });
    }
      
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
            <DashboardHeader info={info} finalWeightedGPA={finalWeightedGPA.toFixed(3)} finalUnweightedGPA={finalUnweightedGPA.toFixed(3)} navigateToProfile={navigateToProfile} />
            <DashboardClassList classes={classes} schedule={schedule} navigateToClassDetails={navigateToClassDetails} />
        </SafeAreaView>
    )
}
