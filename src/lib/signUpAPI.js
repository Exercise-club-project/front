import { API } from './API';

const signUpURL = '/auth/register';

export const request = async data =>{
    const postingData = {
        email: data.email,
        name: data.name,
        birthday: data.birthday,
        password: data.password,
        sex: data.sex,
        phoneNumber: data.phonenumber,
      };
      const response = await API.post(signUpURL, postingData);
      return response;
};

export const requestSignUpF = async data => {
    const body = new FormData();
  
    body.append('email', data.email);
    body.append('name', data.name);
    body.append('birthday', data.birthday);
    body.append('password', data.password);
    body.append('sex', data.sex);
    body.append('phoneNumber', data.phonenumber);
    
  
    const response = await API.post(signUpURL, body, {
      headers: { 'Content-type': 'application/json' },
    });
    return response;
  };