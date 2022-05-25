import React,{useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Button} from '../components';
import request from '../funtion/request';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 30px;
`;

const ItemContainer = styled.TouchableOpacity`
`;


const Home = ({navigation}) =>{
  const [Meeting, setMeeting] = useState([]);
  const renderItem = ({ item }) => (
    <ItemContainer style={style.ItemContainerstyle} onPress = {() => navigation.navigate('MeetingDetail',{
      id : item.meetingId,
    }
    )}>   
      <View style={{width:'90%', flexDirection: 'column',}}>
        <View style={{flexDirection: 'row', }}>
          {/* <Text>{item.meetingId}</Text> */}
          <View style={style.meetingNamebox}>
            <Text style={style.textmeetingName}>{item.name}</Text>
            </View>
          <View style={style.meetingTypebox}>
            <Text style={style.textmeetingType}>{item.type}</Text>
            </View>
        </View>
          <View style={{paddingVertical:5}}>
          <Text style={style.textstartTime}>{item.startTime}</Text>
          </View>
      </View>

    </ItemContainer>
  );

  const getMeeting = async () => {
    const groupId = await AsyncStorage.getItem('MygroupId');
      const res = await request({
        method: 'GET',
        url: `/user/meeting/get/${groupId}`,
      });

      if(res.result === "SUCCESS"){
        setMeeting(res.data);
      }
  };

  useEffect(() => {
     getMeeting(); // api data 수정 된 후 사용
     //setMeeting(TESTDATA)
  });

//   useEffect(() => {
//     getMeeting(); // api data 수정 된 후 사용
//     //setMeeting(TESTDATA)
//  });

    return (
    <Container>
      <View style={{flex:1, paddingBottom:10,}}>
        <View style={style.groupList}>
          <View style={{margin:5,}}>
            <Text style={{fontSize: 18,fontWeight: 'bold',}}>실시간 모임</Text>
          </View>
        {Meeting.length ? (
          // 배열이 하나라도 차있다면
          <FlatList style={{paddingBottom:10,}}
            data={Meeting}
            keyExtractor={item => item.meetingId}
            renderItem={renderItem}
          />
        ) : (
          // 배열이 비어있다면
          <View style={style.meetingEmptybox}>
            <Text style={{fontSize: 16}}>진행 예정인 모임이 없습니다.</Text>
          </View>
        )}
      </View>
      </View>
      <Button title = "모임 만들기" onPress = {() => navigation.navigate('CreateMeeting')}/>
    </Container>
    
    )
}

const style = StyleSheet.create({
  groupList: {
    maxHeight: '100%',
    marginTop:10,
    marginBottom: 10,
    borderWidth: 2,
  },
  textmeetingName: {
    fontSize:18
  },
  textmeetingType: {
    fontSize:16, 
    fontWeight: 'bold'
  },
  textstartTime: {
    fontSize:14
  },
  meetingEmptybox: {
    flex:1, 
    minHeight: 200,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  ItemContainerstyle: {
    flex:1,
    marginLeft:20, 
    marginRight:20, 
    marginTop:10, 
    marginBottom:5, 
    borderWidth:1,
    alignItems: 'center',
    backgroundColor: '#EDEDED',
  },
  meetingNamebox:{
    flex:3,
    minWidth: 150,
    paddingVertical: 5,
  },
  meetingTypebox: {
    flex:1,
    minWidth:60,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default Home;