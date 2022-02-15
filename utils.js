import axios from "axios"

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

    const { data } = await axios.post("http://gradual-env.eba-57kd6mpm.us-east-2.elasticbeanstalk.com/predictedGPA", {
        weightedGPA,
        unweightedGPA,
        "studentGrade": grade,
        "currentClasses" : classes
    });
    
    return data
}

export async function getStudentData(username, password, url) {
    const { data } = await axios.get(`${url}/${username}/${password}`);

    return data
}

export const infoURL = "http://gradual-env.eba-57kd6mpm.us-east-2.elasticbeanstalk.com/students/info"
export const scheduleURL = "http://gradual-env.eba-57kd6mpm.us-east-2.elasticbeanstalk.com/students/schedule"
export const currentClassesURL = "http://gradual-env.eba-57kd6mpm.us-east-2.elasticbeanstalk.com/students/currentclasses"
export const gpaURL = "http://gradual-env.eba-57kd6mpm.us-east-2.elasticbeanstalk.com/students/gpa"