import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
    timeout: 10000
});