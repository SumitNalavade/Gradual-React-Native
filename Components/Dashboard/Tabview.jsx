import { useState, useEffect } from "react";
import axios from "axios";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import DashboardClassList from "./DashboardClassList";

export default function Tabview({ username, password, navigateToClassDetails, loadData, index, setIndex, studentData, setStudentData, isLoading, setIsLoading }) {
    const layout = useWindowDimensions();

    const populateData = async(index, username, password) => {
      let isLoadingCopy = {...isLoading};
      
      Object.values(isLoadingCopy).map((elm) => elm = !elm);
      setIsLoading(isLoadingCopy)

        const currentClasses = await loadData(index, username, password)

        const studentCopy = {...studentData};
        studentCopy.classes = currentClasses;
        setStudentData(studentCopy);

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
        <DashboardClassList student={studentData} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="0" populateData={populateData} />
      );
      
    const SecondRoute = () => (
        <DashboardClassList student={studentData} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="1" populateData={populateData} />
    );

    const ThirdRoute = () => (
        <DashboardClassList student={studentData} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="2" populateData={populateData} />
    );

    const FourthRoute = () => (
        <DashboardClassList student={studentData} navigateToClassDetails={navigateToClassDetails} isLoading={isLoading} index="3" populateData={populateData} />
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