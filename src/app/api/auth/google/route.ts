import { NextResponse } from "next/server";
import { getGoogleAuthURL } from "@/app/lib/auth/google";

export async function GET() {
  try {
    // Get the authorization URL and redirect user to Google
    const authUrl = getGoogleAuthURL();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    return NextResponse.json({ error: "Failed to initialize Google Auth" }, { status: 500 });
  }
}
