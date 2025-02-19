import {IUserWithTokens} from "@/models/IUserWithTokens";
import {LoginDataType} from "@/models/LoginDataType";
import {axiosInstance} from "@/services/api.service";
import {ITokensPair} from "@/models/ITokensPair";
import {getCookie, setCookie} from "cookies-next";
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
        const refreshToken = await getCookie('refreshToken', {cookies});
        const res = await axiosInstance.post<ITokensPair>('/auth/refresh', {refreshToken});
        if (res.status !== 200) {
            throw new Error('error');
        }
        await setCookie('accessToken', res.data.accessToken, {cookies});
        await setCookie('refreshToken', res.data.refreshToken, {cookies});
        return res.data;
    }
}
