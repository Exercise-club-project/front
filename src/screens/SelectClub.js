import React, {useState,useRef, useContext} from 'react';
import styled from 'styled-components/native';
import {Button, Input} from '../components';
// import { FlatList, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { removeWhitespace } from '../util';
import request from '../funtion/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


const SelectClub = ({navigation}) =>{
  const [colleage ,setColleage] = useState('');
  const [clubId,setClubId] = useState('');
  const [colleages, setColleages] = useState([]);

  const refcolleage = useRef(null);

  const renderItem = ({ item }) => (
    <ItemContainer onPress = {
      () => {storegroupId(item.clubId);
        console.log("groupId: ", item.clubId);
      Alert.alert('동아리 선택 완료!');
      }
  }>
      <ItemTextContainer>
          <ItemClubName>동아리명 : {item.clubName}</ItemClubName>
          <ItemSchool>학교명 : {item.school}</ItemSchool>
          <ItemLeader>회장 : {item.leader}</ItemLeader>
      </ItemTextContainer>
    </ItemContainer>
  );

  const _handleColleageChange = colleage=>{
    setColleage(removeWhitespace(colleage)); // 대학교 공백제거
}
const storegroupId = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem("groupId", jsonValue)
  } catch (e) {
    // saving error
  }
}

const storeMygroupId = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem("MygroupId", jsonValue)
  } catch (e) {
    // saving error
  }
}
const onClub = async() =>{
    const response = await request({
      method : 'GET',
      url : `/user/group/search/${colleage}`,
    });

   // console.log(response);
    setColleages(response.data);
};

const upClub = async() =>{
  //console.log("분류");
  AsyncStorage.getItem('groupId',(err, value) =>{
    if(err){
      console.log(err);
    }
    else{
      setClubId(JSON.parse(value));
    }
  });
 // console.log("groupId: ", clubId); // 잘오는데 왜 아래 api가 먹통이냐아아아아
 
  const response = await request({
    method : 'POST',
    url : `/user/group/join/${clubId}`,
  });
  if(response.result ==="SUCCESS"){
   // console.log("MygroupId",response.data);
    storeMygroupId(response.data);
    navigation.navigate('Main');
  }
  else{
    console.log("응답실패");
  }

  //navigation.navigate('Main');
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
      <View style={styles.groupList}>
        {colleages.length ? (
          // 배열이 하나라도 차있다면
          <FlatList
            data={colleages}
            keyExtractor={item => item.clubId}
            renderItem={renderItem}
          />
        ) : (
          // 배열이 비어있다면
          <Text style={styles.text}>본인의 학교를 검색해주세요!</Text>
        )}
      </View>
      <Button title = "선택 완료" onPress = {upClub}/>
    </Container>
    )
}
const styles = StyleSheet.create({
  groupList: {
    marginTop: 50,
    marginBottom: 30,
    flex: 4,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  },
})
const ItemContainer = styled.TouchableOpacity`
  flex-direction : row;
  align-items: center;
  border-bottom-width: 1px;
  border-color : #111111;
  padding: 15px 60px;
`;
const ItemTextContainer = styled.View`
  flex-direction: column;
  border-color : #a6a6a6;
  background-color: #a6a6a6;
`;
const ItemClubName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  border-color : #a6a6a6;
`;
const ItemSchool = styled.Text`
  font-size: 18px;
  margin-top: 3px;
  border-color : #a6a6a6;
`;
const ItemLeader = styled.Text`
  font-size: 12px;
`;

export default SelectClub;