import {IUserWithTokens} from "@/models/IUserWithTokens";
import {LoginDataType} from "@/models/LoginDataType";
import {axiosInstance} from "@/services/api.service";
import {ITokensPair} from "@/models/ITokensPair";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {cookies} from "next/headers";

export const authService = {
    login: async (loginData: LoginDataType): Promise<IUserWithTokens> => {
        const res = await axiosInstance.post<IUserWithTokens>('auth/login', loginData);
        if (res.status !== 200) {
            throw new Error('error');
        }
        return res.data;
    },
    refreshToken: async (): Promise<ITokensPair> => {
        const refreshToken = await getCookie('refreshtoken', {cookies});
        const {data} = await axiosInstance.post<ITokensPair>('/auth/refresh', {refreshToken});
        await deleteCookie('accesstoken', {cookies});
        await deleteCookie('refreshtoken', {cookies});
        await setCookie('accesstoken', data.accessToken, {cookies});
        await setCookie('refreshtoken', data.refreshToken, {cookies});
        return data;
    }
}
