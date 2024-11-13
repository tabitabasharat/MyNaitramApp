import "next-auth";
import { DefaultSession } from "next-auth";

// Define the VerifiedSocials interface
interface VerifiedSocials {
  facebook?: boolean;
  google?: boolean;
  twitter?: boolean;
  linkedin?: boolean;
  instagram?: boolean;
  tiktok?: boolean;
  telegram?: boolean;
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      verifiedSocials?: VerifiedSocials;
    } & DefaultSession["user"];
  }

  interface User {
    verifiedSocials?: VerifiedSocials;
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    verifiedSocials?: VerifiedSocials;
  }
}
