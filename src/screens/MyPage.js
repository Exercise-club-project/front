import React,{useContext} from 'react';
import { UserContext } from '../contexts';
import styled from 'styled-components/native';
import {Button} from '../components';

const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.background};
`;

const MyPage = ({navigation, route}) => {
    const {setUser} = useContext(UserContext);
    return (
    <Container>
    <Button title = "로그아웃"
    onPress={() => setUser({})}
    />
    </Container>
    );
};

export default MyPage;