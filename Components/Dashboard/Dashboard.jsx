import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, ActivityIndicator} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import Tabview from "./Tabview";

export default function Dashboard({ route, navigation }) {
    const { student } = route.params;
    const { username, password } = student
     
    const [index, setIndex] = useState(3);
    const [isLoading, setIsLoading] = useState({0: true, 1: true, 2: true, 3: false});
    const [mainLoading, setMainLoading] = useState(false);
    const [studentData, setStudentData] = useState(student);

    useEffect(() => {    
        navigation.setOptions({ title: ``, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white", headerRight: () => <TouchableOpacity onPress={() => navigateToProfile()}>
        <Ionicons name="person-outline" size={24} color="white" />
</TouchableOpacity>, headerLeft: () => <TouchableOpacity onPress={() => loadData(index, username, password).then((res) => updateStudentData(res))}>
        <Ionicons name="ios-refresh" size={24} color="white" style={{ display: mainLoading == true ? "none" : "flex"}} />
        <ActivityIndicator size="small" color="white" style={{ display: mainLoading == true ? "flex" : "none"}} />
</TouchableOpacity>})
    })

    const loadData = async(index, username, password) => {
        setMainLoading(true);

        const pastAssignments = await axios.get(`https://gradual-deploy.vercel.app/students/pastassignments?username=${username}&password=${password}&quarter=${index + 1}`);
    
        const { currentClasses } = pastAssignments.data;

        setMainLoading(false);        
        return currentClasses
    }

    const updateStudentData = (newData) => {
        const studentDataCopy = {...student};
        studentDataCopy.classes = newData;
        setStudentData(studentDataCopy);
    }


    const navigateToClassDetails = (course, courseInfo) => {
        return navigation.navigate("Class Details", { course: { ...course, ...courseInfo } })
    }

    const navigateToProfile = () => {
        return navigation.navigate("Profile", { student: student });
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
            <DashboardHeader student={student} navigateToProfile={navigateToProfile} />
            
            <Tabview username={username} password={password} navigateToClassDetails={navigateToClassDetails} loadData={loadData} index={index} setIndex={setIndex} studentData={studentData} setStudentData={setStudentData} isLoading={isLoading} setIsLoading={setIsLoading} />
        </SafeAreaView>
    )
}
