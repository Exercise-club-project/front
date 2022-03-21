import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.background};
`;

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('token').then((value) =>
        navigation.replace(value === null ? 'Signin' : 'Profile'),
      );
    }, 2000);
  }, []);

  return (
    <Container>

    </Container>
  );
};

export default Splash;