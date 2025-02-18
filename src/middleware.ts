import {NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {getCookie} from "cookies-next";
import {isTokenExpired} from "@/services/api.service";
import {authService} from "@/services/auth.api.service";

// const checkIsProtectedRoute = (pathname: string) => {
//     return !pathname.startsWith('/login');
// };

const publicRoutes = ['/login', '/'];

// export default async function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;
//     const isProtectedRoute = checkIsProtectedRoute(path);
//     const accessToken = await getCookie('accesstoken', {cookies}) as string | undefined;
//     if (accessToken) {
//         if (isTokenExpired(accessToken)) {
//             try {
//                 await authService.refreshToken();
//             } catch (e) {
//                 console.info(e);
//                 return NextResponse.redirect(new URL('/login', request.nextUrl))
//             }
//
//             return NextResponse.next();
//         }
//     }
//
//     if (isProtectedRoute && !accessToken || isProtectedRoute && typeof accessToken === 'string' && isTokenExpired(accessToken)) {
//         return NextResponse.redirect(new URL('/login', request.nextUrl))
//     }
//
//     return NextResponse.next();
// }


export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log('>', {path});

    if (publicRoutes.includes(path)) {
        console.log('includes');
        return NextResponse.next();
    }

    console.log('not includes');
    const accessToken = await getCookie('accesstoken', {cookies}) as string | undefined;
    const currentUser = await getCookie('currentUser', {cookies}) as string | undefined;
    console.log(accessToken);
    console.log({currentUser});

    if (!currentUser) {
        console.log('no currentUser or accessToken');
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (accessToken) {
        if (isTokenExpired(accessToken)) {
            console.log('token expired');
            try {
                await authService.refreshToken();
            } catch (e) {
                console.info(e);
                console.log('token expired can not refresh');
                return NextResponse.redirect(new URL('/login', request.nextUrl));
            }
            console.log('refresh token');
            return NextResponse.next();
        }
        return NextResponse.next();
    }
}


// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

