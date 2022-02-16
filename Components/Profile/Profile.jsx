import { TouchableOpacity, Text } from "react-native";

export default function Profile({ navigation }) {

    const navigateToHome = () => {
        return navigation.navigate("Home")
    };

    return (
        <TouchableOpacity onPress={() => navigateToHome()}>
            <Text style={{color: "red", textAlign: "center", marginTop: 40}}>Sign Out</Text>
        </TouchableOpacity>
    )
}