import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";

export default function Assignment({name, score, totalPoints, doomsdayCalcActive, updateAssignments}) {
    var finalGrade = null
    parseFloat(score) && totalPoints ? finalGrade = ((score/totalPoints)*100).toFixed(2) : finalGrade = score

    const color = parseFloat(finalGrade) >= 90 ? "#30d158" : parseFloat(finalGrade) >= 80 ? "#ffd60a" : "#ff443a";

    const [grade, setGrade] = useState(finalGrade);

    useEffect(() => {
        if(!doomsdayCalcActive) { setGrade(finalGrade) }
    })

    return (
            <View style={{marginVertical: 20, flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontSize: 15, width: "80%"}}>{name}</Text>
                <Text style={{color: color, justifyContent: "center", textAlign: "center" ,width: "20%" ,display: doomsdayCalcActive == true ? "none" : "flex"}}>{finalGrade}</Text>
                <TextInput
                    value={grade}
                    keyboardType = 'numeric'
                    onChangeText={(newGrade) => {
                        setGrade(newGrade);
                        updateAssignments({assignment:name, score, totalPoints}, newGrade)
                    }}
                    style={{backgroundColor: "#f0f0f0", width: "20%", textAlign: "center", borderRadius: 5, height: 20, color: color, display: doomsdayCalcActive == true ? "flex" : "none"}}
                />
            </View>
    )
}
