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
import { MaterialIcons } from '@expo/vector-icons';
import request from '../funtion/request';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
`;

const TESTDATA = [
  {
    meetingId: 1,
    meetingName: "24일 정기모임!!!",
    meetingType: "정기모임",
    startTime: "2022-04-09 15:30",
  },
  {
    meetingId: 2,
    meetingName: "모임2",
    meetingType: "번개모임",
    startTime: "2022-04-09 15:30",
  },
  {
    meetingId: 3,
    meetingName: "모임3",
    meetingType: "총회",
    startTime: "2022-04-09 15:30",
  },
  {
    meetingId: 4,
    meetingName: "모임4",
    meetingType: "총회",
    startTime: "2022-04-09 15:30",
  },
  {
    meetingId: 5,
    meetingName: "모임5",
    meetingType: "총회",
    startTime: "2022-04-09 15:30",
  },
];

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
            <Text style={style.textmeetingName}>{item.meetingName}</Text>
            </View>
          <View style={style.meetingTypebox}>
            <Text style={style.textmeetingType}>{item.meetingType}</Text>
            </View>
        </View>
          <View style={{paddingVertical:5}}>
          <Text style={style.textstartTime}>{item.startTime}</Text>
          </View>
      </View>
    </ItemContainer>
  );

  const getMeeting = async () => {
    const groupId = AsyncStorage.getItem('groupId');
      const res = await request({
        method: 'GET',
        url: `/user/meeting/get/${groupId}`,
      });
    
      // res.data =>
    //   "data": [
    //     {
    //         "id" : 1 // 백엔드에 추가요청 해야함
    //         "name": "모임1",
    //         "type": "정기모임",
    //         "startTime": "2022-04-09 21:00"
    //     }
    // ]
    // 이 데이터 형식에 id를 추가해야할것으로 보임

      if(res.result === "SUCCESS"){
        setMeeting(res.data);
      }
  };

  useEffect(() => {
     //getMeeting(); // api data 수정 된 후 사용
     setMeeting(TESTDATA)
  }, []);

    return (
    <Container>
        <View style={style.groupList}>
          <View style={{margin:5,}}>
            <Text style={{fontSize: 18,fontWeight: 'bold',}}>실시간 모임</Text>
          </View>
        {Meeting.length ? (
          // 배열이 하나라도 차있다면
          <FlatList style={{paddingBottom:10,}}
            data={Meeting}
            keyExtractor={item => item.meetingName}
            renderItem={renderItem}
          />
        ) : (
          // 배열이 비어있다면
          <View style={style.meetingEmptybox}>
            <Text style={{fontSize: 16}}>진행 예정인 모임이 없습니다.</Text>
          </View>
        )}
      </View>
      <Button title = "모임 만들기" onPress = {() => navigation.navigate('CreateMeeting')}/>
    </Container>
    
    )
}

const style = StyleSheet.create({
  groupList: {
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
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