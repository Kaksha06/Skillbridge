// import axios from 'axios';

// // Create an axios instance with the base URL from environment variables
// const api = axios.create({
//   // @ts-ignore
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include auth token if available
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Example API functions
// export const authAPI = {
//   login: (/** @type {any} */ credentials) => api.post('/auth/login', credentials),
//   register: (/** @type {any} */ userData) => api.post('/auth/register', userData),
// };

// export const userAPI = {
//   getProfile: () => api.get('/users/me'),
//   updateProfile: (/** @type {any} */ userData) => api.put('/users/me', userData),
// };

// // Health check endpoint
// export const checkBackendConnection = async () => {
//   try {
//     // Using the profile endpoint which is a GET request that requires authentication
//     const response = await api.get('/profile');
//     return {
//       connected: true,
//       status: response.status,
//       data: 'Successfully connected to backend!'
//     };
//   } catch (error) {
//     // Even if we get a 401 (Unauthorized), it means the backend is reachable
//     if (error.response?.status === 401) {
//       return {
//         connected: true,
//         status: 200,
//         data: 'Backend is reachable but requires authentication'
//       };
//     }
//     return {
//       connected: false,
//       error: error.message,
//       status: error.response?.status,
//       url: error.config?.url
//     };
//   }
// };

// // Add more API endpoints as needed

// export default api;
import axios from 'axios';

const api = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1', // set in frontend/.env
  headers: { 'Content-Type': 'application/json' },
});

// Add Bearer Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -------------------- AUTH API --------------------
export const authAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData),
};

// -------------------- USER API --------------------
export const userAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/me', userData),
};

// -------------------- HEALTH CHECK --------------------
export const checkBackendConnection = async () => {
  try {
    const response = await api.get('/users/me');
    return {
      connected: true,
      status: response.status,
      data: 'Connected!'
    };
  } catch (error) {
    if (error.response?.status === 401)
      return { connected: true, status: 200, data: 'Backend reachable' };

    return { connected: false, error: error.message };
  }
};

export default api;
