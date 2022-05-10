import React,{useContext, useEffect} from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createAppContainer } from "react-navigation";
import Header from "../components/Header";
import { Ranking_Club, Ranking_Me_Club,Ranking_Me_Whole } from "../screens";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// const TabNavigator = createMaterialTopTabNavigator(
//   {
//     Ranking_Club: {
//       screen: Ranking_Club
//     },
//     Ranking_Me_Club: {
//       screen: Ranking_Me_Club
//     },
//     Rankinh_Me_Whole: {
//       screen: Ranking_Me_Whole
//     },
//   },
//   {
//     tabBarComponent: Header,
//     tabBarOptions: {
//       activeTintColor: "#1BA1F3",
//       inactiveTintColor: "#000"
//     },
//     initialRouteName: "Tweets"
//   }
// );

// const Toptab = createAppContainer(TabNavigator);

// export default Toptab;

const Tab = createMaterialTopTabNavigator();

const Rank_index = () => {
    return (
    <Tab.Navigator>
        <Tab.Screen name = "동아리" component = {Ranking_Club} 
        />
        <Tab.Screen name = "개인(전체)" component = {Ranking_Me_Whole}
        />
        <Tab.Screen name = "개인(동아리내)" component = {Ranking_Me_Club}
        />
    </Tab.Navigator>
    );
};

export default Rank_index;