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
  border-color : #a6a6a6;
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex-direction: column;
  border-color : #a6a6a6;
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
const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
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
    meetingName: "모임1",
    meetingType: "정기모임",
    startDate: "2022-04-09 15:30",
    endDate: "2022-04-09 17:30",
    description: "for tesasdasdasdt"
  },
  {
    meetingName: "모임2",
    meetingType: "정기모임",
    startDate: "2022-04-09 15:30",
    endDate: "2022-04-09 17:30",
    description: "for test"
  },
  {
    meetingName: "모임3",
    meetingType: "정기모임",
    startDate: "2022-04-09 15:30",
    endDate: "2022-04-09 17:30",
    description: "for test"
  },
];

const Home = ({navigation}) =>{
  const [Meeting, setMeeting] = useState([]);
  const renderItem = ({ item }) => (
    <ItemContainer onPress = {() => navigation.navigate('MeetingDetail')}>
      <ItemTextContainer>
          <ItemTitle>{item.meetingName}</ItemTitle>
          <ItemType>{item.meetingType}</ItemType>
          <ItemDesc>{item.description}</ItemDesc>
          <ItemTime>{item.startDate}</ItemTime>
          <Text>~</Text>
          <ItemTime>{item.endDate}</ItemTime>
          <ItemIcon />
      </ItemTextContainer>
    </ItemContainer>
  );

  const getMeeting = async () => {
    const MeetingId = await AsyncStorage.getItem('MeetingId');
    const res = await makeRequest({
      method: 'GET',
      url: `/user/meetingInfo/get/${MeetingId}`,
    });
  //   "data": {
  //     "meetingName": "모임1",
  //     "meetingType": "정기모임",
  //     "startDate": "2022-04-09 15:30",
  //     "endDate": "2022-04-09 17:30",
  //     "description": "for test"
  // }
    console.log('res : ', res.data);
    setMeeting(res.data);
  };
  
  useEffect(() => {
    setMeeting(TESTDATA)
    // getMeeting(); // 나중에 구현될 것임(모임id받아올 수 있을 때)
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
      <Button title = "모임 만들기" onPress = {() => navigation.navigate('CreateMeeting')}/>
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

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  text: {
    fontSize: 25,
  },
})
export default Home;