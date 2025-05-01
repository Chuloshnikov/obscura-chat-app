import axios from "axios";

const BASE_URL = import.meta.env.BACKEND_URL + "/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // put cockie in every single request
});