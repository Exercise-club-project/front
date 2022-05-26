import React, {useEffect, useState, useContext}from 'react';
import QRCode from "react-native-qrcode-svg";
import { StyleSheet, Text, View } from "react-native";
import {Button} from '../components';
import request from '../funtion/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
//"accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0ODExNDQ5NSwiZXhwIjoxNjQ4MTE2Mjk1fQ.8UVUiogz6SeJKGaxX_BfcA5FtTWxofeQuFi1QSHfs4M"

// QR코드에 들어갈 정보 정립 필요
// 15초마다 남은 시간 갱신 + 정보 업데이트 함수 구현 필요
// error message 추가 필요 (?)

const QR = ({navigation}) =>{

  const [qr,getqr] = useState("nothing");
  const [time,settime] = useState(0);
  const getQR = async () => {
    try{
      const res = await request({
        method: 'POST',
        url: `/qr/create`,
      });

      if(res.result === "SUCCESS"){
        getqr(res.data.qrcodeToken);
        settime(res.data.expiredTime / 1000);
        //console.log("expiredTime : ", qrtime);
        // console.log("res.data : ",res.data);
        // console.log("value : ",value);
        console.log("qr : ",qr);
        console.log("RENEWAL 15 seconds");
      }
    }catch(e){
      console.log(e);
    }

  };
  

  useEffect(() => { // 첫 qr화면 클릭시 실행 => getQR로 qr값이랑 expiredtime값 받음
    getQR(); // qr에 새 token값을 넣어주고 time을 초기화함
 }, []); // qr에 값이 들어가면 화면이 바뀜

 
  useEffect(()=> { // getQR을 통해 expiredtime값 받아서 time에 들어오면 실행
    const countdown = setInterval(()=>{
      if(time > 0){
        settime(time - 1);
      }
      if(time === 0){
        getQR();
        clearInterval(countdown);
      }
    }, 1000);
    return ()=> clearImmediate(countdown);
  }, [time]); // time값이 변경 될 대마다 useEffect가 실행
  // 15초마다 잘되는데?

  return (

    <View style={{flex:1, paddingHorizontal:30, backgroundColor:'white'}}>
    <View style ={styles.qrcontainer}>
      <QRCode
      //value = qr값 임시로 access 토큰 값 입력해두었음
      value = {qr}
      
      color="black"
      
      size={200} //qr코드 크기
      >
      </QRCode>
      <Text style={styles.maintext}>참여 QR코드</Text>
      <Text style={{fontSize: 16, marginBottom:2,}}>동아리 운영진에게</Text>
      <Text style={{fontSize: 16}}>위의 QR코드를 보여주세요.</Text>

      <View style={{flexDirection: 'row'}// 남은시간, 초 구분을 위해 가로정렬
      }>
      <Text style={styles.subtext}>남은 시간 :</Text>
      <Text style={styles.resttime}>{time}</Text>
      </View>

      
      <Button 
      title="뒤로 가기"  //뒤로가기 버튼 'Home'화면으로 연결 완료
      onPress={() => navigation.navigate('Home')}
      />
      </View>
    </View>
    );
  };

const styles = StyleSheet.create({
  qrcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },
  maintext:{
    marginTop: 20,
    marginBottom: 10,
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