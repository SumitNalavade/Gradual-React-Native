import { useState } from "react";
import { Overlay } from "react-native-elements/dist/overlay/Overlay"
import { View, Text, ActivityIndicator } from "react-native";

export default function GPAOverlay({isVisible, setIsVisible, gpas, isLoading}) {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={() => {
            setIsVisible(false)
        }} style={{width: 400}}>
            <View style={{paddingHorizontal: 50, paddingVertical: 30}}>
                <View style={{marginVertical: 30, borderRadius: 15}}>
                    <Text style={{textAlign: "center"}}>Weighted GPA</Text>
                    <ActivityIndicator size="small" color="#30d158" style={{display: isLoading == true ? "flex" : "none"}} />
                    <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center", display: isLoading == true ? "none" : "flex"}}>{gpas.finalWeightedGPA}</Text>
                </View>

                <View style={{marginVertical: 30}}>
                    <Text style={{textAlign: "center"}}>Unweighted GPA</Text>
                    <ActivityIndicator size="small" color="#30d158" style={{display: isLoading == true ? "flex" : "none"}} />
                    <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center", display: isLoading == true ? "none" : "flex"}}>{gpas.finalUnweightedGPA}</Text>
                </View>
            </View>
        </Overlay>
    )
}