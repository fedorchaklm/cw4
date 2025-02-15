import IUser from "@/models/IUser";

export interface IUsersResponseModel {
    limit: number;
    skip: number;
    total: number;
    users: Array<IUser>;
}