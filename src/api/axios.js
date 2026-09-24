import axios from 'axios'

const API = axios.create({
  baseURL: "https://real-estate-backend-vh62.onrender.com", // apna confirm URL yahan
})

export default API