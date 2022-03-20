import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Divider } from "react-native-elements";
import Assignment from "./Assignment";

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

                                return (
                                    <View key={assignments.indexOf(assignment)} >
                                       <Assignment name={name} score={score} totalPoints={totalPoints} doomsdayCalcActive={doomsdayCalcActive} updateAssignments={updateAssignments} />
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