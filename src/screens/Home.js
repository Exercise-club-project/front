import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../components';
const exercises = [];



const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
// const StyledText = styled.Text`
//   font-size: 30px;
// `;
const Home = ({navigation}) =>{
    return (
    <Container>
        <Button title = "모임 만들기" onPress = {() => navigation.navigate('CreateMeeting')}/>
    </Container>
    )
}
export default Home;