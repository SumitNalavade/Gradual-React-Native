import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";

export default function AssignmentsList({ assignments, type }) {

    return (
        <View style={{padding: 10, marginBottom: 50}}>
            <Text style={styles.header}>{type}</Text>
            <View>
                { assignments.map((assignment) => {
                    const { assignment:name, score } = assignment
                    const color = parseFloat(score) >= 90 ? "#30d158" : parseFloat(score) >= 80 ? "#ffd60a" : "#ff443a";

                    return (
                        <View key={assignments.indexOf(assignment)} >
                            <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 20}}>
                                <Text style={{flexWrap: "wrap"}}>{name}</Text>
                                <Text style={{color: color}}>{score}</Text>
                            </View>
                            <Divider />
                        </View>
                    )
                }) }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: "bold"
    }
})