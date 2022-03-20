import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../components';

const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.background};
`;

const Profile = ({navigation, route}) => {
    console.log(route.params);
    return (
    <Container><Button 
    title = "로그아웃"
    onPress={() => navigation.navigate('Signin')}/>
    </Container>
    );
};

export default Profile;