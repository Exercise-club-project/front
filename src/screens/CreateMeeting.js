import React,{useState,useRef,useEffect} from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Button, Input, ErrorMessage,Desc} from '../components';
import request from '../funtion/request';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { View, StyleSheet, TouchableOpacity, TextInput,Text } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
Date.prototype.format = function(f) {
  if (!this.valueOf()) return " ";

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var d = this;
   
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear();
          case "yy": return (d.getFullYear() % 1000).zf(2);
          case "MM": return (d.getMonth() + 1).zf(2);
          case "dd": return d.getDate().zf(2);
          case "E": return weekName[d.getDay()];
          case "HH": return d.getHours().zf(2);
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
          case "mm": return d.getMinutes().zf(2);
          case "ss": return d.getSeconds().zf(2);
          case "a/p": return d.getHours() < 12 ? "오전" : "오후";
          default: return $1;
      }
  });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

const Label = styled.Text`
font-size: 14px;
font-weight: 600;
margin-bottom: 6px;
color: ${({ theme, isFocused }) =>
  isFocused ? theme.text : theme.inputLabel};
`;
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const CreateMeeting = ({navigation}) =>{

  const placeholder = "날짜와 시간을 선택해주세요";

    const [isFocused, setIsFocused] = useState(false);

    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [start, onChangeStart] = useState("");
    const [end, onChangeEnd] = useState("");

    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        console.log("dateFormat: ", date.format("yyyy-MM-dd hh:mm"));
        hideDatePicker1();
        onChangeStart(date.format("yyyy-MM-dd hh:mm"));
    };
    const showDatePicker2 = () => {
      setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
      setDatePickerVisibility2(false);
  };
    const handleConfirm2 = (date) => {
      console.log("dateFormat: ", date.format("yyyy-MM-dd hh:mm"));
      hideDatePicker2();
      onChangeEnd(date.format("yyyy-MM-dd hh:mm"));
  };

  const [meetingName, setMeetingName] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [disabled, setDisabled] =useState(true);

  const refType = useRef(null);
  const refDesc = useRef(null);

  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(
        !(meetingName)
        );
}, [meetingName]);

useEffect(() => {
    if(refDidMount.current){
        let error = '';
        if(!meetingName) error = '동아리 이름을 입력해주세요!';
        setErrorMessage(error);
    }
    else{
        refDidMount.current = true;
    }
    
}, [meetingName])

  const _handleCreateMeetingBtnPress = async() =>{
    console.log(meetingName,meetingType,start,end,description)
    const response = await request({
      method : 'POST',
      url : 'user/meeting/create',
      data: {
          meetingName : meetingName,
          meetingType : meetingType,
          startDate : start,
          endDate : end,
          description : description,
      },
    });
    // 로그인을 통해 accessToken을 받지않아 오류가 생기는것일듯
    // 왜 오류나지?
    
    if(response.result === "SUCCESS"){
      //navigation.replace('Home');
      navigation.goBack();
    }
    else{
      console.log(response.data);
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
      <View style={styles.container}>
      <Label isFocused={isFocused}>모임종류</Label>
      <RNPickerSelect
      ref = {refType}
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
      onSubmitEditing = {() => refDesc.current.focus()}
     />
     </View>
      <View style = {styles.rowcontainer}>
        <View style={styles.container}>
            <Label isFocused={isFocused}>시작시간</Label>
            <TouchableOpacity onPress={showDatePicker1}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor='#a6a6a6'
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={start}
                    onBlur={() => {
                        setIsFocused(false);
                      }}
                    onFocus={() => setIsFocused(true)}
                />
                <DateTimePicker
                    headerTextIOS={placeholder}
                    isVisible={isDatePickerVisible1}
                    mode="datetime"
                    onConfirm={handleConfirm1}
                    onCancel={hideDatePicker1}
                />
            </TouchableOpacity>
        </View>
        </View>
        <View style = {styles.rowcontainer}>
        <View style={styles.container}>
            <Label isFocused={isFocused}>종료시간</Label>
            <TouchableOpacity onPress={showDatePicker2}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor='#a6a6a6'
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={end}
                    onBlur={() => {
                        setIsFocused(false);
                      }}
                    onFocus={() => setIsFocused(true)}
                />
                <DateTimePicker
                    headerTextIOS={placeholder}
                    isVisible={isDatePickerVisible2}
                    mode="datetime"
                    onConfirm={handleConfirm2}
                    onCancel={hideDatePicker2}
                />
            </TouchableOpacity>
        </View>
        </View>
      <Desc 
      ref = {refDesc}
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

const styles = StyleSheet.create({ 
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 10,
  },
  rowcontainer: {
      flexDirection : 'row',
  },
  textInput: {
      fontSize: 16,
      color: '#000000',
      height: 50, 
      width: 370, 
      borderColor: '#000000', 
      borderWidth: 1, 
      borderRadius: 12,
      padding: 10
  }
})

export default CreateMeeting;