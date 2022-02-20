import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Divider } from "react-native-elements";

export default function ClassInformation({ course }) {

    const { teacher, building, periods, room, credits, weight } = course

    return (
        <SafeAreaView style={{marginHorizontal: 10}}>
            <Text style={[styles.header, styles.label]}>Class Info</Text>

            <View style={{marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.muted}>Teacher</Text>
                <Text style={styles.label}>{teacher}</Text>
            </View>

            <Divider />

            <View style={{marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.muted}>Building</Text>
                <Text style={styles.label}>{building}</Text>
            </View>

            <Divider />

            <View style={{flexDirection: "row", marginVertical: 10}}>
                <View style={{width: "47%", flexDirection: "row", justifyContent: "space-between", marginRight: 11}}>
                    <Text style={styles.muted}>Period</Text>
                    <Text style={styles.label}>{periods}</Text>
                </View>

                <View style={{width: "47%", flexDirection: "row", justifyContent: "space-between", marginLeft: 11}}>
                    <Text style={styles.muted}>Room Number</Text>
                    <Text style={styles.label}>{room}</Text>
                </View>
            </View>

            <Divider />

            <View style={{flexDirection: "row", marginVertical: 10}}>
                <View style={{width: "47%", flexDirection: "row", justifyContent: "space-between", marginRight: 11}}>
                    <Text style={styles.muted}>Credits</Text>
                    <Text style={styles.label}>{credits}</Text>
                </View>

                <View style={{width: "47%", flexDirection: "row", justifyContent: "space-between", marginLeft: 11}}>
                    <Text style={styles.muted}>Weighting</Text>
                    <Text style={styles.label}>{weight}</Text>
                </View>
            </View>
        </SafeAreaView>
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