import { useState, useEffect } from "react";
import axios from "axios";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import DashboardClassList from "./DashboardClassList";

export default function Tabview({ student, navigateToClassDetails, loadData }) {
    const { username, password } = student;

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(3)
    const [mainStudent, setMainStudent] = useState(student);
    const [isLoading, setIsLoading] = useState({0: true, 1: true, 2: true, 3: false});

    const populateData = async(index, username, password) => {
      let isLoadingCopy = {...isLoading};
      
      Object.values(isLoadingCopy).map((elm) => elm = !elm);
      setIsLoading(isLoadingCopy)

        const currentClasses = await loadData(index, username, password)

        const studentCopy = {...mainStudent};
        studentCopy.classes = currentClasses;
        setMainStudent(studentCopy);

        isLoadingCopy = {...isLoading};
        for(let elm in isLoadingCopy) {
          if(elm == index) {
            isLoadingCopy[elm] = false
          } else {
            isLoadingCopy[elm] = true
          }
        }
        setIsLoading(isLoadingCopy)

    }

    const FirstRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="0" populateData={populateData} />
      );
      
    const SecondRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="1" populateData={populateData} />
    );

    const ThirdRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="2" populateData={populateData} />
    );

    const FourthRoute = () => (
        <DashboardClassList student={mainStudent} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="3" populateData={populateData} />
    );

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#30d158' }}
        labelStyle={{fontWeight: "bold"}}
      />
    );
  

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute
    });

    const [routes] = useState([
        { key: 'first', title: 'MP1' },
        { key: 'second', title: 'MP2' },
        { key: 'third', title: 'MP3' },
        { key: 'fourth', title: 'MP4' },
      ]);

    return (
        <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(number) => {
        setIndex(number);
        populateData(number, username, password);
      }}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />

    )
}