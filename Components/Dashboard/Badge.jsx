import { StyleSheet, Text, View } from "react-native";

export default function Badge({ grade, color }) {
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.badge}>{grade}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 30,
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center"
    },
    
    container: {
        borderRadius: 10,
    }
})