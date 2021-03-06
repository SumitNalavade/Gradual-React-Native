import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getPredictedGPA(student) {
    let {weightedGPA, unweightedGPA} = student.gpa;
    let {grade} = student.info;
    let {classes} = student

    classes = classes.filter(course => parseFloat(course.grade) && !course.disabled);
    classes.forEach((course) => {
        course.credits = parseFloat(course.credits);
        course.grade = parseFloat(course.grade);
        course.weight = parseFloat(course.weight);
    });
    weightedGPA = parseFloat(weightedGPA);
    unweightedGPA = parseFloat(unweightedGPA);

    grade = parseFloat(grade);

    const { data } = await axios.post("https://gradual-deploy.vercel.app/predictedGPA", {
        weightedGPA,
        unweightedGPA,
        "studentGrade": grade,
        "currentClasses" : classes
    });
    
    return data
}

export async function getStudentData(username, password, url) {
    const { data } = await axios.get(`${url}?username=${username}&password=${password}`);

    return data
}

export const storeClass = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('class', jsonValue)
    } catch (e) {
      // saving error
    }
}

export const readClass = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('class')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}
  
export const storeStudent = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('student', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const readStudent = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('student')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

export const infoURL = "https://gradual-deploy.vercel.app/students/info"
export const scheduleURL = "https://gradual-deploy.vercel.app/students/schedule"
export const currentClassesURL = "https://gradual-deploy.vercel.app/students/currentclasses"
export const gpaURL = "https://gradual-deploy.vercel.app/students/gpa"