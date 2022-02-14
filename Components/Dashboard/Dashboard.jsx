import { useEffect } from "react";
import { SafeAreaView } from "react-native";

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

    useEffect(() => { 
        navigation.setParams({ 
            headerTitle: "Hello"
        }) 
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <DashboardHeader info={info} finalWeightedGPA={finalWeightedGPA.toFixed(3)} finalUnweightedGPA={finalUnweightedGPA.toFixed(3)} />
            <DashboardClassList classes={classes} />
        </SafeAreaView>
    )
}
