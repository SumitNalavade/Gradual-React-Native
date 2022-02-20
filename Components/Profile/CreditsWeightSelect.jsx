import { View, Text } from "react-native";
import Dropdown from "./Dropdown";
import { AntDesign } from '@expo/vector-icons';

export default function CreditsWeightSelect({ type, course, student, updateStudent }) {
    const credits = [0.5, 1, 2]
    const weights = [5, 5.5, 6]

    return (
        <View style={{flexDirection: "row", marginVertical: 10}}>
                            <Text style={{width: "80%", color: "#444444"}}>{type}</Text>
                            <View style={{flexDirection: "row", backgroundColor: "#00C801", borderRadius: 10, alignItems: "center", paddingHorizontal: 5}}>
                                <Dropdown data={type.toLowerCase() == "credits" ? credits : weights} defaultValue={(course[type.toLowerCase()])} courseName={course.name} student={student} updateStudent={updateStudent} type={type.toLowerCase()}/>
                                <AntDesign name="caretdown" size={20} color="white" />
                            </View> 
                        </View> 
    )
}