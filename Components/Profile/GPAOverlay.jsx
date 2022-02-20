import { Overlay } from "react-native-elements/dist/overlay/Overlay"
import { View, Text } from "react-native";

export default function GPAOverlay({isVisible, setIsVisible, setGPAS, gpas}) {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={() => {
            setIsVisible(false)
            setGPAS({finalWeightedGPA: "...", finalUnweightedGPA: "..."  })
        }} style={{width: 400}}>
            <View style={{paddingHorizontal: 50, paddingVertical: 30}}>
                <View style={{marginVertical: 30, borderRadius: 15}}>
                    <Text style={{textAlign: "center"}}>Weighted GPA</Text>
                    <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center"}}>{gpas.finalWeightedGPA}</Text>
                </View>

                <View style={{marginVertical: 30}}>
                    <Text style={{textAlign: "center"}}>Unweighted GPA</Text>
                    <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center"}}>{gpas.finalUnweightedGPA}</Text>
                </View>
            </View>
        </Overlay>
    )
}