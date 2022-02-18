import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getPredictedGPA(student) {
    let {weightedGPA, unweightedGPA} = student.gpa;
    let {grade} = student.info;
    let {classes} = student

    classes = classes.filter(course => parseFloat(course.grade));
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

export const infoURL = "https://gradual-deploy.vercel.app/students/info"
export const scheduleURL = "https://gradual-deploy.vercel.app/students/schedule"
export const currentClassesURL = "https://gradual-deploy.vercel.app/students/currentclasses"
export const gpaURL = "https://gradual-deploy.vercel.app/students/gpa"