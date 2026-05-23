import axios, { AxiosInstance } from 'axios';
import { Restaurant, RestaurantInput, DashboardStats } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

async function getAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const res = await fetch('/api/auth/token', { credentials: 'include' });
  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { accessToken?: string };
  return data.accessToken ?? null;
}

api.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export type RegisterResponse = {
  message: string;
  user: { id: number; email: string; name: string };
};

export const register = (data: { email: string; password: string; name: string }) =>
  api.post<RegisterResponse>('/auth/register', data);

export const getRestaurants = () => api.get<Restaurant[]>('/restaurants');

export const getRestaurant = (id: number) => api.get<Restaurant>(`/restaurants/${id}`);

export const addRestaurant = (data: RestaurantInput) =>
  api.post<Restaurant>('/restaurants', data);

export const updateRestaurant = (id: number, data: Partial<RestaurantInput>) =>
  api.put(`/restaurants/${id}`, data);

export const deleteRestaurant = (id: number) => api.delete(`/restaurants/${id}`);

export const getDashboardStats = () =>
  api.get<DashboardStats>('/restaurants/stats');

export default api;
