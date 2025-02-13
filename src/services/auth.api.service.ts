import {IUserWithTokens} from "@/models/IUserWithTokens";
import {LoginDataType} from "@/models/LoginDataType";

export const authService = {
    login: async (loginData: LoginDataType): Promise<IUserWithTokens> => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData),
            // credentials: 'include' // Include cookies (e.g., accessToken) in the request
        })
        const userWithToken = await response.json();
        if (userWithToken.message) {
            throw new Error(userWithToken.message);
        }
        return userWithToken;
    },
    // refreshToken: async (): Promise<IUserWithTokens | undefined> => {
    //     const userWithTokens = retrieveLocalStorage<IUserWithTokens>('user');
    //     if (userWithTokens) {
    //         const {
    //             data: {
    //                 refreshToken,
    //                 accessToken
    //             }
    //         } = await axiosInstance.post<ITokensPair>('/auth/refresh', {
    //             refreshToken: userWithTokens.refreshToken
    //         });
    //         userWithTokens.accessToken = accessToken;
    //         userWithTokens.refreshToken = refreshToken;
    //         saveToLocalStorage('user', userWithTokens);
    //         return userWithTokens;
    //     }
    // }
}
