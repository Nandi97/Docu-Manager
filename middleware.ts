// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { auth } from './auth';

export default auth((req) => {
    console.log('Middleware executed:', req.url);

    if (!req.auth) {
        console.log('Not authenticated, redirecting...');
        const url = req.url.replace(req.nextUrl.pathname, '/');
        return Response.redirect(url);
    }

    // console.log('User authenticated:', req.auth);
});

export const config = { matcher: ['/dashboard/:path*'] };
