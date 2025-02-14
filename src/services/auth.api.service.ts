import {IUserWithTokens} from "@/models/IUserWithTokens";
import {LoginDataType} from "@/models/LoginDataType";
import {axiosInstance} from "@/services/api.service";
import {ITokensPair} from "@/models/ITokensPair";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {cookies} from "next/headers";
// import {Cookie} from "next/dist/compiled/@next/font/dist/google";

export const authService = {
    login: async (loginData: LoginDataType): Promise<IUserWithTokens> => {
        // const response = await fetch('https://dummyjson.com/auth/login', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(loginData),
        // // credentials: 'include' // Include cookies (e.g., accessToken) in the request
        // })
        // const userWithToken = await response.json();
        // if (userWithToken.message) {
        //     throw new Error(userWithToken.message);
        // }
        // return userWithToken;
        // const {data: userWithToken} = await axiosInstance.post<IUserWithTokens>('auth/login', loginData);
        // try {
        const res = await axiosInstance.post<IUserWithTokens>('auth/login', loginData);
        if (res.status !== 200) {
            throw new Error('error');
        }
        return res.data;
    },
    refreshToken: async (): Promise<ITokensPair> => {
        const refreshToken = await getCookie('refreshtoken', {cookies});
        const {data} = await axiosInstance.post<ITokensPair>('/auth/refresh', {
            refreshToken
        });
        await deleteCookie('accesstoken', {cookies});
        await deleteCookie('refreshtoken', {cookies});
        await setCookie('accesstoken', data.accessToken, {cookies});
        await setCookie('refreshtoken', data.refreshToken, {cookies});
        return data;
        // if (userWithTokens) {
        //     const {
        //         data: {
        //             refreshToken,
        //             accessToken
        //         }
        //     } = await axiosInstance.post<ITokensPair>('/auth/refresh', {
        //         refreshToken
        //     });
        //     userWithTokens.accessToken = accessToken;
        //     userWithTokens.refreshToken = refreshToken;
        //     saveToLocalStorage('user', userWithTokens);
        //     return userWithTokens;
        // }
    }
}
