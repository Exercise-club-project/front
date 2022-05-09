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
// const StyledText = styled.Text`
//   font-size: 30px;
// `;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color : #111111;
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex-direction: column;
  border-color : #a6a6a6;
  background-color: #a6a6a6;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  border-color : #a6a6a6;
`;
const ItemType = styled.Text`
  font-size: 18px;
  margin-top: 3px;
  border-color : #a6a6a6;
`;
const ItemTime = styled.Text`
  font-size: 12px;
`;
const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: theme.itemIcon,
}))``;

const TESTDATA = [
  {
    meetingId: 1,
    meetingName: "모임1",
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
];

const MyPage_Act = ({navigation}) =>{
  const [Meeting, setMeeting] = useState([]);
  const renderItem = ({ item }) => (
    <ItemContainer onPress = {() => navigation.navigate('MyPage_Act_Detail',{
      meetingId : item.meetingId,
    }
    )}>
      <ItemTextContainer>
          <ItemTitle>{item.meetingName}</ItemTitle>
          <ItemType>{item.meetingType}</ItemType>
          <Text>시작시간 : </Text>
          <ItemTime>{item.startTime}</ItemTime>
          <ItemIcon />
      </ItemTextContainer>
    </ItemContainer>
  );

  const getMeeting = async () => {
      const res = await request({
        method: 'GET',
        url: `/user/meeting/history`,
      });
    
      // res.data =>
    //   "data": [
    //     {
    //         "id" : 1 // 백엔드에 추가요청 해야함
    //         "name": "모임1",
    //         "type": "정기모임",
    //         "startTime": "2022-04-09 21:00"
    //     },
    //     {
    //         "id" : 2 // 백엔드에 추가요청 해야함
    //         "name": "모임2",
    //         "type": "정기모임",
    //         "startTime": "2022-04-09 21:00"
    //     }
    // ]
      if(res.result === "SUCCESS"){
        setMeeting(res.data);
      }
  };

  useEffect(() => {
     // getMeeting(); // api data 수정 된 후 사용
     setMeeting(TESTDATA)
  }, []);

    return (
    <Container>
        <View style={styles.groupList}>
        {Meeting.length ? (
          // 배열이 하나라도 차있다면
          <FlatList
            data={Meeting}
            keyExtractor={item => item.meetingName}
            renderItem={renderItem}
          />
        ) : (
          // 배열이 비어있다면
          <Text style={styles.text}>생성된 모임이 없습니다!</Text>
        )}
      </View>
    </Container>
    
    )
}

const styles = StyleSheet.create({
  groupList: {
    marginTop: 80,
    marginBottom: 10,
    flex: 1,
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  },
})
export default MyPage_Act;