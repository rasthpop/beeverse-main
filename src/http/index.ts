import axios from 'axios'
import { config } from 'process'

export const API_URL = ' https://ab49-2a02-4780-c-dee4-00-1.ngrok-free.app'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api