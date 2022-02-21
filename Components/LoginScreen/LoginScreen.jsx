import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import gradualIcon from "../../assets/gradualIcon.png";

import LoginForm from './LoginForm';
import { getStudentData, infoURL, scheduleURL, currentClassesURL, gpaURL } from "../../utils";

export default function LoginScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    const student = {
      "info": {
          "birthdate": "12/24/2003",
          "campus": "Heritage High School",
          "counselor": "NELSON-MOON, LANNIS",
          "grade": "12",
          "id": "177611",
          "name": "Nalavade, Sumit Satyajit"
      },
      "schedule": [
          {
              "building": "Heritage High School",
              "courseCode": "MTH45300A - 1",
              "courseName": "AP Calculus AB S1",
              "days": "A",
              "markingPeriods": "Q1, Q2",
              "periods": "1",
              "room": "C112",
              "status": "Active",
              "teacher": "Poltl, Beth"
          },
          {
              "building": "Heritage High School",
              "courseCode": "SCI43300A - 1",
              "courseName": "AP Environmental Science S1",
              "days": "B",
              "markingPeriods": "Q1, Q2",
              "periods": "1",
              "room": "C202",
              "status": "Active",
              "teacher": "GLENDENNING, SHAREE"
          },
          {
              "building": "Heritage High School",
              "courseCode": "MTH45300B - 1",
              "courseName": "AP Calculus AB S2",
              "days": "A",
              "markingPeriods": "Q3, Q4",
              "periods": "1",
              "room": "C112",
              "status": "Active",
              "teacher": "Poltl, Beth"
          },
          {
              "building": "Heritage High School",
              "courseCode": "SCI43300B - 1",
              "courseName": "AP Environmental Science S2",
              "days": "B",
              "markingPeriods": "Q3, Q4",
              "periods": "1",
              "room": "C202",
              "status": "Active",
              "teacher": "GLENDENNING, SHAREE"
          },
          {
              "building": "Heritage High School",
              "courseCode": "SST34310 - 3",
              "courseName": "AP Economics",
              "days": "A",
              "markingPeriods": "Q1, Q2",
              "periods": "2",
              "room": "C117",
              "status": "Active",
              "teacher": "Dempsey, Patricia"
          },
          {
              "building": "Heritage High School",
              "courseCode": "ELA14300A - 4",
              "courseName": "AP English Literature S1",
              "days": "B",
              "markingPeriods": "Q1, Q2",
              "periods": "2",
              "room": "B115",
              "status": "Active",
              "teacher": "SHASKAN, ATTICUS"
          },
          {
              "building": "Heritage High School",
              "courseCode": "SST34300 - 4",
              "courseName": "AP Government",
              "days": "A",
              "markingPeriods": "Q3, Q4",
              "periods": "2",
              "room": "C116",
              "status": "Active",
              "teacher": "Huggins, Jonathan"
          },
          {
              "building": "Heritage High School",
              "courseCode": "ELA14300B - 4",
              "courseName": "AP English Literature S2",
              "days": "B",
              "markingPeriods": "Q3, Q4",
              "periods": "2",
              "room": "B115",
              "status": "Active",
              "teacher": "SHASKAN, ATTICUS"
          },
          {
              "building": "Heritage High School",
              "courseCode": "CATE36400A - 1",
              "courseName": "Prac News Prod 2 S1",
              "days": "A",
              "markingPeriods": "Q1, Q2",
              "periods": "3",
              "room": "A123",
              "status": "Active",
              "teacher": "BAGWELL, CANDACE"
          },
          {
              "building": "CTE",
              "courseCode": "CATE27600A - 3",
              "courseName": "Mobile App Programming S1@CTEC",
              "days": "B",
              "markingPeriods": "Q1, Q2",
              "periods": "3",
              "room": "XC148",
              "status": "Active",
              "teacher": "BUNN, BRYAN"
          },
          {
              "building": "Heritage High School",
              "courseCode": "CATE36400B - 1",
              "courseName": "Prac News Prod 2 S2",
              "days": "A",
              "markingPeriods": "Q3, Q4",
              "periods": "3",
              "room": "A123",
              "status": "Active",
              "teacher": "BAGWELL, CANDACE"
          },
          {
              "building": "CTE",
              "courseCode": "CATE27600B - 3",
              "courseName": "Mobile App Programming S2@CTEC",
              "days": "B",
              "markingPeriods": "Q3, Q4",
              "periods": "3",
              "room": "XC148",
              "status": "Active",
              "teacher": "BUNN, BRYAN"
          },
          {
              "building": "Heritage High School",
              "courseCode": "REL99013A - 1",
              "courseName": "Rel 4A OR 4B S1",
              "days": "A",
              "markingPeriods": "Q1, Q2",
              "periods": "4",
              "room": "N/A",
              "status": "Active",
              "teacher": "Staff"
          },
          {
              "building": "Heritage High School",
              "courseCode": "MTH45310A - 4",
              "courseName": "AP Statistics S1",
              "days": "B",
              "markingPeriods": "Q1, Q2",
              "periods": "4",
              "room": "C108",
              "status": "Active",
              "teacher": "Davenport, Aimee"
          },
          {
              "building": "Heritage High School",
              "courseCode": "REL99013B - 1",
              "courseName": "Rel 4A OR 4B S2",
              "days": "A",
              "markingPeriods": "Q3, Q4",
              "periods": "4",
              "room": "N/A",
              "status": "Active",
              "teacher": "Staff"
          },
          {
              "building": "Heritage High School",
              "courseCode": "MTH45310B - 4",
              "courseName": "AP Statistics S2",
              "days": "B",
              "markingPeriods": "Q3, Q4",
              "periods": "4",
              "room": "C108",
              "status": "Active",
              "teacher": "Davenport, Aimee"
          },
          {
              "building": "Heritage High School",
              "courseCode": "MSC15136M - 12",
              "courseName": "12th Grade Advisory GP1",
              "days": "A, B",
              "markingPeriods": "Q1, Q2, Q3, Q4",
              "periods": "ADV",
              "room": "C218",
              "status": "Active",
              "teacher": "O'brien, TIMOTHY"
          }
      ],
      "gpa": {
          "unweightedGPA": "3.8100",
          "weightedGPA": "4.9900"
      },
      "classes": [
          {
              "Last Updated": "1/25/2022",
              "assignments": [
                  {
                      "assignment": "Lesson 3.6 - Segues and Nav Controllers",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/18/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "IP 10 - Add One",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/11/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  }
              ],
              "credits": 1,
              "grade": 100,
              "name": "CATE27600B - 3    Mobile App Programming S2@CTEC",
              "weight": 6
          },
          {
              "Last Updated": "2/12/2022",
              "assignments": [
                  {
                      "assignment": "PA Script #3",
                      "category": "Minor Grades",
                      "dateAssigned": "02/09/2022",
                      "dateDue": "03/04/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Social Media Posts",
                      "category": "Minor Grades",
                      "dateAssigned": "01/04/2022",
                      "dateDue": "03/02/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "MP3 Package/Segment #2",
                      "category": "Major Grades",
                      "dateAssigned": "01/10/2022",
                      "dateDue": "03/02/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Show Task",
                      "category": "Minor Grades",
                      "dateAssigned": "01/14/2022",
                      "dateDue": "02/25/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Event Coverage",
                      "category": "Major Grades",
                      "dateAssigned": "01/04/2022",
                      "dateDue": "02/25/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "MP3 Package/Segment #1",
                      "category": "Major Grades",
                      "dateAssigned": "01/11/2022",
                      "dateDue": "02/04/2022",
                      "score": "91.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "PA Script #2",
                      "category": "Minor Grades",
                      "dateAssigned": "01/24/2022",
                      "dateDue": "02/01/2022",
                      "score": "96.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "PA Script #1",
                      "category": "Minor Grades",
                      "dateAssigned": "01/04/2022",
                      "dateDue": "01/21/2022",
                      "score": "97.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "MP3 Calendar Check",
                      "category": "Non-graded",
                      "dateAssigned": "01/04/2022",
                      "dateDue": "01/06/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  }
              ],
              "credits": 1,
              "grade": 93.2,
              "name": "CATE36400B - 1    Prac News Prod 2 S2",
              "weight": 5
          },
          {
              "Last Updated": "1/26/2022",
              "assignments": [
                  {
                      "assignment": "Poetry Essay",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "01/24/2022",
                      "score": "90.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Thesis Practice #2",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/20/2022",
                      "score": "95.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Thesis Practice #1",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/13/2022",
                      "score": "90.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Christmas Carol Q3 Essay",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/05/2022",
                      "score": "80.00",
                      "totalPoints": "100.00"
                  }
              ],
              "credits": 1,
              "grade": 89.33,
              "name": "ELA14300B - 4    AP English Literature S2",
              "weight": 6
          },
          {
              "Last Updated": "2/14/2022",
              "assignments": [
                  {
                      "assignment": "Delta Math Unit 7",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "03/02/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Quiz 2 (7.3 and 7.4)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "03/02/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Quiz 1 (7.1 and 7.2)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/24/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 6 Test (Integration)",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "02/14/2022",
                      "score": "73.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Delta Math Practice (Unit 6)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/08/2022",
                      "score": "89.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Quiz 4 (Antiderivatives and Rules of Integration)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/02/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "6.6 Topics Questions",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "01/27/2022",
                      "score": "17.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Quiz 2 (Properties of Def. Integrals)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/25/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Quiz 1 (Reimann Sums and Definite Integrals)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/19/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 5 Test (Analytical Applications of Derivatives)",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "01/10/2022",
                      "score": "78.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Delta Math Practice (Unit 5)",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/10/2022",
                      "score": "85.00",
                      "totalPoints": "100.00"
                  }
              ],
              "credits": 1,
              "grade": 82.56,
              "name": "MTH45300B - 1    AP Calculus AB S2",
              "weight": 6
          },
          {
              "Last Updated": "2/14/2022",
              "assignments": [
                  {
                      "assignment": "Test - 9 Significance Tests",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "02/15/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Practice - 9.3 (canvas)",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "02/15/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Skills Check - 9 Significance Tests",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/11/2022",
                      "score": "59.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Skills Check - 9.1 Significance Tests:  The Basics",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/04/2022",
                      "score": "66.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Practice - 9.1 (form)",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "02/04/2022",
                      "score": "L",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Test - 8 Confidence Intervals",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "01/26/2022",
                      "score": "85.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Skills Check - 8 Confidence Intervals",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/24/2022",
                      "score": "69.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Practice - 8.3 (canvas)",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "01/24/2022",
                      "score": "84.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Practice - 8.2 (canvas)",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "01/24/2022",
                      "score": "71.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Practice - 8.1 (canvas)",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "01/24/2022",
                      "score": "100.0",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Group Skills Check - 7 Sampling Distributions",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/11/2022",
                      "score": "50.00",
                      "totalPoints": "50.00"
                  }
              ],
              "credits": 1,
              "grade": 78.89,
              "name": "MTH45310B - 4    AP Statistics S2",
              "weight": 6
          },
          {
              "Last Updated": "2/8/2022",
              "assignments": [
                  {
                      "assignment": "Unit 6 Energy - QUIZ - Topics 6.1-6.5",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/11/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 5 Assessment - all topics",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "02/01/2022",
                      "score": "83.33",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 5 - QUIZ- Topics 5.5, 5.7-5.11, 13, 16 - Impacts on Sustainability",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/26/2022",
                      "score": "85.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Salinization Lab - Irrigation Methods",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/25/2022",
                      "score": "95.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 5 - QUIZ- Topics 5.1-5.4, 5.12, 5.15, 5.17",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/18/2022",
                      "score": "90.00",
                      "totalPoints": "100.00"
                  }
              ],
              "credits": 1,
              "grade": 86,
              "name": "SCI43300B - 1    AP Environmental Science S2",
              "weight": 6
          },
          {
              "Last Updated": "2/14/2022",
              "assignments": [
                  {
                      "assignment": "Midterm Exam (Units 1 & 2)",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "02/23/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 2 Major Grade FRQ",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "02/16/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 2 MC Quiz",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/14/2022",
                      "score": "84.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 2 Argument FRQ Practice",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "02/11/2022",
                      "score": "",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 2 Congress FRQ Practice",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "02/04/2022",
                      "score": "95.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 1 Outside Reading/Video Notes",
                      "category": "Non-graded",
                      "dateAssigned": "",
                      "dateDue": "01/21/2022",
                      "score": "50.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 1 Major Grade FRQ",
                      "category": "Major Grades",
                      "dateAssigned": "",
                      "dateDue": "01/21/2022",
                      "score": "90.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 1 MC Quiz",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/21/2022",
                      "score": "89.00",
                      "totalPoints": "100.00"
                  },
                  {
                      "assignment": "Unit 1 Concept Application & Argument FRQ Practice",
                      "category": "Minor Grades",
                      "dateAssigned": "",
                      "dateDue": "01/14/2022",
                      "score": "90.00",
                      "totalPoints": "100.00"
                  }
              ],
              "credits": 1,
              "grade": 89.8,
              "name": "SST34300 - 4    AP Government",
              "weight": 6
          }
      ]
    }

    const loginFormSubmitted = async (username, password) => {    
        setIsLoading(true)

        setIsLoading(false);
        return navigation.navigate("Dashboard", { student: { ...student } })

        try {
          await Promise.all([getStudentData(username, password, infoURL), getStudentData(username, password, scheduleURL), getStudentData(username, password, currentClassesURL)]).then((values) => {
            updateStudentData(values[0], "info");
            updateStudentData(values[1].schedule, "schedule");
            updateStudentData(values[2].currentClasses, "classes");
          })
        } catch {
            setIsLoading(false);
          return alert("Login Error");
        }
    
        try {
          await getStudentData(username, password, gpaURL).then((res) => updateStudentData(res, "gpa"))
        } catch {
          console.log("GPA Fetch Error");
        } finally {
            setIsLoading(false)
        }

        await storeStudent(student);

        return navigation.navigate("Dashboard", { student: { ...student } })
     };


     const updateStudentData = (newData, prop) => {
        if(!newData) { return alert("Login Error")};
    
        student[prop] = newData;
    
        return student[prop];
      };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{padding: 10}}>
            <View style={styles.logoContainer}>
                <Image source={gradualIcon} style={{width: 30, height: 30, margin: 5}}/>
                <Text style={{margin: 5, fontSize: 20}}>Gradual</Text>
            </View>

                <Text style={{fontSize: 45, marginBottom: 50}}>Connect to your grades</Text>

                <LoginForm loginFormSubmitted={loginFormSubmitted} isLoading={isLoading}/>
            <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        fontFamily: 'SF-Pro-Rounded-Regular'
    },


  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 15
  }
});
