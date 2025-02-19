import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import IUser from "@/models/IUser";

export const getMaxPages = (total: number, limit: number): number => {
    return Math.ceil(total / limit);
};

export const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
};

export const getCurrentUser = async (): Promise<IUser | null> => {
    const res = await getCookie('currentUser', {cookies});
    let currentUser;
    if (res) {
        currentUser = JSON.parse(res);
        return currentUser;
    }
    return null;
};