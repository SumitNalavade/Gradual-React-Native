import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Divider } from "react-native-elements";

export default function StudentInfo({ studentInfo }) {

    const { id, grade, campus, birthdate } = studentInfo
    
    return (
        <View style={{margin: 20, backgroundColor: "white", padding: 20, borderRadius: 10}}>

            <View style={{flexDirection: "row", marginVertical: 10}}>
                <View style={{width: "47%", flexDirection: "row", justifyContent: "space-between", marginRight: 11}}>
                    <Text style={styles.muted}>Student ID</Text>
                    <Text style={styles.label}>{id}</Text>
                </View>

                <View style={{width: "47%", flexDirection: "row", justifyContent: "space-between", marginLeft: 11}}>
                    <Text style={styles.muted}>Grade</Text>
                    <Text style={styles.label}>{grade}</Text>
                </View>
            </View>
        
            <Divider />
        
            <View style={{marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.muted}>Campus</Text>
                <Text style={styles.label}>{campus}</Text>
            </View>

            <Divider />

            <View style={{marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.muted}>Birthdate</Text>
                <Text style={styles.label}>{birthdate}</Text>
            </View>

            <Divider />

        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "#444444"
    },

    muted: {
        color: "#6c757d"
    },

    header: {
        fontSize: 20,
        fontWeight: "bold"
    }
})