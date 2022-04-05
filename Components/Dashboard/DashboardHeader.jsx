import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function DashboardHeader({ student, navigateToProfile }) {
    const studentName = student.info["name"].split(" ")[1];
    
    const currentHour = new Date().getHours()
    const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <View style={[styles.container]}>
            <Text style={styles.greetingText}>{greeting} {studentName}</Text>
            <TouchableOpacity onPress={() => navigateToProfile()}>
                <Text style={{fontSize: 18, marginTop: 10, fontWeight: "bold", color: "#00C801"}}>Live GPA</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        paddingVertical: 30
    },

    greetingText: {
        fontSize: 25
    }
})