import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

export default function ClassInformation({ course }) {

    const { teacher, building, periods, room, credits, weight } = course

    return (
        <View>
            <View style={{marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text>Teacher</Text>
                <Text>{teacher}</Text>
            </View>

            <Divider />

            <View style={{marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text>Building</Text>
                <Text>{building}</Text>
            </View>

            <Divider />

            <View style={{flexDirection: "row", marginVertical: 10}}>
                <View style={{width: "50%", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text>Period</Text>
                    <Text>{periods}</Text>
                </View>

                <View style={{width: "50%", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text>Room Number</Text>
                    <Text>{room}</Text>
                </View>
            </View>

            <Divider />

            <View style={{flexDirection: "row", marginVertical: 10}}>
                <View style={{width: "50%", flexDirection: "row", justifyContent: "space-between", paddingRight: 10}}>
                    <Text>Credits</Text>
                    <Text>{credits}</Text>
                </View>

                <View style={{width: "50%", flexDirection: "row", justifyContent: "space-between", paddingRight: 10}}>
                    <Text>Weighting</Text>
                    <Text>{weight}</Text>
                </View>
            </View>
        </View>
    )
}
