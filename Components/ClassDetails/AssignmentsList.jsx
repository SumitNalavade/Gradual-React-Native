import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Divider } from "react-native-elements";

export default function AssignmentsList({ assignments, type, totalGrade, doomsdayCalcActive, updateAssignments }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{margin: 10, marginBottom: 50}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={[styles.header, { color: "#444444" }]}>{type}</Text>
                    <Text style={[styles.header, { color: parseFloat(totalGrade) >= 90 ? "#30d158" : parseFloat(totalGrade) >= 80 ? "#ffd60a" : "#ff443a" }]}>{totalGrade}</Text>
                </View>
                    
                        <View>
                            { assignments.map((assignment) => {
                                const { assignment:name, score, totalPoints } = assignment;

                                var finalGrade = null
                                parseFloat(score) && totalPoints ? finalGrade = String((score/totalPoints)*100) : finalGrade = score

                                const color = parseFloat(finalGrade) >= 90 ? "#30d158" : parseFloat(finalGrade) >= 80 ? "#ffd60a" : "#ff443a";

                                const [grade, setGrade] = useState(finalGrade);

                                useEffect(() => {
                                    if(!doomsdayCalcActive) { setGrade(finalGrade) }
                                })

                                return (
                                    <View key={assignments.indexOf(assignment)} >
                                        <View style={{marginVertical: 20, flexDirection: "row", alignItems: "center"}}>
                                            <Text style={{fontSize: 15, width: "80%"}}>{name}</Text>
                                            <Text style={{color: color, justifyContent: "center", width: "20%" ,display: doomsdayCalcActive == true ? "none" : "flex"}}>{finalGrade}</Text>
                                            <TextInput
                                                value={grade}
                                                keyboardType = 'numeric'
                                                onChangeText={(newGrade) => {
                                                    setGrade(newGrade);
                                                    updateAssignments(assignment, newGrade)
                                                }}
                                                style={{backgroundColor: "#f0f0f0", width: "20%", textAlign: "center", borderRadius: 5, height: 20, color: color, display: doomsdayCalcActive == true ? "flex" : "none"}}
                                            />
                                        </View>
                                        <Divider />
                                    </View>
                                )
                            }) }
                        </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: "bold",
    }
})