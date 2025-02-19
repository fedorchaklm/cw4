import {NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {getCookie} from "cookies-next";
import {isTokenExpired} from "@/services/api.service";
import {authService} from "@/services/auth.api.service";

const publicRoutes = ['/login', '/'];

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }

    const accessToken = await getCookie('accessToken', {cookies}) as string | undefined;
    const currentUser = await getCookie('currentUser', {cookies});

    if (!currentUser || !accessToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (accessToken) {
        if (isTokenExpired(accessToken)) {
            try {
                await authService.refreshToken();
            } catch (e) {
                console.info(e);
                return NextResponse.redirect(new URL('/login', request.nextUrl));
            }
            return NextResponse.next();
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.jpg$).*)'],
}

