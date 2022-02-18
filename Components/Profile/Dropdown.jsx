import { useEffect } from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dropdown({ data, defaultValue, courseName, type }) {

    useEffect(async () => {
        const student = await getStudentData();

        const studentToUpdateIndex = student.classes.findIndex(course => course.name === courseName);
        defaultValue = (student.classes[studentToUpdateIndex][type])
    }, [])

    const getStudentData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem('student')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch(e) {
            // error reading value
          }
    }

    const updateStudent = async(selectedItem) => {
        const student = await getStudentData();

        const studentToUpdateIndex = student.classes.findIndex(course => course.name === courseName);
        
        if([0.5, 1, 2].includes(selectedItem)) {
            student.classes[studentToUpdateIndex].credits = parseFloat(selectedItem)
        } else {
            student.classes[studentToUpdateIndex].weight = parseFloat(selectedItem)
        }

        const jsonValue = JSON.stringify(student)
        await AsyncStorage.setItem('student', jsonValue)
    }

    return (
        <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
            updateStudent(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
        }}
        rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
        }}
    
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownText}
        defaultValue={defaultValue} />
    )
}

const styles = StyleSheet.create({
    dropdownButton: {
        height: 30,
        backgroundColor: "transparent",
        width: 50
    },

    dropdownText: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    }
})