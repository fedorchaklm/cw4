import {IUserWithTokens} from "@/models/IUserWithTokens";
import {LoginDataType} from "@/models/LoginDataType";
import {axiosInstance} from "@/services/api.service";
import {ITokensPair} from "@/models/ITokensPair";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {cookies} from "next/headers";
import IUser from "@/models/IUser";

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
        const res = await axiosInstance.post<ITokensPair>('/auth/refresh', {refreshToken});
        if (res.status !== 200) {
            throw new Error('error');
        }
        await deleteCookie('accesstoken', {cookies});
        await deleteCookie('refreshtoken', {cookies});
        console.log(res.data.accessToken, res.data.refreshToken)
        await setCookie('accesstoken', res.data.accessToken, {cookies});
        await setCookie('refreshtoken', res.data.refreshToken, {cookies});
        return res.data;
    },
    getCurrentAuthUser: async (): Promise<IUser> => {
        const res = await axiosInstance.get<IUser>(`auth/me`);

        if (res.status !== 200) {
            throw new Error('error');
        }
        return res.data;
    }
}
