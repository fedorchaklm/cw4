import {limitOfUsersByPage} from "@/constants/constants";
import IUser from "@/models/IUser";
import {axiosInstance} from "@/services/api.service";
import {IUsersResponseModel} from "@/models/IUsersResponseModel";

export const userService = {
    getUsersByPage: async (page: number, searchParam: string): Promise<IUsersResponseModel> => {
        const limit = limitOfUsersByPage;
        const skip: number = limit * page - limit;
        const {data} = await axiosInstance.get<IUsersResponseModel>(`auth/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`);
        return data;
    },
    getUserById: async (id: string): Promise<IUser> => {
        const {data: user} = await axiosInstance.get<IUser>(`auth/users/${id}`);
        return user;
    }
};


