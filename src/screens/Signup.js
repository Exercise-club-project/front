import React, { useState, useRef, useEffect ,useContext} from 'react';
import styled from 'styled-components/native';
import {Button,Input,ErrorMessage} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import {validateEmail,validateBirthday,validatePhonenumber,removeWhitespace} from '../util';
import { ProgressContext } from '../contexts';
import axios from 'axios';

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

const Signup = ({navigation}) => {
    const {spinner} = useContext(ProgressContext);
    const [email ,setEmail] = useState('');
    const [name ,setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sex, setSex] = useState('');

    const [errorMessage,setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const refName = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);
    const refBirthday = useRef(null);
    const refPhoneNumber = useRef(null);
    const refSex = useRef(null);
    const refDidMount = useRef(null);

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
            else if (!validateBirthday(birthday)) error = '생년월일 형식을 확인해주세요! (xxxx-xx-xx)';
            else if (!phoneNumber) error = '전화번호를 입력해주세요!';
            else if (!validatePhonenumber(phoneNumber)) error = '전화번호 형식을 확인해주세요! (xxx-xxxx-xxxx)!';
            else if (!sex) error = "성별을 선택해주세요!";
            setErrorMessage(error);
        }
        else{
            refDidMount.current = true;
        }
        
    }, [email,name,password,passwordConfirm]) // 2번째 인자 {}로 되어 오류발생, []로 변경하여 오류 해결
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
          if(response.data.result === "SUCCESS"){
            navigation.navigate('Signin');
            // 회원가입 후 로그인 화면으로 이동
            // AsyncStorage.setItem('userid', userid);
          }
          else{
            const res = response.data.result;
            console.log(res);
            Alert.alert(response.data.data);
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
        placeholder = "Email" 
        returnKeyType = "next" 
        value = {email} 
        onChangeText = {setEmail}
        onSubmitEditing = {() => refName.current.focus()}
        onBlur={()=> setEmail(removeWhitespace(email))}
        />
         <Input 
        ref = {refName}
        label = "Name" 
        placeholder = "Name" 
        returnKeyType = "next" 
        value = {name} 
        onChangeText = {setName}
        onSubmitEditing = {() => refPassword.current.focus()}
        onBlur={()=> setName(name.trim())}
        maxLength={12}
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
        onBlur = {() => setPassword(removeWhitespace(password))}

        />
        <Input 
        ref = {refPasswordConfirm}
        label = "PasswordConfirm" 
        placeholder = "PasswordConfirm" 
        returnKeyType = "next" 
        value = {passwordConfirm} 
        onChangeText = {setPasswordConfirm}
        isPassword={true}
        onSubmitEditing = {() => refBirthday.current.focus()}
        onBlur = {() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        />
        <Input 
        ref = {refBirthday}
        label = "Birthday" 
        placeholder = "xxxx-xx-xx" 
        returnKeyType = "next" 
        value = {birthday} 
        onChangeText = {setBirthday}
        onSubmitEditing = {() => refPhoneNumber.current.focus()}
        />
        <Input 
        ref = {refPhoneNumber}
        label = "PhoneNumber" 
        placeholder = "010-xxxx-xxxx" 
        returnKeyType = "next" 
        value = {phoneNumber} 
        onChangeText = {setPhoneNumber}
        onSubmitEditing = {() => refSex.current.focus()}
        />
        <Input 
        ref = {refSex}
        label = "Sex" 
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

export default Signup;