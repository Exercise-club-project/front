import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../components';

const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.background};
`;

const MyPage = ({navigation}) => {
    return (
    <Container>
    <Button title = "내 정보" onPress = {() => navigation.navigate('MyInfo')}/>
    <Button title = "활동 내역" onPress = {() => navigation.navigate('MyPage_MeetingDetail')}/>
    <Button title = "나의 동아리" onPress = {() => navigation.navigate('MyClub')}/>
    </Container>
    );
};

export default MyPage;