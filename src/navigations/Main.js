import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateMeeting,MeetingDetail,MyPage_Act,MyClub,MyInfo,QRScanner } from '../screens';
import Form from './Form';
const Stack = createStackNavigator();

const Main = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name = "Form" component={Form}/>
      <Stack.Screen name = "CreateMeeting" component={CreateMeeting}/>
      <Stack.Screen name = "MeetingDetail" component={MeetingDetail}/>
      <Stack.Screen name = "MyPage_Act" component={MyPage_Act}/>
      <Stack.Screen name = "MyClub" component={MyClub}/>
      <Stack.Screen name = "MyInfo" component={MyInfo}/>
      <Stack.Screen name = "QRScanner" component={QRScanner}/>
    </Stack.Navigator>
  );
};

export default Main;