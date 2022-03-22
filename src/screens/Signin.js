import React, {useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {Button,Image, Input, ErrorMessage} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { validateEmail, removeWhitespace } from '../util';

const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
background-color: ${({theme}) => theme.background};
padding: 0 20px;
padding-top: ${({insets:{top}}) => top}px;
padding-bottom: ${({insets:{bottom}}) => bottom}px;
`;
const StyledText = styled.Text`
font-size: 30px;
color: #111111;
`;

const Signin = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const theme = useContext(ThemeContext);

    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const refemail = useRef(null);
    const refPassword = useRef(null);

    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
      }, [email, password, errorMessage]);

    const _handleEmailChange = email=>{
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
             validateEmail(changedEmail) ? '' : 'Please verify your email'
              );
    }
    const _handlePasswordChange = password=>{
        setPassword(removeWhitespace(password));
    }
    const onLogin = async () => {
        try {
          const response = await axios.get(
            'http://23.23.240.178:8080/auth/login',
            {
            // 여기서 이메일, 비밀번호를 백엔드에 보내서 상태값 얻음
              email: email,
              password: password,
            }, {
              headers: {
                  'Content-Type': 'x-ww-form-urlencoded'
              }
      }
      );
          // 어떻게 얻지? SUCCESSS 얻었다고 치고 나중에 고치자
          //{
           // result = "SUCCESS"
           // data = "token값" 
          //}
          console.log('token :', response.data.data);
          const token= response.data.data;
          if (token === null) {
            Alert.alert('존재하지 않는 계정입니다');
            // navigation.navigate('Profile');
          } else {
            AsyncStorage.setItem('token', token);
            // 요청 후 응답에서 토큰이 있을 경우 Splash로
            navigation.navigate('Splash');
          }
        } catch (e) {
          console.log(email)
          console.log(password)
          console.log(e);
        }
      };
    
    return (
        <KeyboardAwareScrollView 
        extraScrollHeight={20} 
        contentContainerStyle = {{flex:1}}>
    <Container insets = {insets}>
        <Image url=""/>
        <Input 
        ref = {refemail}
        label = "Email" 
        placeholder = "Email" 
        returnKeyType = "next" 
        value = {email} 
        onChangeText = {_handleEmailChange}
        onSubmitEditing = {() => refPassword.current.focus()}
        />
        <Input 
        ref = {refPassword}
        label = "Password" 
        placeholder = "Password" 
        returnKeyType = "done" 
        value = {password} 
        onChangeText = {_handlePasswordChange}
        isPassword={true}
        />
        <ErrorMessage message={errorMessage} />
        <Button title="로그인" onPress={onLogin} disabled={disabled}/>
        <Button 
        title="회원가입" 
        onPress={() => navigation.navigate('Signup')}
        containerStyle= {{marginTop:0, backgroundColor:'transparent'}}
        textStyle= {{color: theme.btnTextLink, fontSize: 18 }}
         />
    </Container>
    </KeyboardAwareScrollView>
    );
};

export default Signin;