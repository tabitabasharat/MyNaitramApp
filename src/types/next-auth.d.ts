import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface Jwt {
    accessToken?: string;
  }
}
