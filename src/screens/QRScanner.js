import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRrequest from '../funtion/QRrequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';
import {Button} from '../components';

const QRScanner = ({route,navigation}) => {
  const meetingId = route.params.id;
  const [userId, setuserId] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  var Id = 0;
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
    
    try{
      const response = await axios.post(
        `http://23.23.240.178:8080/${Id}/meeting/join/${meetingId}`,
      );
      console.log(response.data.data);
      if(response.data.result === "SUCCESS"){
        // console.log('result : ', response.data.result);
        // console.log('data : ',response.data.data);
        Alert.alert(response.data.data);
      }
      else{
        Alert.alert(response.data.data);
      }
    }
    catch(e){
      console.log(e);// 여기서 error 500
    }
  };

  const handleBarCodeScanned = async({ data }) => {
    setScanned(true);
    storeQRtoken(data);
    //console.log("스캔시 qrtoken : ", data);
    const res = await QRrequest({
      method: 'GET',
      url: `/qr/get`,
    });
    try{
    if(res.result === "SUCCESS"){
      Id = res.data;
      console.log("Id: ", Id);
      // const userid = res.data;
      // console.log(userid);
      // setuserId(userid);
      // console.log(userId);
      joinMeeting();
    }
  }catch(e){
    console.log(e);
  }
  };

  if (hasPermission === null) {
    return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center',}}>
      <View>
        <Text style={{fontSize:30, justifyContent:'center'}}>카메라 권한을</Text>
        <Text style={{fontSize:30, justifyContent:'center'}}>요청중입니다.</Text>
      </View>
    </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{flex:1, alignContent: 'center', justifyContent: 'center'}}>
        <View>
          <Text style={{fontSize:30, justifyContent:'center'}}>카메라 접근 권한이</Text>
          <Text style={{fontSize:30, justifyContent:'center'}}>없습니다.</Text>
        </View>
      </View>
      );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{flex:2}}></View>
      {scanned && <Button title={'다시 스캔하기'} onPress={() => setScanned(false)} />}
      <View style={{flex:1}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 20,
    },
});

export default QRScanner;