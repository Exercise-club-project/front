import React ,{useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
    StyleSheet,
    View,
    Text,
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../funtion/request';
import axios from 'axios';

const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.background};
`;

const MyPage = ({navigation}) => {

    const [group, setGroup] = useState([{
      "num":1,
      "club": "club1",
      "school": "dankook",
      "score": 20,
      "clubId":1 // 화면을 넘어갈때 인자로 줘서 /group/get/{groupId}를 요청해서 그룹값을 받아야 되서
  },]);
    const [groupUser, setGroupUser] = useState([{
      "num":1,
      "name": "park",
      "club": "club1",
      "score": 10,
      "userId": 1,
  },]);
    const [wholeUser, setWholeUser] = useState([{
      "num":1,
      "name": "park",
      "club": "club1",
      "score": 10,
      "userId": 1,
  },]);
    // 아니 이거 여기에 rank/group , rank/group/user, rank/user를 다 받아와야지 
    // 인자로 순위를 넘겨줄 수 있는걸?
    const getGroupRank = async() =>{
        try{
          const response = await axios.get(
            `http://23.23.240.178:8080/rank/group`,
          );
          if(response.data.result === "SUCCESS"){
            const groups = response.data.data;
            const groupId = await AsyncStorage.getItem('MygroupId');
            //console.log(groupId);
            const selectgroup = groups.filter(it => it.clubId===parseInt(groupId));
            setGroup(selectgroup);
            console.log("group: ",selectgroup);
          }
        }
        catch(e){
          console.log(e);
        }
      };
      const getGroupUserRank = async () => {
        const res = await request({
          method: 'GET',
          url: `/rank/group/user`,
        });
  
        if(res.result === "SUCCESS"){
            const users = res.data;
            const userId = await AsyncStorage.getItem('MyUserId');
            console.log("userId", userId);
            const selectuser = users.filter(it => it.userId===parseInt(userId));
            setGroupUser(selectuser);
            console.log("user: ",selectuser);
            
        }
    };
    const getWholeUserRank = async() =>{
        try{
          const response = await axios.get(
            `http://23.23.240.178:8080/rank/user`,
          );
          console.log(response.data.data);
          if(response.data.result === "SUCCESS"){
            const users = response.data.data;
            console.log("userswhole : ", users);
            const userId = await AsyncStorage.getItem('MyUserId');
            console.log("userId", userId);
            const selectuser = users.filter(it => it.userId===parseInt(userId));
            setWholeUser(selectuser);
          }
        }
        catch(e){
          console.log(e);
        }
      };
      useEffect(() => {
          getGroupRank(); 
          getGroupUserRank();
          getWholeUserRank();
        // console.log(groupUser[0].name);
        // console.log(group[0].club);
        // console.log(group[0].school);
     }, []);

    return (
    <Container>
    <View>
        <View style={style.box1}>
            <View style={style.nameTextbox}>
                <Text style={style.nameText}>{groupUser[0].name}</Text>
            </View>
            <View style={style.clubschoolbox}>
            <View style={style.clubnamebox}>
                <Text style={style.clubnameText}>{group[0].club}</Text>
            </View>
            <View style={style.schoolnamebox}>
                <Text style={style.schoolnameText}>{group[0].school}</Text>
            </View>
            </View>
        </View>
    </View>
    <View style={style.box2}>
    <TouchableOpacity style={style.mypagebutton} onPress = {() => navigation.navigate('MyPage_MyInfo',{
            grouprank : groupUser[0].num,
            myrank : wholeUser[0].num,
          }
          )}>
        <Text style={style.buttontext}>내 정보</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.mypagebutton} onPress = {() => navigation.navigate('MyPage_Act')}>
        <Text style={style.buttontext}>활동 내역</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.mypagebutton} onPress = {() => navigation.navigate('MyPage_MyClub',{
            rank : group[0].num,
          })}>
        <Text style={style.buttontext}>나의 동아리</Text>
    </TouchableOpacity>
    </View>
    </Container>
    );
};

const style= StyleSheet.create({
    box1:{
        flexDirection:'row', 
        height: 80,
        marginTop: 20,
        marginHorizontal: 30,
        backgroundColor:'#ededed'
    },
    nameTextbox:{
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    clubschoolbox:{
        flex:3, 
        flexDirection:'column', 
        justifyContent:'center',
        alignContent:'center',
    },
    clubnamebox:{
        flex:1,
        paddingLeft:'15%',
        paddingBottom:5,
        justifyContent:'flex-end',
    },
    schoolnamebox: {
        flex:1,
        paddingLeft:'15%',
        paddingTop:5,
        justifyContent:'flex-start',
    },
    nameText: {
        fontSize:20,
        fontWeight: 'bold',
    },
    clubnameText: {
        fontSize:16,
        fontWeight: 'bold',
    },
    schoolnameText: {
        fontSize:16,
    },
    box2: {
        borderWidth:2,
        marginTop:20,
        marginHorizontal:30,
        paddingHorizontal:10,
        paddingBottom:10,
    },
    mypagebutton: {
        height:50,
        width:'100%', 
        justifyContent:'center',
        marginTop:10,
        paddingLeft:'5%',
    },
    buttontext: {
        fontSize:20,
        fontWeight: 'bold',
    },
})
export default MyPage;