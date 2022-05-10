import React, {useState,useRef, useContext} from 'react';
import styled from 'styled-components/native';
import {Button, Input} from '../components';
// import { FlatList, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeWhitespace } from '../util';
import request from '../funtion/request';
import { FlatList } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
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

const Search = styled.View`
flex: 3;
background-color: white;
align-items: center;
justify-content: center;
flex-direction: row;
margin-left: 30px;
margin-top: 50px;
`

const Touchable = styled.TouchableOpacity`
    margin-Left: 20px;
    width: 40px;
`;

const List = styled.View`
flex : 6;
`;


const SelectClub = (navigation) =>{
  const [colleage ,setColleage] = useState('');

  // setUser가 Signin에서 쓸때랑 색깔이 왜다르지? -> 노란색이 되어야 할텐데
  const refcolleage = useRef(null);

  const _handleColleageChange = colleage=>{
    setColleage(removeWhitespace(colleage)); // 대학교 공백제거
}

const onClub = async() =>{
    const response = await request({
      method : 'GET',
      url : `/user/group/search/${colleage}`,
    });
    // "result": "SUCCESS",
    // "data": [
    //     {
    //         "clubName": "club2",
    //         "school": "dankook",
    //         "leader": "park"
    //     }
    // ]
    const groupId = response.id;// id는 추후 결정될 것
    AsyncStorage.setItem('groupId', groupId);
};

const upClub = async() =>{
  const groupId = AsyncStorage.getItem('groupId');
  const response = await request({
    method : 'GET',
    url : `/user/group/join/${groupId}`,
  });
  const MyGroupId = response.data;
  AsyncStorage.setItem('MyGroupId', MyGroupId);
  navigation.navigate('Main');
};
    return (
    <Container>
      <StyledText>동아리 선택</StyledText>
      <Explain>
            가입 후 첫 로그인이시군요!
      </Explain>
      <Explain>
            활동하고 계신 동아리를 선택해주세요!
      </Explain>
      <Search>
        <Input 
          ref = {refcolleage}
          label = "검색(학교이름)" 
          placeholder = "colleage" 
          returnKeyType = "done" 
          value = {colleage} 
          onChangeText = {_handleColleageChange}
        />
       <Touchable onPress={onClub}>
           <Icon name="search" size={30} />
        </Touchable>
      </Search>
      <List>

        <FlatList


        />

      </List>
      <Button title = "선택 완료" onPress = {upClub}/>
    </Container>
    )
}
export default SelectClub;