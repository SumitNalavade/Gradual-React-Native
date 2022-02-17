import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown'
import Dropdown from "./Dropdown";

export default function CoursesInfo( { courses } ) {
    const credits = [0.5, 1, 2]
    const weights = [5, 5.5, 6]
    
    return (
        <View style={{backgroundColor: "white"}}>
            {courses.map((course) => {
                const courseName = course.name.split("-")[1].substring(2).trim();

                console.log(course);

                return (
                    <View style={{padding: 8}} key={courses.indexOf(course)}>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{courseName}</Text>

                        <View style={{flexDirection: "row", marginVertical: 15}}>
                            <Text style={{width: "50%"}}>Weight</Text>
                            <Dropdown data={weights} defaultValue={String(course.weight)}/>
                        </View>

                <Divider />

                        <View style={{flexDirection: "row", marginVertical: 15}}>
                            <Text style={{width: "50%"}}>Credits</Text>
                            <Dropdown data={credits} defaultValue={String(course.credits)}/>
                        </View>

                        <Divider />
                    </View>
                )
            })}
        </View>
    )
}