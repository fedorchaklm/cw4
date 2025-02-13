import {limitOfUsersByPage} from "@/constants/constants";
import IUser from "@/models/IUser";
// import {axiosInstance} from "@/services/api.service";
import {IUsersResponseModel} from "@/models/IUsersResponseModel";

export const userService = {
    getUsersByPage: async (page: number, searchParam: string): Promise<IUsersResponseModel> => {
        const limit = limitOfUsersByPage;
        const skip = limit * page - limit;
        // const {data} = await axiosInstance.get<IUsersResponseModel>(`auth/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`);
        // return data;
        const res = await fetch(`https://dummyjson.com/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`);
        return await res.json();
    },
    getUserById: async (id: string): Promise<IUser> => {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        return res.json();
    }
};


