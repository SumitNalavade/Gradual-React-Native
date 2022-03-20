import { useState } from "react";
import { StyleSheet ,View, TextInput, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AddTransactionForm({ addAssignment, setModalVisible }) {
    const [title, setTitle] = useState(null);
    const [grade, setGrade] = useState(null);
    const [category, setCategory] = useState('Unknown');
    
    const validateFields = () => {
        if(!title) {
            alert("Title is required");
            return false
        } else if (!grade) {
            alert("Grade is required");
            return false
        } else if(category === "Unknown") {
            alert("Select a category");
            return false
        } 
        return true
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.headingLabel}>Assignment Name</Text>
                        <TextInput onChangeText={(evt) => setTitle(evt.trim())} style={[ styles.textInput]} />
                    </View>

                    <View style={styles.innerContainer}>
                        <Text style={styles.headingLabel}>Grade</Text>
                        <TextInput onChangeText={(evt) => setGrade(evt.trim())} keyboardType="number-pad" returnKeyType="done"  placeholder="0.00" style={[ styles.textInput ]} />
                    </View>

                    <View style={styles.innerContainer}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(value, index) => setCategory(value)}
                            mode="dropdown" // Android only
                            style={styles.picker} >
                            <Picker.Item label="Category" value="Unknown" />
                            <Picker.Item label="Major" value="Major Grades" />
                            <Picker.Item label="Minor" value="Minor Grades" />
                        </Picker>
                    </View>
 
                    <TouchableOpacity onPress={() => {
                        if(validateFields()) {
                            addAssignment(title, grade, category);
                            return setModalVisible(false);
                        }

                        return
                    }} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Add Assignment</Text>
                    </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    textInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: "lightgray",
        marginVertical: 10,
        height: 40,
        borderRadius: 10,
        textAlign: "center",
        fontSize: 20
    },

    headingLabel: {
        width: "100%",
        textAlign: "center",
        fontSize: 22,
        marginTop: 10,

        fontWeight: "bold",
    },

    submitButton: {
        width: "75%",
        marginHorizontal: "auto",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#30d158"
    },

    submitButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },  

    container: {
        flex: 1,
        width: "100%",
        margin: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    innerContainer: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center"
    },

    picker: {
        width: "100%",
    },
})