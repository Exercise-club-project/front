import React, {useState,useRef, useEffect,useContext} from 'react';
import styled from 'styled-components/native';
import {Button, Input} from '../components';
import {
  Alert,
  StyleSheet,
  View,
  Text,
} from 'react-native';
// import { removeWhitespace } from '../util';
import request from '../funtion/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const ClubTestData = [
  {
    clubid: 1,
    school: "단국대학교(죽전)", 
    name: "FLY",
  },
  {
    clubid: 2,
    school: "고려대학교", 
    name: "KUBC",
  },
  {
    clubid: 3,
    school: "서강대학교", 
    name: "굿민턴",
  },
  {
    clubid: 4,
    school: "가천대학교", 
    name: "Connect",
  },
  {
    clubid: 5,
    school: "강남대학교", 
    name: "파닥파닥",
  },
  {
    clubid: 6,
    school: "연세대학교(서울)", 
    name: "파워스",
  },
  {
    clubid: 7,
    school: "경기대학교", 
    name: "세팅",
  },
  {
    clubid: 8,
    school: "경희대학교", 
    name: "하이클리어",
  },
]

const SelectClub = ({navigation}) =>{

  const [searchTerm, setsearchTerm] = useState('');

  const [colleages, setColleages] = useState([]);


  const getClubs = async() =>{
    try{
      const response = await axios.get(
        `http://23.23.240.178:8080/user/group/searchAll`,
      );
      if(response.data.result === "SUCCESS"){
        // console.log('result : ', response.data.result);
        // console.log('data : ',response.data.data);
        setColleages(response.data.data);
      }
    }
    catch(e){
      console.log(e);
    }
  };
  useEffect(() => {
    getClubs(); // api data 수정 된 후 사용
    //setColleages(ClubTestData);
  }, []);
  


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
    // MygroupId 받는 부분
    // api변경요청 -> 로그인화면으로
  } catch (e) {
    // saving error
  }
}

const upClub = async() =>{
  const userId = await AsyncStorage.getItem('MyUserId');
  const groupId = await AsyncStorage.getItem('groupId');
  console.log("userId : ", userId);
  console.log("groupId : ", groupId);
  try{
    const response = await axios.post(
      `http://23.23.240.178:8080/${userId}/group/join/${groupId}`,
    );
    if(response.data.result === "SUCCESS"){
      storeMygroupId(response.data.data);
      navigation.navigate('Signin');
    }
  }
  catch(e){
    console.log(e);
  }
};

// 데이터 필터링 테스트용 로그
// console.log(ClubTestData.filter(clubid => clubid.school.includes("단")));

    return (
    <View style={style.Container}>

      <View style={style.noticebox}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding:'10%'}}>동아리 선택</Text>
        <Text style={{fontSize: 16,}}>동아리를 선택해주세요!</Text>
      </View>
  
      <Input 
          // label = "검색(학교이름)" 
          placeholder = "학교명을 입력해주세요" 
          returnKeyType = "next" 
          value = {searchTerm} 
          onChangeText = {setsearchTerm}
        />

      <View style={{flex:2, width:'100%',}}>
        {/* 검색되는 리스트 렌더링 부분 */}
        <ScrollView>
          {colleages.filter(clubId => clubId.school.includes(searchTerm)).map((clubId) => {
            return (
              <TouchableOpacity
              onPress = {
                () => {storegroupId(clubId.clubId);
                Alert.alert('동아리 선택 완료!');
                }}
              key={clubId.clubId} 
              style={{flexDirection:'row', alignItems:'center',height: 50, borderWidth: 1, marginVertical:4, borderRadius:12}}>
                <Text style={{fontSize:16,marginLeft:'20%'}}>{clubId.school}</Text>
                <Text style={{fontSize:16,marginLeft: 15}}>{clubId.clubName}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <Button title = "선택 완료" onPress = {upClub}/>
    </View>
    )
}
const style = StyleSheet.create({
  Container: {
    flex:1,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  noticebox: {
    flex:1,
    maxHeight: 200,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  groupList: {
    marginTop: 50,
    marginBottom: 30,
    flex: 4,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
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