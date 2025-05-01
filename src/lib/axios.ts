import axios from "axios";

// Базовый URL для API
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:8080/api" 
  : "/api";

// Создание экземпляра axios с настройками
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Для работы с куками
  headers: {
    "Content-Type": "application/json"
  }
});

// Создание типа для ошибок axios
export type AxiosErrorResponse = {
  message: string;
  [key: string]: any;
};