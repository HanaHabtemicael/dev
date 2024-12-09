import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const isAuthenticated = !!token;
        return isAuthenticated;
      },
    },
  }
);

export const config = { matcher: "/((?!api|admin|static|.*\\..*|_next).*)",}