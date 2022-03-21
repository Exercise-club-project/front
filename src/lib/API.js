import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://23.23.240.178:8080',
});