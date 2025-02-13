import axios from "axios";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
// import {jwtDecode, JwtPayload} from "jwt-decode";

const baseUrl = 'https://dummyjson.com';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use(async (request) => {
    if (request.method?.toUpperCase() === "GET") {
        const accessToken = await getCookie('accesstoken', {cookies});
        console.log(accessToken);
        if (accessToken) {
            request.headers.authorization = 'Bearer ' + accessToken;
        }
    }
    return request;
});

// const isTokenExpired = (token: string): boolean => {
//     const decodedData: JwtPayload = jwtDecode(token);
//     if (!decodedData.exp) return true;
//     const currentTime: number = Math.floor(Date.now() / 1000);
//     return decodedData.exp < currentTime;
// };

// axiosInstance.interceptors.request.use(async (request) => {
//     if (request.method?.toUpperCase() === "GET") {
//         const token = retrieveLocalStorage<IUserWithTokens>('user')?.accessToken;
//         if (token) {
//             if (isTokenExpired(token)) {
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
//             request.headers.authorization = 'Bearer ' + token;
//         }
//     }
//     return request;
// });

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );



