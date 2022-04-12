import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Signin, Signup, SelectClub, QR, Home} from '../screens'; //QR화면 이동을 위해 QR 추가, Home화면으로 버튼 연결을 위해 Home추가
import {MaterialIcons} from '@expo/vector-icons';
// import QRScanner from '../screens/QRScanner'; 예는 {} 안에다가 넣으면 오류가 생김, 따로 화면 전부를 가져와야함

const Stack = createStackNavigator();

const Auth = () => {
    const theme = useContext(ThemeContext);
    return (
    <Stack.Navigator
    screenOptions={{
        cardStyle: {backgroundColor: theme.background},
        }}
    >
        <Stack.Screen 
        name="Signin" 
        component={Signin} //테스트 하고 싶은 화면이 처음으로 나오게 임시 수정해서 사용중
        options ={{headerShown:false}}
        />
        <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options= {{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: theme.text,
        headerLeft:({onPress, tintColor}) => 
        (<MaterialIcons 
            name = "keyboard-arrow-left"
            size = {38}
            color = {tintColor}
            onPress={onPress}/>
            ),
        }}
        />
        <Stack.Screen 
        name="SelectClub" 
        component={SelectClub} 
        options ={{headerShown:false}}
        />

        <Stack.Screen 
        name="Home" 
        component={Home} 
        options ={{headerShown:false}}
        />

    </Stack.Navigator>
    );
};

export default Auth;