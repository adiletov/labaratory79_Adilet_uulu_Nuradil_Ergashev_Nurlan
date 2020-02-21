import axios from 'axios';
import {apiURL} from "./apiUrl";

const axiosApi = axios.create({
    baseURL: apiURL
});

export default axiosApi;