import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "cd_admin_token";

export const authApi = axios.create({ baseURL: API });

authApi.interceptors.request.use((config) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function login(email, password) {
  const { data } = await axios.post(`${API}/auth/login`, { email, password });
  saveToken(data.access_token);
  return data;
}

export async function fetchMe() {
  const { data } = await authApi.get(`/auth/me`);
  return data;
}

export async function fetchEnquiries() {
  const { data } = await authApi.get(`/enquiries`);
  return data;
}
