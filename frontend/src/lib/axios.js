import axios from 'axios'

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api" 
  : import.meta.env.VITE_API_URL || "/api"

console.log('🔧 Axios Config:', {
    MODE: import.meta.env.MODE,
    BASE_URL: BASE_URL,
    VITE_API_URL: import.meta.env.VITE_API_URL
})

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})