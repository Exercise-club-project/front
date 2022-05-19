import React,{useContext, useEffect} from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createAppContainer } from "react-navigation";
import Header from "../components/Header";
import Ranking_Club from '../screens/Ranking_Club';
import Ranking_Me_Club from '../screens/Ranking_Me_Club';
import Ranking_Me_Whole from '../screens/Ranking_Me_Whole';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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