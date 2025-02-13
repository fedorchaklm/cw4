import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";

const middleware = async (request: NextRequest) => {
    if (!request.nextUrl.pathname.startsWith('/auth')) {
        const accessToken = await getCookie('accesstoken', {cookies}) as string;
        // const refreshToken = await getCookie('refreshtoken', {cookies});
        console.log(accessToken);

        const response = NextResponse.next({
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
        console.log('>', 'protected', request.url);
        return response;
    }
    console.log('auth');


};

export const config = {
    matcher: '/:path*'
};

export default middleware;