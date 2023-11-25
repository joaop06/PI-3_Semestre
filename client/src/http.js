import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:7000',
  baseURL: 'https://fjlnsq-7000.csb.app',
});

export default api;