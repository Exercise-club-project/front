import React,{useContext, useEffect} from 'react';
import { ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Ranking, MyPage, QR } from '../screens';
import { Ionicons } from '@expo/vector-icons'; 
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const TabIcon = ( {name, focused})=>{
    const theme = useContext(ThemeContext);
    return (
    <Ionicons  name = {name} size = {26}
    color = {focused ? theme.tabBtnActive : theme.tabBtnInactive}
    />
    );
};

const Tab = createBottomTabNavigator();

const Form = ({navigation, route}) => {
    useEffect(() => {
        const screenName = getFocusedRouteNameFromRoute(route);
        navigation.setOptions({
            headerTitle: screenName,
        })
    })
    return (
    <Tab.Navigator>
        <Tab.Screen name = "Home" component = {Home} 
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: 'home',
              focused,
            }),
            headerShown:false
        }}/>
        <Tab.Screen name = "Ranking" component = {Ranking}
        options={{
            tabBarIcon: ({ focused }) =>
              TabIcon({
                name: 'bar-chart',
                focused,
              }),
              headerShown:false
          }}/>
        <Tab.Screen name = "MyPage" component = {MyPage}
        options={{
            tabBarIcon: ({ focused }) =>
              TabIcon({
                name: 'person',
                focused,
              }),
              headerShown:false
          }}/>
        <Tab.Screen name = "QR" component = {QR}
        options={{
            tabBarIcon: ({ focused }) =>
              TabIcon({
                name: 'qr-code',
                focused,
              }),
              headerShown:false
          }}/>
    </Tab.Navigator>
    );
};

export default Form;