import React,{useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Input} from '../components';
import request from '../funtion/request';
import axios from 'axios';

const TESTDATA = 
  {
      meetingName: "모임1",
      meetingType: "정기모임",
      startDate: "2022-04-09 15:30",
      endDate: "2022-04-09 15:30",
      description: "for test"
  
  }
;

const MeetingDetail = ({route , navigation}) =>{
  const [Meeting, setMeeting] = useState({});

  const getMeeting = async () => {
 
      const res = await request({
        method: 'GET',
        url: `/user/meetingInfo/get/${route.params.id}`,
      });
    
    // 로그인 후 넘어오지를 않아서 accesstoken이 없는듯
    // 로그인 하고 넘어와도 에러 500이 뜸
      if(res.result === "SUCCESS"){
        setMeeting(res.data);
      }
  };

  // 헤더에 accessToken 추가하지 않은 버전
  const getMeeting2 = async () => {
 
    const res = await axios.get({
      url: `/user/meetingInfo/get/${route.params.id}`,
    });
  
  // 로그인 후 넘어오지를 않아서 accesstoken이 없는듯
  // 로그인 하고 넘어와도 에러 500이 뜸
    if(res.data.result === "SUCCESS"){
      setMeeting(res.data.data);
    }
};


console.log(Meeting.meetingType);

  useEffect(() => {
    // getMeeting();
     setMeeting(TESTDATA)
  }, []);
  // console.log(Meeting.meetingName);
  // console.log(Meeting.meetingType);
  // console.log(Meeting.startDate);
  // console.log(Meeting.endDate);
  // console.log(Meeting.description);
    return (
    <Container>
       <Input label="이름" value={Meeting.meetingName} disabled/>
       <Input label="종류" value={Meeting.meetingType} disabled/>
       <Input label="시작시간" value={Meeting.startDate} disabled/>
       <Input label="종료시간" value={Meeting.endDate} disabled/>
       <Input label="설명" value={Meeting.description} disabled/>
      <Button title = "QR 스캔하기" onPress = {() => navigation.navigate('QRScanner')}/>
    </Container>
    
    )
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const Textbox = styled.Text`
color: #111111;
padding: 20px 10px;
font-size: 16px;
border: 1px solid;
border-radius: 4px;
`;

export default MeetingDetail;