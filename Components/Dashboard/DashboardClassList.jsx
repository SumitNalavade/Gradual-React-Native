import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider } from "react-native-elements";
import Badge from './Badge';

export default function DashboardClassList({ classes }) {
    
    useEffect(() => {
      try{
        classes.forEach((course) => course.name = course.name.split("-")[1].substring(2).trim());
      } catch {
        console.log("Split Error");
      }
    }, [])

    return (
        <ScrollView contentContainerStyle={{flex:1, justifyContent: "space-evenly"}}>
          { classes.map((course) => {
            return (
              <View key={classes.indexOf(course)} style={{width: "100%", padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{width: "70%"}}>
                  <Text style={{fontSize: 18}}>{course.name}</Text>
                </View>

                <View style={{width: "30%"}}>
                  <Badge grade={course.grade}/>
                </View>
                  <Divider />
              </View>
            )
          }) }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      paddingBottom: 20,
      fontSize: 18,
      height: 44,
    },
  });
