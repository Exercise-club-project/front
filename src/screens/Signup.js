import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import {Button,Image, Input} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
background-color: ${({theme}) => theme.background};
padding: 50px 20px;
`;
const StyledText = styled.Text`
font-size: 30px;
color: #111111;
`;

const Signup = () => {
    const [name ,setName] = useState('');
    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [year, setYear] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);
    const refYear = useRef(null);
    const refPhoneNumber = useRef(null);

    const _handleSignupBtnPress = () => {
        console.log('signin');
    }
    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
    <Container>
        <Input 
        label = "Name" 
        placeholder = "Name" 
        returnKeyType = "next" 
        value = {name} 
        onChangeText = {setName}
        onSubmitEditing = {() => refEmail.current.focus()}
        />
        <Input 
        ref = {refEmail}
        label = "Email" 
        placeholder = "Email" 
        returnKeyType = "next" 
        value = {email} 
        onChangeText = {setEmail}
        onSubmitEditing = {() => refPassword.current.focus()}
        />
        <Input 
        ref = {refPassword}
        label = "Password" 
        placeholder = "Password" 
        returnKeyType = "next" 
        value = {password} 
        onChangeText = {setPassword}
        isPassword={true}
        onSubmitEditing = {() => refPasswordConfirm.current.focus()}
        />
        <Input 
        ref = {refPasswordConfirm}
        label = "PasswordConfirm" 
        placeholder = "PasswordConfirm" 
        returnKeyType = "next" 
        value = {passwordConfirm} 
        onChangeText = {setPasswordConfirm}
        isPassword={true}
        onSubmitEditing = {() => refYear.current.focus()}
        />
        <Input 
        ref = {refYear}
        label = "Year" 
        placeholder = "Year" 
        returnKeyType = "next" 
        value = {year} 
        onChangeText = {setYear}
        isPassword={true}
        onSubmitEditing = {() => refPhoneNumber.current.focus()}
        />
        <Input 
        ref = {refPhoneNumber}
        label = "PhoneNumber" 
        placeholder = "PhoneNumber" 
        returnKeyType = "done" 
        value = {phonenumber} 
        onChangeText = {setPhoneNumber}
        isPassword={true}
        onSubmitEditing = {_handleSignupBtnPress}
        />
        <Button title="로그인" onPress={_handleSignupBtnPress}/>
        
    </Container>
    </KeyboardAwareScrollView>
    );
};

export default Signup;