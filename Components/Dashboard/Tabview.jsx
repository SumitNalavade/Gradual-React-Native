import { useState, useEffect, useContext } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import DashboardClassList from "./DashboardClassList";
import { userDetailsContext } from "../userDetailsProvider";


export default function Tabview({ navigateToClassDetails, getClassesByQuarter, index, setIndex, loading, setIsLoading }) {
    const layout = useWindowDimensions();
    const [userDetails, setUserDetails] = useContext(userDetailsContext);
    const { username, password } = userDetails

    const getStudentGradesByQuarter = async(index, username, password) => {
      let isLoadingCopy = {...loading};
      
      Object.values(isLoadingCopy).map((elm) => elm = !elm);
      setIsLoading(isLoadingCopy)

        const currentClasses = await getClassesByQuarter(index, username, password)

        const studentCopy = {...userDetails};
        studentCopy.classes = currentClasses;
        setUserDetails(studentCopy);

        isLoadingCopy = {...loading};
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
        <DashboardClassList navigateToClassDetails={navigateToClassDetails} isLoading={loading} index="0" />
      );
      
    const SecondRoute = () => (
        <DashboardClassList navigateToClassDetails={navigateToClassDetails} isLoading={loading} index="1" />
    );

    const ThirdRoute = () => (
        <DashboardClassList navigateToClassDetails={navigateToClassDetails} isLoading={loading} index="2" />
    );

    const FourthRoute = () => (
        <DashboardClassList navigateToClassDetails={navigateToClassDetails} isLoading={loading} index="3" />
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
        getStudentGradesByQuarter(number, username, password);
      }}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />

    )
}