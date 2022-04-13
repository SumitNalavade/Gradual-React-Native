import { View, Text, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import gradualIcon from "../assets/gradualIcon.png";

export default function CachedDataLoading({setCachedDataLoading, setIsLoading}) {
    const layout = useWindowDimensions();

    return (
        <View style={{backgroundColor: "#00c801", flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Image source={gradualIcon} style={{width: 300, height: 300, margin: 5}}/>

            <View style={{padding: 20, backgroundColor: "white", borderRadius: 15, marginBottom: 20, flexDirection: "row"}}>
                <Text style={{color: "#30d158", fontSize: 25, fontWeight: "bold", marginHorizontal: 10}}>Loading Cached Data</Text>
                <ActivityIndicator size="small" color="#30d158" />
            </View>

            <TouchableOpacity onPress={() => {
                setCachedDataLoading(false);
                setIsLoading(false);

            }}><Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>Sign in manually</Text></TouchableOpacity>
        </View>
    )
}