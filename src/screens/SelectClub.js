import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const StyledText = styled.Text`
  font-size: 30px;
`;
const Home = () =>{
    return (
    <Container>
        <StyledText>동아리 선택</StyledText>
        <StyledText>
            가입 후 첫 로그인이시군요!
            활동하고 계신 동아리를 선택해주세요
        </StyledText>
        <Button title = "모임 만들기" onPress = {() => Navigation.navigate('CreateMeeting')}/>
    </Container>
    )
}
export default Home;