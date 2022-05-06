import React,{useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';
import { ProgressContext } from '../contexts';
import { Spinner } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
    const {inProgress} = useContext(ProgressContext);
    const token = AsyncStorage.getItem('accessToken');
    return (
    <NavigationContainer>
       {/* {user.accessToken ?  <Auth/> : <Main/> }  */}
       {/* Accestoken이 있으면 Main으로 없으면 Auth로 */}
       {token ? <Auth/> : <Main/>}
       {inProgress && <Spinner/>}
    </NavigationContainer>
    )
};

export default Navigation;