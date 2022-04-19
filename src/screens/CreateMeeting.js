import React,{useState,useRef,useEffect} from 'react';
import styled from 'styled-components/native';
import { Picker } from 'react-native';
import {Button} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [error,setError] = useState('');
  const [disabled, setDisabled] =useState(true);

  const refType = useRef(null);
  const refStart = useRef(null);
  const refEnd = useRef(null);
  const refDesc = useRef(null);

    return (
    <Container>
      <Input label = "meetingName" value= {meetingName} />
      <Picker
        meetingType={meetingType}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setMeetingType(itemValue)}
      >
        <Picker.Item label="정기모임" value={meetingType} />
        <Picker.Item label="번개모임" value={meetingType} />
        <Picker.Item label="총회" value={meetingType} />
      </Picker>
      <Input label = "startDate" value= {startDate} />
      <Input label = "endDate" value= {endDate} />
      <Input label = "description" value= {description} />
        <Button 
        title = "모임 만들기" 
        disabled = {disabled}
        onPress = {() => navigation.navigate('Home')}/>
    </Container>
    )
}
export default CreateMeeting;