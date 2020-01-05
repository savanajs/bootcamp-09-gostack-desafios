import axios from 'axios';
import ip from '../config/IpLocal';

const api = axios.create({
    baseURL: `${ip.host}:3333`,
});

export default api;
