import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRrequest from '../funtion/QRrequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

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