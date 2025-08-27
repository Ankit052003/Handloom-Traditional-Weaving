import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-domain.com/api' 
    : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getCurrentUser: () => API.get('/auth/user'),
  
  // Admin-specific auth endpoints
  adminRegister: (userData) => API.post('/auth/admin/register', userData),
  adminLogin: (credentials) => API.post('/auth/admin/login', credentials),
};

// Contact API calls
export const contactAPI = {
  submit: (contactData) => API.post('/contact', contactData),
  getAll: () => API.get('/contact'), // Admin only
};

// Articles API calls
export const articlesAPI = {
  getAll: (params = {}) => API.get('/articles', { params }),
  getAllAdmin: (params = {}) => API.get('/articles/admin/all', { params }),
  getById: (id) => API.get(`/articles/${id}`),
  create: (articleData) => API.post('/articles', articleData),
  update: (id, articleData) => API.put(`/articles/${id}`, articleData),
  delete: (id) => API.delete(`/articles/${id}`),
  getStats: () => API.get('/articles/stats/dashboard'),
};

export default API;
