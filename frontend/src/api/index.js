import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexara_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nexara_token');
      localStorage.removeItem('nexara_user');
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/me', data),
};

export const consultationAPI = {
  book: (data) => api.post('/consultations', data),
  getMy: () => api.get('/consultations/my'),
  getAll: (params) => api.get('/consultations/all', { params }),
  update: (id, data) => api.put(`/consultations/${id}`, data),
};

export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getOne: (slug) => api.get(`/blogs/${slug}`),
  seed: () => api.get('/blogs/seed'),
};

export const esgAPI = {
  calculate: (data) => api.post('/esg/calculate', data),
  getMy: () => api.get('/esg/my'),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getDashboard: () => api.get('/contact/dashboard'),
};

export default api;
