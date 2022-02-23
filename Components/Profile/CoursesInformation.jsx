import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import CreditsWeightSelect from "./CreditsWeightSelect";

export default function CoursesInfo( { student, updateStudent, toggleClass, predictGPA, updateGrade } ) {
    return (
        <View style={{backgroundColor: "white", padding: 8}}>
            <TouchableOpacity style={styles.button} onPress={() => predictGPA()}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Predict GPA</Text>
                </TouchableOpacity>
            {student.classes.map((course) => {
                const courseName = course.name.split("-")[1].substring(2).trim();

                const [grade, setGrade] = useState(course.grade);

                return (
                    <View key={student.classes.indexOf(course)} style={[ {marginVertical: 15} ,course.disabled ? styles.disabled : ""]}>
                        <TouchableOpacity onPress={() => toggleClass(course)}>
                            <Ionicons name="remove-circle-outline" size={24} color="red" />
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold", color: "#444444", marginBottom: 10}}>{courseName}</Text>


                        <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                            <Text style={{width: "80%", color: "#444444"}}>Grade</Text>

                            <TextInput
                                value={String(grade)}
                                keyboardType = 'numeric'
                                onChangeText={(newGrade) => {
                                    setGrade(newGrade);
                                    updateGrade(course.name, newGrade)
                                }}

                                style={{width: "20%", textAlign: "center", backgroundColor: "#f0f0f0", borderRadius: 5, height: 20}}
                            />
                        </View>

                        <Divider />

                        <CreditsWeightSelect type="Weight" course={course} student={student} updateStudent={updateStudent} />

                            <Divider />

                        <CreditsWeightSelect type="Credits" course={course} student={student} updateStudent={updateStudent} />

                        <Divider />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "#888"
    },

    disabled: {
        opacity: 0.5
    },
    
    button: {
      alignItems: "center",
      backgroundColor: "#00C801",
      padding: 10,
      borderRadius: 10,
      alignSelf: "flex-end",
    }
})