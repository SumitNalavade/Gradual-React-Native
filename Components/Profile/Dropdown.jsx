import { StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'

export default function Dropdown({ data, defaultValue, courseName, updateStudent, type }) {

    return (
        <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
            updateStudent(selectedItem, courseName, type);
        }}
        buttonTextAfterSelection={(selectedItem, index, type) => {
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
        width: 60
    },

    dropdownText: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    }
})