import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function DashboardClassList({ classes }) {

    const array = [];
    classes.forEach((course) => {
        array.push({
            key: course["name"]
        })
    });
    
    return (
        <View style={styles.container}>
      <FlatList
        data={array}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
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
