import { useEffect, useState, useContext } from "react";
import { SafeAreaView, TouchableOpacity, ActivityIndicator} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { useQuery } from "react-query";

import DashboardHeader from "./DashboardHeader";
import Tabview from "./Tabview";
import { userDetailsContext } from "../userDetailsProvider";

export default function Dashboard({ navigation }) {
    const [userDetails, setUserDetails] = useContext(userDetailsContext); //Pull the logged in user out of the global state context
    const { username, password } = userDetails
     
    const [index, setIndex] = useState(3);
    const [loading, setIsLoading] = useState({0: true, 1: true, 2: true, 3: false});

    useEffect(() => {    
        navigation.setOptions({ title: ``, headerStyle: { backgroundColor: "#30d158" }, headerTintColor: "white", headerRight: () => <TouchableOpacity onPress={() => navigateToProfile()}>
        <Ionicons name="person-outline" size={24} color="white" />
</TouchableOpacity>, headerLeft: () => <TouchableOpacity onPress={() => getClassesByQuarter(index, username, password).then((res) => handleDataFetch(res))}>
        <Ionicons name="ios-refresh" size={24} color="white" style={{ display: isFetching == true ? "none" : "flex"}} />
        <ActivityIndicator size="small" color="white" style={{ display: isFetching == true ? "flex" : "none"}} />
</TouchableOpacity>})
    })

    const getClassesByQuarter = async() => {
        const { data } =  await refetch();
        return data.currentClasses;
    }

    const { isFetching, error, data, refetch } = useQuery('repoData', async() => {
        const { data } = await axios.get(`https://gradual-deploy.vercel.app/students/pastassignments?username=${username}&password=${password}&quarter=${index + 1}`)
        return data
    }, {
        refetchOnWindowFocus: false,
        enabled: false // needed to handle refetchs manually
      });

    const handleDataFetch = (newData) => {
        const studentDataCopy = {...userDetails};
        studentDataCopy.classes = newData;
        setUserDetails(studentDataCopy);
    }

    const navigateToClassDetails = (course, courseInfo) => {
        return navigation.navigate("Class Details", { course: { ...course, ...courseInfo } })
    }

    const navigateToProfile = () => {
        return navigation.navigate("Profile");
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
            <DashboardHeader userDetails={userDetails} navigateToProfile={navigateToProfile} />
            
            <Tabview navigateToClassDetails={navigateToClassDetails} getClassesByQuarter={getClassesByQuarter} index={index} setIndex={setIndex} loading={loading} setIsLoading={setIsLoading} />
        </SafeAreaView>
    )
}
