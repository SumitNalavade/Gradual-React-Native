import { useState, useEffect } from "react";
import axios from "axios";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';

import DashboardClassList from "./DashboardClassList";

export default function Tabview({ student, navigateToClassDetails }) {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(3)
    const [mainStudent, setMainStudent] = useState(student);

    const populateData = async(index) => {
        const pastAssignments = await axios.get(`https://gradual-deploy.vercel.app/students/pastassignments?username=177611&password=12242003&quarter=${index + 1}`);

        const { currentClasses } = pastAssignments.data;

        studentCopy = {...mainStudent};
        studentCopy.classes = currentClasses;
        setMainStudent(studentCopy);
    }

    const FirstRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} />
      );
      
    const SecondRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} />
    );

    const ThirdRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} />
    );

    const FourthRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute
    });

    const [routes] = useState([
        { key: 'first', title: '1' },
        { key: 'second', title: '2' },
        { key: 'third', title: '3' },
        { key: 'fourth', title: '4' },
      ]);

    return (
        <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(number) => {
        setIndex(number);
        populateData(number);
      }}
      initialLayout={{ width: layout.width }}
    />

    )
}