import {View, StyleSheet} from "react-native";
import { Text, Card } from 'react-native-elements';
import Donut from "./Donut";

export default function ClassAverage({ majorAssignmentsGrade, minorAssignmentsGrade, percentage }) {
    return (
        <View style={{flexDirection: "row", paddingHorizontal: 10}}>
            <Donut percentage={percentage} color={"red"} />

            <View>
                <Card containerStyle={{borderRadius: 15}}>
                    <Card.Title>Major Grades</Card.Title>
                    
                    <Text style={styles.gradeText}>{majorAssignmentsGrade}</Text>
            </Card>

                <Card containerStyle={{borderRadius: 15}}>
                    <Card.Title>Minor Grades</Card.Title>
                    
                    <Text style={styles.gradeText}>{minorAssignmentsGrade}</Text>
            </Card>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gradeText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#444444"
    }
})

