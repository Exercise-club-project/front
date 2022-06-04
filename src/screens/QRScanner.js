import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import request from '../funtion/request';
import QRrequest from '../funtion/QRrequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';
const QRScanner = ({route,navigation}) => {
  const meetingId = route.params.id;
  const [userId, setuserId] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const storeQRtoken = async (value) => {
    try {
      await AsyncStorage.setItem("qrToken", value)
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const joinMeeting = async() =>{
    console.log("Qr찍는 사람이 고른 모임id : ", meetingId);
    console.log("Qr찍은사람의 userid : ",userId);
    
    try{
      const response = await axios.post(
        `http://23.23.240.178:8080/${userId}/meeting/join/${meetingId}`,
      );
      console.log(response.data.result);
      console.log(response.data.data);
      if(response.data.result === "SUCCESS"){
        // console.log('result : ', response.data.result);
        // console.log('data : ',response.data.data);
        Alert.alert('참석완료! ', response.result);
      }
    }
    catch(e){
      console.log(e);
    }
  };
  // const joinMeeting = async () =>{
  //     console.log("Qr찍는 사람이 고른 모임id : ", meetingId);
  //     console.log("Qr찍은사람의 userid : ",userId);
  //   const response = await request({
  //     method: 'POST',
  //     url: `/${userId}/meeting/join/${meetingId}`,
  //   });
  //   // 이미 meeting에 참석한 userId면 안되도록
  //   // 지금 참석은 되는데 Request failed with status code 500
  //   Alert.alert('참석완료! ', response.result);
  //   navigation.navigate('Home');
  //   // console.log(response.result);
  //   // console.log(response.data);
  // }
  const handleBarCodeScanned = async({ data }) => {
    setScanned(true);
    storeQRtoken(data);
    const res = await QRrequest({
      method: 'GET',
      url: `/qr/get`,
    });

    if(res.result === "SUCCESS"){
      await setuserId(res.data);
      joinMeeting();
      // if(response.result === "SUCCESS"){
      //   setMeeting(response.data);
      // }
      // console.log("res : ",res);
      // console.log("res.data : ",res.data);
      // console.log("value : ",value);
    }
    else{
      alert(res.data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});

export default QRScanner;