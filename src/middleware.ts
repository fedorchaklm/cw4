import {NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {getCookie} from "cookies-next";
import {isTokenExpired} from "@/services/api.service";

const checkIsProtectedRoute = (pathname: string) => {
    return !pathname.startsWith('/login');
};

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = checkIsProtectedRoute(path);
    const accessToken = await getCookie('accesstoken', {cookies}) as string | undefined;
    if (isProtectedRoute && !accessToken || isProtectedRoute && typeof accessToken === 'string' && isTokenExpired(accessToken)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

