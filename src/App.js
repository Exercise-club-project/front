import react from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {theme} from './theme';
import Auth from "./navigations/Auth";
import Main from "./navigations/Main";
import { SplashScreen } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
    const token = AsyncStorage.getItem('accessToken');
    console.log(token);
    return (
    <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.background} barStyle="dark-content"/>
        <NavigationContainer>
             {/* {user.accessToken ?  <Auth/> : <Main/> }  */}
            {/* Accestoken이 있으면 Main으로 없으면 Auth로 */}
            {/* {token ? <Main/>: <Auth/>}
            {token ? <Auth/>: <Main/>} */}
            {/* <Stack.Navigator initialRouteName="SplashScreen"> */}
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{headerShown: false}}
                />
                {/* Auth Navigator: Include Login and Signup */}
                <Stack.Screen
                name="Auth"
                component={Auth}
                options={{headerShown: false}}
                />
                {/* Navigation Drawer as a landing page */}
                <Stack.Screen
                name="Main"
                component={Main}
                // Hiding header for Navigation Drawer
                options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </ThemeProvider>
    );
};
// 브랜치 커밋 테스트
export default App;