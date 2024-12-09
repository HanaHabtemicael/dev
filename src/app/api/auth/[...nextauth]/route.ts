import { BASE_URL } from "@/config";
import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log("#############");
         console.log(credentials);
        // console.log("#############");

        const res = await fetch(
           "http://164.160.187.141:8090/api/iam/login/jwt",
          //`${BASE_URL}/api/iam/login/jwt`,
          {
            method: "POST",
            // body: JSON.stringify(credentials),
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );

        const user = await res.json();
         console.log(user);
        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: AdapterUser;
    }) {
      console.log("#############");
      console.log("token dilamo", token.user.user.role.name);
      // console.log("#############");
      session.user.id = token.user.user.id;
      session.user.name = `${token.user.user.first_name} ${token.user.user.last_name}`;
      session.user.token = token.user.token;
      session.user.role = token.user.user.role.name;
      return session;
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});

export { handler as GET, handler as POST };