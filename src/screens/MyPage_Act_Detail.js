import React,{useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {Input, Desc} from '../components';
import axios from 'axios';


const MyPage_Act_Detail = ({route}) =>{

  const meetingId = route.params.id;
  const [Meeting, setMeeting] = useState({});

  console.log(meetingId);
  
  const getMeeting = async() =>{
    try{
      const response = await axios.get(
        `http://23.23.240.178:8080/user/meetingInfo/get/${meetingId}`,
      );
      if(response.data.result === "SUCCESS"){
        // console.log('result : ', response.data.result);
        console.log('data : ',response.data.data);
        setMeeting(response.data.data);
      }
    }
    catch(e){
      console.log(e);
    }
  };


  useEffect(() => {
     getMeeting(); // 왜 안되는지 모르겠음
    // setMeeting(TESTDATA);
  }, []);
    return (
    <Container>
       <Input label="이름" value={Meeting.meetingName} disabled/>
       <Input label="종류" value={Meeting.meetingType} disabled/>
       <Input label="시작시간" value={Meeting.startDate} disabled/>
       <Input label="종료시간" value={Meeting.endDate} disabled/>
       <Desc label="설명" value={Meeting.description} disabled/>
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

export default MyPage_Act_Detail;