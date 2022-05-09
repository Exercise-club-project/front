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
const MyPage_MyInfo = ({navigation}) =>{
    return (
    <Container>
    </Container>
    )
}
export default MyPage_MyInfo;