// src/lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', // proxy-friendly
  timeout: 20000,
})

api.interceptors.request.use((config) => {
  // Optional: pass language header (though your API expects it in the body)
  const lng = localStorage.getItem('i18nextLng') || 'en'
  config.headers['Accept-Language'] = lng
  return config
})
