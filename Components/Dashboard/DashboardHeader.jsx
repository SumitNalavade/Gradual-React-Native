import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function DashboardHeader({ info, finalWeightedGPA, finalUnweightedGPA, navigateToProfile }) {
    const studentName = info["name"].split(" ")[1];
    
    const currentHour = new Date().getHours()
    const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <View style={[styles.container, styles.shadowProp]}>
            <View style={styles.upperContainer}>
                <TouchableOpacity onPress={() => navigateToProfile()}>
                    <Ionicons name="person-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.greetingText}>{greeting} {studentName}</Text>

            <View style={{marginTop: 10}}>
                <Text>Weighted GPA: {finalWeightedGPA}</Text>
                <Text>Unweighted GPA: {finalUnweightedGPA}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        paddingTop: 30
    },

    upperContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20
    },

    greetingText: {
        fontSize: 25
    },

    gpaText: {
        fontSize: 5,
        color: "#888"
    },
    
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }
})