import {limitOfUsersByPage} from "@/constants/constants";
import IUser from "@/models/IUser";
import {axiosInstance} from "@/services/api.service";
import {IUsersResponseModel} from "@/models/IUsersResponseModel";
// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { deleteCookie, getCookie, setCookie, hasCookie, getCookies } from 'cookies-next/server';

export const userService = {
    getUsersByPage: async (page: number, searchParam: string): Promise<IUsersResponseModel | undefined> => {
        const limit = limitOfUsersByPage;
        const skip = limit * page - limit;
        try {
            const {data} = await axiosInstance.get<IUsersResponseModel>(`auth/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`);

            return data;
            /* providing accessToken in bearer */
            // const accesstoken = await getCookie('accesstoken', { cookies });
            // console.log('>', { accesstoken });
            // const res = await fetch(`https://dummyjson.com/auth/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`, {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': `Bearer ${accesstoken}`, // Pass JWT via Authorization header
            //     },
            //     credentials: 'include' // Include cookies (e.g., accessToken) in the request
            // });
            // return res.json();
        } catch (error) {
            console.log('> error', error);
        }
        // const res = await fetch(`https://dummyjson.com/auth/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`);
        // return await res.json();
    },
    getUserById: async (id: string): Promise<IUser> => {
        const {data: user} = await axiosInstance.get<IUser>(`auth/users/${id}`);
        return user;
    },
    getCurrentAuthUser: async (): Promise<IUser | null> => {
        try {
            const {data: currentUser} = await axiosInstance.get<IUser>(`auth/me`);
            return currentUser;
        } catch (error) {
            console.log('> error', error);
            return null;
        }
    }
};


