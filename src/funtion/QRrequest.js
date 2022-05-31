import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'http://23.23.240.178:8080';
const QRrequest = async config => {
  var token = await AsyncStorage.getItem('qrToken');
  console.log('qrToken : ', token);
  const requestConfiguration = {
    ...config,
    baseURL,
    headers: { 'Qrcode_Token': token },
  };
  try{
    const { data } = await axios(requestConfiguration);
    //console.log('request data : ', data);
    if (data) {
      return data;
    } else {
      return null;
    }
  // return data ? data : null
  }
  catch(e){
   console.log(e);
  }
  
};

export default QRrequest;