import axios from "axios";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {jwtDecode, JwtPayload} from "jwt-decode";

const baseUrl = 'https://dummyjson.com';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use(async (request) => {
    if (request.method?.toUpperCase() === "GET") {
        const accessToken = await getCookie('accessToken', {cookies});
        console.log({accessToken});

        if (accessToken) {
            request.headers.Authorization = 'Bearer ' + accessToken;
            request.withCredentials = true;
        }
    }
    return request;
});

export const isTokenExpired = (token: string): boolean => {
    const decodedData: JwtPayload = jwtDecode(token);
    if (!decodedData.exp) return true;
    const currentTime: number = Math.floor(Date.now() / 1000);
    return decodedData.exp < currentTime;
};



