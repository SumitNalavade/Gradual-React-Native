import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import gradualIcon from "../../assets/gradualIcon.png";

import LoginForm from './LoginForm';
import { getStudentData, getPredictedGPA, infoURL, scheduleURL, currentClassesURL, gpaURL } from "../../utils";

export default function LoginScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    const student = {
        info: "",
        schedule: "",
        gpa: 0,
        classes: ""
    }

    const loginFormSubmitted = async (username, password) => {    
        setIsLoading(true)
     
        try {
          await Promise.all([getStudentData(username, password, infoURL), getStudentData(username, password, scheduleURL), getStudentData(username, password, currentClassesURL)]).then((values) => {
            updateStudentData(values[0], "info");
            updateStudentData(values[1].schedule, "schedule");
            updateStudentData(values[2].currentClasses, "classes");
          })
        } catch {
            setIsLoading(false);
          return alert("Login Error");
        }
    
        try {
          await getStudentData(username, password, gpaURL).then((res) => updateStudentData(res, "gpa"))
          var { finalWeightedGPA, finalUnweightedGPA } = await getPredictedGPA(student).catch((error) => console.log(error));
        } catch {
          console.log("GPA Fetch Error");
        } finally {
            setIsLoading(false)
        }
        
        return navigation.navigate("Dashboard", { student: { ...student, finalWeightedGPA, finalUnweightedGPA } })
     };


     const updateStudentData = (newData, prop) => {
        if(!newData) { return alert("Login Error")};
    
        student[prop] = newData;
    
        return student[prop];
      };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{padding: 10}}>
            <View style={styles.logoContainer}>
                <Image source={gradualIcon} style={{width: 30, height: 30, margin: 5}}/>
                <Text style={{margin: 5, fontSize: 20}}>Gradual</Text>
            </View>

                <Text style={{fontSize: 45, marginBottom: 50}}>Connect to your grades</Text>

                <LoginForm loginFormSubmitted={loginFormSubmitted} isLoading={isLoading}/>
            <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        fontFamily: 'SF-Pro-Rounded-Regular'
    },


  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 15
  }
});
