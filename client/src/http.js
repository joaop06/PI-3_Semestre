import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.152.49:7000',
});

export default api;