import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { GoogleUser } from "@/app/types/auth";

// Configuration object with essential OAuth credentials
export const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID!, // Your Google Client ID
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Your Google Client Secret
  redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`, // Where Google redirects after auth
};

// Create OAuth2 client instance
export const oauth2Client = new OAuth2Client(googleConfig.clientId, googleConfig.clientSecret, googleConfig.redirectUri);

// Generate the Google authorization URL
export const getGoogleAuthURL = (): string => {
  const scopes = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
};

// Get user information after successful authentication
export const getGoogleUser = async (code: string): Promise<GoogleUser> => {
  // Exchange authorization code for tokens
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Use tokens to get user information
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();

  // Return structured user data
  return {
    id: data.id!,
    email: data.email!,
    name: data.name!,
    picture: data.picture!,
    verified_email: data.verified_email!,
  };
};
