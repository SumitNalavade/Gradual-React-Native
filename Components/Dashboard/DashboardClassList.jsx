import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Divider } from "react-native-elements";
import Badge from './Badge';

export default function DashboardClassList({ classes, schedule, navigateToClassDetails }) {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "space-evenly"}} style={{paddingHorizontal: 10}}>
          { classes.map((course) => {
            const { name, grade} = course;
            const color = parseFloat(grade) >= 90 ? "#30d158" : parseFloat(grade) >= 80 ? "#ffd60a" : "#ff443a";
            const courseInfo = schedule.find((elm) => elm.courseName === course.name)
          
            return (
              <TouchableOpacity key={classes.indexOf(course)} onPress={() => navigateToClassDetails(course, courseInfo)} >
                <View style={{paddingVertical: 10, Height: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                  <View style={{width: "70%"}}>
                    <Text style={{fontSize: 16, flexWrap: "wrap"}}>{name.split("-")[1].substring(2).trim()}</Text>
                  </View>

                  <View style={{width: "30%"}}>
                    <Badge grade={grade} color={color}/>
                  </View>
                </View>
                <Divider />
              </TouchableOpacity>
            )
          }) }
        </ScrollView>
    )
}