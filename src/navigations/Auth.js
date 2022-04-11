import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Signin, Signup, SelectClub, QR, Home} from '../screens'; //QR화면 이동을 위해 QR 추가, Home화면으로 버튼 연결을 위해 Home추가
import {MaterialIcons} from '@expo/vector-icons';

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
        component={Signin} //첫 화면이 QR로 넘어가게 임시 수정
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