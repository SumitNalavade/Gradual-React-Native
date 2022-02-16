import {View} from "react-native";
import { Text, Card } from 'react-native-elements';
import Donut from "./Donut";

export default function ClassAverage({ majorAssignmentsGrade, minorAssignmentsGrade, totalGrade }) {
    return (
        <View style={{flexDirection: "row", paddingHorizontal: 10}}>
            <Donut percentage={totalGrade} color={"red"} />

            <View>
                <Card containerStyle={{borderRadius: 15}}>
                    <Card.Title>Major Grades</Card.Title>
                    <Card.Divider />
                    <Text>{majorAssignmentsGrade}</Text>
            </Card>

                <Card containerStyle={{borderRadius: 15}}>
                    <Card.Title>Minor Grades</Card.Title>
                    <Card.Divider />
                    <Text>{minorAssignmentsGrade}</Text>
            </Card>
          </View>
        </View>
    )
}