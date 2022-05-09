import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateMeeting,MeetingDetail,MyPage_Act,MyPage_MyClub,MyPage_MyInfo,QRScanner,MyPage_Act_Detail } from '../screens';
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
      <Stack.Screen name = "MyPage_Act_Detail" component={MyPage_Act_Detail}/>
      <Stack.Screen name = "MyPage_MyClub" component={MyPage_MyClub}/>
      <Stack.Screen name = "MyPage_MyInfo" component={MyPage_MyInfo}/>
      <Stack.Screen name = "QRScanner" component={QRScanner}/>
    </Stack.Navigator>
  );
};

export default Main;