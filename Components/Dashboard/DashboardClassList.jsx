import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Divider } from "react-native-elements";
import Badge from './Badge';

export default function DashboardClassList({ student, navigateToClassDetails, isLoading, index }) {

    const { classes, schedule } = student;

    return (
      <View style={{flexGrow: 1}}>
          <View style={{flexGrow: 1, justifyContent: "center", alignItems: "center", display: isLoading[parseFloat(index)] == true ? "flex" : "none"}}>
            <ActivityIndicator size="large" color="#30d158" />
          </View>

          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "space-evenly"}} style={{paddingHorizontal: 10, display: isLoading[parseFloat(index)] == true ? "none" : "flex"}}>
            { classes.map((course) => {
              const { name, grade} = course;
              const color = parseFloat(grade) == 100 ? "#00C692" : parseFloat(grade) >= 90 ? "#00C801" : parseFloat(grade) >= 80 ? "#FFC857" : "#EC5E2A";
              const courseInfo = schedule.find((elm) => elm.courseName === course.name.split("-")[1].substring(2).trim())
              
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
        </View>
    )
}