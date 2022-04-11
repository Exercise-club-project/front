import React, {useContext}from 'react';
import styled from 'styled-components/native';
import QRCode from "react-native-qrcode-svg";
import { StyleSheet, Text, View } from "react-native";
import {Button} from '../components';
import { ThemeContext } from 'styled-components/native';
//"accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0ODExNDQ5NSwiZXhwIjoxNjQ4MTE2Mjk1fQ.8UVUiogz6SeJKGaxX_BfcA5FtTWxofeQuFi1QSHfs4M"

// QR코드에 들어갈 정보 정립 필요
// 15초마다 남은 시간 갱신 + 정보 업데이트 함수 구현 필요
// error message 추가 필요 (?)

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const QR = ({navigation}) =>{

  const theme = useContext(ThemeContext);

  return (
    <View style ={styles.qrcontainer}>
      <QRCode
      //value = qr값 임시로 access 토큰 값 입력해두었음
      value ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0ODExNDQ5NSwiZXhwIjoxNjQ4MTE2Mjk1fQ.8UVUiogz6SeJKGaxX_BfcA5FtTWxofeQuFi1QSHfs4M"
      color="black"
      size={200} //qr코드 크기
      >
      </QRCode>
      <Text style={styles.maintext}>참여 QR코드</Text>
      <Text>동아리 운영진에게</Text>
      <Text>위의 QR코드를 보여주세요.</Text>

      <View style={{flexDirection: 'row'}// 남은시간, 초 구분을 위해 가로정렬
      }>
      <Text style={styles.subtext}>남은 시간 :</Text>
      <Text style={styles.resttime}>15초</Text>
      </View>

      <Button 
      title="뒤로 가기"  //뒤로가기 버튼 'Home'화면으로 연결 완료
      onPress={() => navigation.navigate('Home')}
      />
    </View>
    );
  };

const styles = StyleSheet.create({
  qrcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  maintext:{
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext:{
    marginTop: 10,
    fontSize: 16,
  },
  resttime:{
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'red',
  },
});

export default QR;