import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import CreditsWeightSelect from "./CreditsWeightSelect";

export default function CoursesInfo( { student, updateStudent, toggleClass, predictGPA } ) {
    return (
        <View style={{backgroundColor: "white", padding: 8}}>
            <TouchableOpacity style={styles.button} onPress={() => predictGPA()}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Predict GPA</Text>
                </TouchableOpacity>
            {student.classes.map((course) => {
                const courseName = course.name.split("-")[1].substring(2).trim();

                return (
                    <View key={student.classes.indexOf(course)} style={[ {marginVertical: 15} ,course.disabled ? styles.disabled : ""]}>
                        <TouchableOpacity onPress={() => toggleClass(course)}>
                            <Ionicons name="remove-circle-outline" size={24} color="red" />
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold", color: "#444444", marginBottom: 10}}>{courseName}</Text>

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