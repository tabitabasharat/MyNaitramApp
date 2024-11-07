import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.sub = account.access_token;
      }
      console.log("Google provider Token is as ====> ", token);
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.sub;
      console.log("Google provider Session is as ====> ", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
