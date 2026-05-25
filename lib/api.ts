import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

import { getFirebaseToken } from './firebaseClient';

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getFirebaseToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching firebase token', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getRestaurants = () => api.get('/restaurants');
export const getRestaurant = (id: number) => api.get(`/restaurants/${id}`);
export const addRestaurant = (data: any) => api.post('/restaurants', data);
export const updateRestaurant = (id: number, data: any) => api.put(`/restaurants/${id}`, data);
export const deleteRestaurant = (id: number) => api.delete(`/restaurants/${id}`);
export const getDashboardStats = () => api.get('/restaurants/stats');

export default api;
