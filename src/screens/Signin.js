import React, {useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {Button,Image, Input, ErrorMessage} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../util';
import { UserContext ,ProgressContext} from '../contexts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const {setUser} = useContext(UserContext);
    const {spinner} = useContext(ProgressContext);

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
             validateEmail(changedEmail) ? '' : '이메일을 확인해주세요'
              );
    }
    const _handlePasswordChange = password=>{
        setPassword(removeWhitespace(password));
    }
    const onLogin = async() =>{
      try{
        //spinner.start();
        const response = await axios.post(
          'http://23.23.240.178:8080/auth/login',
          {
            email: email,
            password: password,
          },
        );
        const token = response.data.data;
        if(response.data.result === "SUCCESS"){
          AsyncStorage.setItem('accessToken', token.accessToken);
          // 로그인성공시 accessToken을 받음
          navigation.navigate('SelectClub');
          // 로그인성공시 동아리 선택화면으로 이동
        }
        else{
          Alert.alert('계정이 존재하지 않습니다');
          setUser(token.accessToken); // 로그인 후 동아리 선택으로 넘어가므로
          // 이 함수는 동아리선택화면으로 넘기자
          
          // ..contexts의 User에서 token의 accessToken을 받아서 로그인 성공유무를 나눔

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
        <KeyboardAwareScrollView 
        extraScrollHeight={20} 
        contentContainerStyle = {{flex:1}}>
    <Container insets = {insets}>
        {/* <Image url=""/> 이후에 이미지 추가 할 것*/}
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
        {/* <Button title="로그인" onPress={() => navigation.navigate('Profile')} disabled={disabled}/> */}
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
