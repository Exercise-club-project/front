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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const SelectClub = ({navigation,route}) =>{

  const userId = route.params.id;
  
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
  // const userId = await AsyncStorage.getItem('MyUserId');
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


export default SelectClub;