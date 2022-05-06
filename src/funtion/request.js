import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'http://23.23.240.178:8080';
const request = async config => {
  const token = AsyncStorage.getItem('accessToken');

  const requestConfiguration = {
    ...config,
    baseURL,
    headers: { 'Access_Token': token },
  };
  try{
    const { data } = await axios(requestConfiguration);

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

export default request;