import axios from "axios";
// import {getCookie} from "cookies-next";
// import {cookies} from "next/headers";
import {jwtDecode, JwtPayload} from "jwt-decode";
// import {authService} from "@/services/auth.api.service";
// import {authService} from "@/services/auth.api.service";

const baseUrl = 'https://dummyjson.com';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    // withCredentials: true,
    headers: {"Content-Type": "application/json"},
});

// axiosInstance.interceptors.request.use(async (request) => {
//     if (request.method?.toUpperCase() === "GET") {
//         const accessToken = await getCookie('accesstoken', {cookies});
//
//         if (accessToken) {
//             request.headers.Authorization = 'Bearer ' + accessToken;
//             request.withCredentials = true;
//         }
//     }
//     return request;
// });

export const isTokenExpired = (token: string): boolean => {
    const decodedData: JwtPayload = jwtDecode(token);
    if (!decodedData.exp) return true;
    const currentTime: number = Math.floor(Date.now() / 1000);
    return decodedData.exp < currentTime;
};

// axiosInstance.interceptors.request.use(async (request) => {
//     if (request.method?.toUpperCase() === "GET") {
//         const accessToken = await getCookie('accesstoken', {cookies});
//         if (accessToken) {
//             if (isTokenExpired(accessToken)) {
//                 try {
//                     const newToken = await authService.refreshToken();
//                     if (newToken) {
//                         request.headers.Authorization = 'Bearer ' + newToken;
//                     }
//                 } catch (e) {
//                     console.info(e);
//                 }
//             }
//         } else {
//             request.headers.authorization = 'Bearer ' + accessToken;
//         }
//     }
//     return request;
// });


// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         if (error.response.message === 'Token Expired!') {
//             await authService.refreshToken();
//         }
//         return Promise.reject(error);
//     }
// );



