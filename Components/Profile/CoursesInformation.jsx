import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown'
import Dropdown from "./Dropdown";

export default function CoursesInfo( { courses } ) {
    const credits = [0.5, 1, 2]
    const weights = [5, 5.5, 6]
    
    return (
        <View style={{backgroundColor: "white", padding: 8}}>
            <Text style={{fontSize: 25, fontWeight: "bold", marginBottom: 15, color: "#444444"}}>Scales</Text>
            {courses.map((course) => {
                const courseName = course.name.split("-")[1].substring(2).trim();

                console.log(course);

                return (
                    <View key={courses.indexOf(course)} style={{marginVertical: 15}}>
                        <Text style={{fontSize: 15, fontWeight: "bold", color: "#444444", marginBottom: 10}}>{courseName}</Text>

                        <View style={{flexDirection: "row", marginVertical: 15}}>
                            <Text style={{width: "50%", color: "#444444"}}>Weight</Text>
                            <Dropdown data={weights} defaultValue={String(course.weight)}/>
                        </View>

                <Divider />

                        <View style={{flexDirection: "row", marginVertical: 15}}>
                            <Text style={{width: "50%", color: "#444444"}}>Credits</Text>
                            <Dropdown data={credits} defaultValue={String(course.credits)}/>
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