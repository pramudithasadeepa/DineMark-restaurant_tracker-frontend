import axios, { AxiosInstance } from 'axios';
import { Restaurant, RestaurantInput, DashboardStats, AuthResponse, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data: { email: string; password: string; name: string }) =>
  api.post<AuthResponse>('/auth/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post<AuthResponse>('/auth/login', data);

// Restaurant APIs
export const getRestaurants = () =>
  api.get<Restaurant[]>('/restaurants');

export const getRestaurant = (id: number) =>
  api.get<Restaurant>(`/restaurants/${id}`);

export const addRestaurant = (data: RestaurantInput) =>
  api.post<Restaurant>('/restaurants', data);

export const updateRestaurant = (id: number, data: Partial<RestaurantInput>) =>
  api.put(`/restaurants/${id}`, data);

export const deleteRestaurant = (id: number) =>
  api.delete(`/restaurants/${id}`);

export const getDashboardStats = () =>
  api.get<DashboardStats>('/restaurants/stats');

export default api;