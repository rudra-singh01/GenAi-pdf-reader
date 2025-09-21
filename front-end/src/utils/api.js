import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 120000, // 2 minutes timeout for file uploads
})

// Request interceptor to add auth headers if needed
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    } else if (error.response?.status === 500) {
      console.error('Server error')
    }
    return Promise.reject(error)
  }
)

// API methods
export const uploadDocument = async (file, prompt) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('prompt', prompt)

  return api.post('/api/ai/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export default api
