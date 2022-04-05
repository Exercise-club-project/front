import React, {useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {Button,Image, Input, ErrorMessage} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../util';
import { UserContext ,ProgressContext} from '../contexts';

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
    const onLogin = () => {
      spinner.start();
      fetch('http://23.23.240.178:8080/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
         },
        body : JSON.stringify({
          email: email,
          password: password,
        })
      })
      .then((response)=> response.json())
      .then((responseJson) => {
        if(responseJson.result === 'SUCCESS'){
         //setUser(user);
          setUser(responseJson.data.accessToken);
          //AsyncStorage.setItem('token', responseJson.data.accessToken);
         // navigation.navigate('Profile');
          //AsyncStorage.setItem('token', token);
        }
        else{
          Alert.alert('존재하지 않는 계정입니다');
        }
      })
      .catch ((e) =>{
        console.log(email)
        console.log(password)
        console.log(e);
      })
      .finally(()=>spinner.stop());
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