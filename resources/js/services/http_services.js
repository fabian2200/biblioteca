import axios from 'axios';

export function http() {
    return axios.create({
        baseURL: 'http://192.168.1.20:444/'
        //baseURL: 'https://192.168.0.199:444/',
        //baseURL: 'http://192.168.1.66:8000/'
    });
}