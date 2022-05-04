import React,{useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { UserContext, ProgressContext } from '../contexts';
import Main from './Main';
import { Spinner } from '../components';

const Navigation = () => {
    const {user} = useContext(UserContext);
    const {inProgress} = useContext(ProgressContext);
    return (
    <NavigationContainer>
       {/* {user.accessToken ?  <Auth/> : <Main/> }  */}
       {/* Accestoken이 있으면 Main으로 없으면 Auth로 */}
       {user ? <Auth/> : <Main/>}
       {inProgress && <Spinner/>}
    </NavigationContainer>
    )
};

export default Navigation;