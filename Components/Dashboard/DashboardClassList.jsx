import React from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function DashboardClassList({ classes }) {

    const array = [];
    let counter = 0;
    classes.forEach((course) => {
        array.push({
            key: course["name"],
            name: course["name"]
        })

        counter += 1;
    });
    
    return (
        <ScrollView contentContainerStyle={{flex:1, justifyContent: "space-evenly"}}>
          { array.map((course) => {
            return (
              <View key={course.key} style={{padding: 10}}>
                  <Text>{course.name}</Text>
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
