'use server';

import {authService} from "@/services/auth.api.service";
import {cookies} from "next/headers";
import {setCookie} from "cookies-next";
import {IUserWithTokens} from "@/models/IUserWithTokens";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect-error";

// export const loginUser = async (formData: FormData) => {
//     const username = formData.get('username') as string;
//     const password = formData.get('password') as string;
//     const user = {username, password};
//     try {
//         const userWithTokens: IUserWithTokens = await authService.login(user);
//         // await setCookie('accesstoken', JSON.stringify(userWithTokens.accessToken), {cookies});
//         // await setCookie('refreshtoken', JSON.stringify(userWithTokens.refreshToken), {cookies});
//         console.log(userWithTokens);
//         redirect('/');
//     } catch (e) {
//         if (isRedirectError(e)) {
//             throw e;
//         }
//         console.info(e);
//     }
// };


type StateType = {
    formData?: IUserWithTokens;
    errors?: string;
};

export const loginUser = async (prevState: StateType, formData: FormData): Promise<StateType> => {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const user = {username, password};

    try {
        const userWithTokens: IUserWithTokens = await authService.login(user);
        await setCookie('accesstoken', JSON.stringify(userWithTokens.accessToken), {cookies});
        await setCookie('refreshtoken', JSON.stringify(userWithTokens.refreshToken), {cookies});
        prevState.formData = userWithTokens;
        redirect('/');
    } catch (e) {
        if (isRedirectError(e)) {
            throw e;
        }
        if (e instanceof Error) {
            console.log('>', e.message);
            return {
                errors: e.message,
            }
        } else {
            return {
                errors: 'something went wrong',
            }
        }
    }
};