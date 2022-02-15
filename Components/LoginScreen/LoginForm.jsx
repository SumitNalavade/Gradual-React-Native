import React from "react";
import { useState } from "react";
import { StyleSheet, View, TextInput, Text} from 'react-native';
import { Button } from "react-native-elements";

export default function LoginForm({loginFormSubmitted, isLoading}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
    <View>
        <TextInput style={styles.textInput} placeholder="Username" onChangeText={(username) => setUsername(username)}/>
        <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Password" onChangeText={(password) => setPassword(password)}/>
        <Button
          title="Sign in"
          loading={isLoading ? true : false}
          disabled={isLoading ? true: false}
          buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
          containerStyle={{
            marginHorizontal: 30,
            marginVertical: 10,
          }}
          titleStyle={{ color: 'white', marginHorizontal: 20 }}
          onPress={() => loginFormSubmitted(username, password)}
        />
      </View>
    )
    
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#888",
        padding: 10,
      },
    
      loginScreenButton: {
        backgroundColor: "black",
        margin: 5
      }
})