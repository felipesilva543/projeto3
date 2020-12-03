import axios from 'axios';

const api = axios.create({
    baseURL: 'http://desafio-api.trixlog.com/'
   //baseURL: 'https://jsonplaceholder.typicode.com/'
});

export default api;