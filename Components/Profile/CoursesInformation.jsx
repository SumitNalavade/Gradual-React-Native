import { View, Text } from "react-native";
import { Divider } from "react-native-elements";


export default function CoursesInfo( { courses } ) {    
    return (
        <View style={{backgroundColor: "white"}}>
            {courses.map((course) => {
                const courseName = course.name.split("-")[1].substring(2).trim();

                return (
                    <View style={{padding: 10}} key={courses.indexOf(course)}>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{courseName}</Text>

                        <View >
                            <Text>Credits</Text>
                            <Text>{course.credits}</Text>
                        </View>

                        <View>
                            <Text>Weight</Text>
                            <Text>{course.weight}</Text>
                        </View>

                        <Divider />
                    </View>
                )
            })}
        </View>
    )
}