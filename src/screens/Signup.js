import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {Button,Input,ErrorMessage,Datetime} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import {validateEmail,validatePhonenumber,removeWhitespace} from '../util';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
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
justify-content: center;
align-items: center;
background-color: ${({theme}) => theme.background};
padding: 50px 20px;
`;

const Signup = ({navigation}) => {
    const placeholder = "생년월일을 선택해주세요";

    const [isFocused, setIsFocused] = useState(false);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("dateFormat: ", date.format("yyyy-MM-dd"));
        hideDatePicker();
        setBirthday(date.format("yyyy-MM-dd"))
    };

    const [email ,setEmail] = useState('');
    const [name ,setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sex, setSex] = useState('');

    console.log(birthday);
    const [errorMessage,setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const refName = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);
    const refPhoneNumber = useRef(null);
    const refSex = useRef(null);
    const refDidMount = useRef(null);

    const storeuserId = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem("MyUserId", jsonValue)
      } catch (e) {
        // saving error
      }
    }

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && birthday && phoneNumber
                && sex && !errorMessage)
            );
    }, [email,name,password,passwordConfirm,birthday,phoneNumber, sex, errorMessage]);

    useEffect(() => {
        if(refDidMount.current){
            let error = '';
            if(!email) error = '이메일을 입력해주세요!';
            else if(!validateEmail(email)) error = '이메일 형식을 확인해주세요!';
            else if(!name) error = '이름을 입력해주세요!';
            else if(password.length < 6) error = '비밀번호는 6자리가 넘어야합니다!';
            else if(password !== passwordConfirm) { error = '비밀번호가 일치하지 않습니다!';}
            else if (!birthday) error = '생년월일을 입력해주세요!';
            else if (!phoneNumber) error = '전화번호를 입력해주세요!';
            else if (!validatePhonenumber(phoneNumber)) error = '전화번호 형식을 확인해주세요! (xxx-xxxx-xxxx)!';
            else if (!sex) error = "성별을 선택해주세요!";
            else{
              error = '';
            }
            setErrorMessage(error);
        }
        else{
            refDidMount.current = true;
        }
        
    }, [email,name,password,passwordConfirm,birthday,phoneNumber,sex]) // 2번째 인자 {}로 되어 오류발생, []로 변경하여 오류 해결
    const _handleSignupBtnPress = async() =>{
        try{
          //spinner.start();
          const response = await axios.post(
            'http://23.23.240.178:8080/auth/register',
            {
                email: email,
                name: name,
                birthday: birthday,
                password: password,
                sex: sex,
                phoneNumber: phoneNumber,
            },
          );
          // 위의 Request를 보내면
          // Response로 result랑 data만 옴
          //const userid = response.data.data;
          const res = response.data;
          if(res.result === "SUCCESS"){
            storeuserId(res.data);
            // userid받는 부분
            
            navigation.navigate('SelectClub');
          }
          else{
            Alert.alert(res.data);
          }
        }
        catch(e){
          console.log(e);
        }
        finally{
          //spinner.stop();
        }
      };
    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
    <Container>
        <Input 
        label = "Email" 
        placeholder = "Email을 입력하세요." 
        returnKeyType = "next" 
        value = {email} 
        onChangeText = {setEmail}
        onSubmitEditing = {() => refName.current.focus()}
        onBlur={()=> setEmail(removeWhitespace(email))}
        />
         <Input 
        ref = {refName}
        label = "이름" 
        placeholder = "이름을 입력하세요." 
        returnKeyType = "next" 
        value = {name} 
        onChangeText = {setName}
        onSubmitEditing = {() => refPassword.current.focus()}
        onBlur={()=> setName(name.trim())}
        maxLength={12}
        />
        <Input 
        ref = {refPassword}
        label = "비밀번호" 
        placeholder = "사용하실 비밀번호를 입력하세요." 
        returnKeyType = "next" 
        value = {password} 
        onChangeText = {setPassword}
        isPassword={true}
        onSubmitEditing = {() => refPasswordConfirm.current.focus()}
        onBlur = {() => setPassword(removeWhitespace(password))}

        />
        <Input 
        ref = {refPasswordConfirm}
        label = "비밀번호 확인" 
        placeholder = "사용하실 비밀번호를 재입력해주세요." 
        returnKeyType = "next" 
        value = {passwordConfirm} 
        onChangeText = {setPasswordConfirm}
        isPassword={true}
        onSubmitEditing = {() => refPhoneNumber.current.focus()}
        onBlur = {() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        />

        <View style={styles.container}>
            <Label isFocused={isFocused}>생년월일</Label>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor='#a6a6a6'
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={birthday}
                    onBlur={() => {
                        setIsFocused(false);
                      }}
                    onFocus={() => setIsFocused(true)}
                />
                <DateTimePicker
                    headerTextIOS={placeholder}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>
        </View>

        <Input 
        ref = {refPhoneNumber}
        label = "전화번호" 
        placeholder = "010-0000-0000" 
        returnKeyType = "next" 
        value = {phoneNumber} 
        onChangeText = {setPhoneNumber}
        onSubmitEditing = {() => refSex.current.focus()}
        />
        <Input 
        ref = {refSex}
        label = "성별(M/F)" 
        placeholder = "M/F" 
        returnKeyType = "done" 
        value = {sex} 
        onChangeText = {setSex}
        onSubmitEditing = {_handleSignupBtnPress}
        />
        <ErrorMessage message = {errorMessage}/>
        <Button 
        title="회원가입" 
        onPress={_handleSignupBtnPress}
        disabled = {disabled}
        />
        
    </Container>
    </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({ 
  container: {
      // flex: 1,
      width: '100%',
      marginVertical: 10,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: 'white',
  },
  textInput: {
      fontSize: 16,
      color: '#000000',
      // height: 50, 
      width: '100%', 
      borderColor: '#a6a6a6', 
      borderWidth: 1, 
      borderRadius: 12,
      paddingVertical: 20,
      paddingHorizontal: 10,
  }
})
export default Signup;
