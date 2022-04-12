import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Button, Input} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext ,ProgressContext} from '../contexts';
// import ReactSearchBox from "react-search-box";
// import Autocomplete from 'react-native-autocomplete-input'; // 왜 안되냐

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const StyledText = styled.Text`
  font-size: 20px;
`;
const Explain = styled.Text`
  font-size: 15px;
`;

const SelectClub = () =>{
  const [coleeage ,setColleage] = useState('');

  const {setUser} = useContext(UserContext);
  // setUser가 Signin에서 쓸때랑 색깔이 왜다르지? -> 노란색이 되어야 할텐데
  
  const IsToken = () => {
    const token = AsyncStorage.getItem('accessToken');
    // Signin에서 setItem으로 받은 accessToken사용
    if(token === NULL){ // 없을경우 (이 화면으로 넘어오면 NULL일리가 없음, 로그인이 성공했다는 거니까) 
      Alert.alert('토큰이 생성되어있지 않습니다!');
    }
    else{
      setUser(token);
      // setUser는 token유무에 따라 Main화면 Auth화면으로 갈리게 함
    }
  }
    return (
    <Container>
        <StyledText>동아리 선택</StyledText>
        <Explain>
            가입 후 첫 로그인이시군요!
            활동하고 계신 동아리를 선택해주세요
        </Explain>

        <Button title = "선택 완료" onPress = {IsToken}/>
    </Container>
    )
}
export default SelectClub;