import React,{useState,useRef,useEffect} from 'react';
import styled from 'styled-components/native';
import {Button, Input,ErrorMessage} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import request from '../funtion/request';
// import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const StyledText = styled.Text`
  font-size: 30px;
`;
const CreateMeeting = ({navigation}) =>{
  const [meetingName, setMeetingName] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [disabled, setDisabled] =useState(true);

  const refType = useRef(null);
  const refStart = useRef(null);
  const refEnd = useRef(null);
  const refDesc = useRef(null);
  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(
        !(meetingName && startDate && endDate)
        );
}, [meetingName,startDate,endDate]);

useEffect(() => {
    if(refDidMount.current){
        let error = '';
        if(!meetingName) error = '동아리 이름을 입력해주세요!';
        else if(!startDate) error = '동아리 시작시간을 입력해주세요!';
       // else if(!validateTime(startDate)) error = '시간형식을 맞춰주세요(xxxx-xx-xx xx:xx)!';
        else if(!endDate) { error = '동아리 종료시간을 입력해주세요!';}
        // else if(!validateTime(endDate)) error = '시간형식을 맞춰주세요(xxxx-xx-xx xx:xx)!';
        setErrorMessage(error);
    }
    else{
        refDidMount.current = true;
    }
    
}, [meetingName,startDate,endDate])
  const _handleCreateMeetingBtnPress = async() =>{
    const response = await request({
      method : 'POST',
      url : '/meeting/create',
      data: {
          meetingName : meetingName,
          meetingType : meetingType,
          startDate : startDate,
          endDate : endDate,
          description  : description
      },
    });
    const res = response.data;
    if(res.result == SUCCESS){
      const MeetingId = JSON.stringify(res.data);
      AsyncStorage.setItem('MeetingId', MeetingId);
    }
    else{
      Alert.alert(res.data);
    }
  };
    return (
      <KeyboardAwareScrollView>
    <Container>
      <Input 
      label = "meetingName" 
      placeholder = "meetingName" 
      returnKeyType = "next" 
      value = {meetingName} 
      onChangeText = {setMeetingName}
      onSubmitEditing = {() => refType.current.focus()}
      />
      <RNPickerSelect
      label = "meetingType" 
      placeholder={{
        label: meetingType,
      }}
      value={meetingType}
      // onChangeText = {setMeetingType}
      onValueChange={setMeetingType}
      items={[
        { label: '정기모임', value: '정기모임' },
        { label: '번개모임', value: '번개모임' },
        { label: '총회', value: '총회' },
      ]}
      onSubmitEditing = {() => refStart.current.focus()}
     />
      <Input 
      label = "startDate" 
      placeholder = "xxxx-xx-xx xx:xx" 
      returnKeyType = "next" 
      value = {startDate} 
      onChangeText = {setStartDate}
      onSubmitEditing = {() => refEnd.current.focus()}
      />
      <Input 
      label = "endDate" 
      placeholder = "xxxx-xx-xx xx:xx" 
      returnKeyType = "next" 
      value = {endDate} 
      onChangeText = {setEndDate}
      onSubmitEditing = {() => refDesc.current.focus()}
       />
      <Input 
      label = "description" 
      placeholder = "description" 
      returnKeyType = "next" 
      value = {description} 
      onChangeText = {setDescription}
      onSubmitEditing = {_handleCreateMeetingBtnPress}
      />
      <ErrorMessage message = {errorMessage}/>
        <Button 
        title = "모임 만들기" 
        onPress={_handleCreateMeetingBtnPress}
        disabled = {disabled}
        />
    </Container>
    </KeyboardAwareScrollView>
    )
}
export default CreateMeeting;