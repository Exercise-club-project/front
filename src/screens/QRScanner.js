import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRrequest from '../funtion/QRrequest';
import request from '../funtion/request';
import AsyncStorage from '@react-native-async-storage/async-storage';


const QRScanner = ({route}) => {
  const meetingId = route.params.id;
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

  const handleBarCodeScanned = async({ type, token }) => {
    setScanned(true);
    alert(`바코드의 형태 : ${type} 데이터 값 :  ${token}`);

    storeQRtoken(token);
    const res = await QRrequest({
      method: 'POST',
      url: `/qr/create`,
    });

    if(res.result === "SUCCESS"){
      const response = await request({
        method: 'POST',
        url: `/${res.data}/meeting/get/${meetingId}`,
      });
  
      if(response.result === "SUCCESS"){
        setMeeting(response.data);
      }
      res.data;
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