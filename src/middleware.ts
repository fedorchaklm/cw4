import {NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {getCookie} from "cookies-next";
import {isTokenExpired} from "@/services/api.service";

const protectedRoutes = ['/', 'recipes', '/users', '/users/[userId]', 'recipes/[recipeId]'];
// const publicRoutes = ['/login'];

const checkIsProtectedRoute = (pathname: string) => {
    return protectedRoutes.some(route => {
        const regex = new RegExp(`^${route.replace(/\[.*?\]/g, '.*')}$`);
        return regex.test(pathname);
    });
};

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    console.log('>', {path});
    const isProtectedRoute = checkIsProtectedRoute(path);
    console.log('>', {isProtectedRoute});
    const accessToken = await getCookie('accesstoken', {cookies}) as string | undefined;
    console.log('>', accessToken);
    if (isProtectedRoute && !accessToken || isProtectedRoute && typeof accessToken === 'string' && isTokenExpired(accessToken)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

