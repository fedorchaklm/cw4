'use server';

import {authService} from "@/services/auth.api.service";
import {cookies} from "next/headers";
import {setCookie} from "cookies-next";
import {IUserWithTokens} from "@/models/IUserWithTokens";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect-error";

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
        const {accessToken, refreshToken, ...rest} = userWithTokens;
        await setCookie('accessToken', accessToken, {cookies});
        await setCookie('refreshToken', refreshToken, {cookies});
        await setCookie('currentUser', rest, {cookies});
        prevState.formData = userWithTokens;
        redirect('/');
    } catch (e) {
        if (isRedirectError(e)) {
            throw e;
        }
        if (e instanceof Error) {
            if (e.message === 'Request failed with status code 400') {
                return {
                    errors: 'Invalid credentials',
                }
            } else {
                return {
                    errors: 'something went wrong',
                }
            }
        } else {
            return {
                errors: 'something went wrong',
            }
        }
    }
};