import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "sendemail";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the Bearer token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getEmails = async () => {
  const response = await axiosInstance.get(`${API_URL}/get`);
  return response.data?.data ?? [];
};

export const createEmail = async (data: {
  email: string;
  description: string;
}) => {
  const response = await axiosInstance.post(`${API_URL}/create`, data);
  return response.data;
};

export const updateEmail = async (
  id: string,
  data: { id: string; email: string; description: string }
) => {
  const response = await axiosInstance.put(`${API_URL}/update/${id}`, data);
  return response.data;
};

export const deleteEmail = async (id: string) => {
  const response = await axiosInstance.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
