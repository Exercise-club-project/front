import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateMeeting,MeetingDetail,MyPage_Act,MyPage_MyClub,MyPage_MyInfo,
  QRScanner,MyPage_Act_Detail, Ranking_ClubDetail,Rank_Mem_whole ,Rank_Mem_club} from '../screens';
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
      <Stack.Screen name = "Form" component={Form} options={{ title: '홈' }}/>
      <Stack.Screen name = "CreateMeeting" component={CreateMeeting}options={{ title: '모임 만들기' }}/>
      <Stack.Screen name = "MeetingDetail" component={MeetingDetail}options={{ title: '모임 상세' }}/>
      <Stack.Screen name = "MyPage_Act" component={MyPage_Act}options={{ title: '활동 내역' }}/>
      <Stack.Screen name = "MyPage_Act_Detail" component={MyPage_Act_Detail}options={{ title: '활동 상세' }}/>
      <Stack.Screen name = "MyPage_MyClub" component={MyPage_MyClub}options={{ title: '나의 동아리' }}/>
      <Stack.Screen name = "MyPage_MyInfo" component={MyPage_MyInfo}options={{ title: '내 정보' }}/>
      <Stack.Screen name = "QRScanner" component={QRScanner}options={{ title: 'QR스캐너' }}/>
      <Stack.Screen name = "Ranking_ClubDetail" component={Ranking_ClubDetail}options={{ title: '동아리 랭킹' }}/>
      <Stack.Screen name = "Rank_Mem_whole" component={Rank_Mem_whole}options={{ title: '개인(전체) 랭킹' }}/>
      <Stack.Screen name = "Rank_Mem_club" component={Rank_Mem_club}options={{ title: '개인(동아리) 랭킹' }}/>
    </Stack.Navigator>
  );
};

export default Main;