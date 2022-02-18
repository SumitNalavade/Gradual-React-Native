import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import Dropdown from "./Dropdown";
import { AntDesign } from '@expo/vector-icons';

export default function CoursesInfo( { courses } ) {
    const credits = [0.5, 1, 2]
    const weights = [5, 5.5, 6]
    
    return (
        <View style={{backgroundColor: "white", padding: 8}}>
            <Text style={{fontSize: 25, fontWeight: "bold", marginBottom: 15, color: "#444444"}}>Scales</Text>
            {courses.map((course) => {
                const courseName = course.name.split("-")[1].substring(2).trim();

                return (
                    <View key={courses.indexOf(course)} style={{marginVertical: 15}}>
                        <Text style={{fontSize: 15, fontWeight: "bold", color: "#444444", marginBottom: 10}}>{courseName}</Text>

                        <View style={{flexDirection: "row", marginVertical: 10}}>
                            <Text style={{width: "80%", color: "#444444"}}>Weight</Text>
                            <View style={{flexDirection: "row", backgroundColor: "#00C801", borderRadius: 10, alignItems: "center", paddingHorizontal: 5}}>
                                <Dropdown data={weights} defaultValue={String(course.weight)} courseName={course.name} type="weight"/>
                                <AntDesign name="caretdown" size={20} color="white" />
                            </View> 
                        </View>

                <Divider />

                        <View style={{flexDirection: "row", marginVertical: 10}}>
                            <Text style={{width: "80%", color: "#444444"}}>Credits</Text>
                            <View style={{flexDirection: "row", backgroundColor: "#00C801", borderRadius: 10, alignItems: "center", paddingHorizontal: 5}}>
                                <Dropdown data={credits} defaultValue={String(course.credits)} courseName={course.name} type="credits"/>
                                <AntDesign name="caretdown" size={20} color="white" />
                            </View>
                        </View>

                        <Divider />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "#888"
    }
})