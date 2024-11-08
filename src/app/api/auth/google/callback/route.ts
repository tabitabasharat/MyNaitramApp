import { NextRequest, NextResponse } from "next/server";
import { getGoogleUser } from "@/app/lib/auth/google";

export async function GET(request: NextRequest) {
  try {
    // Get the authorization code from URL parameters
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      throw new Error("No code provided");
    }

    // Get user information using the code
    const user = await getGoogleUser(code);

    // Here you would typically add code to:
    // 1. Save user to your database
    // Example:
    /*
    await db.user.upsert({
      where: { googleId: user.id },
      update: { 
        email: user.email,
        name: user.name,
        picture: user.picture
      },
      create: {
        googleId: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
    */

    // 2. Create a session
    // Example with next-auth:

    // const session = await signIn('credentials', {
    //   redirect: false,
    //   user: JSON.stringify(user)
    // });

    sessionStorage.setItem("GoogleUser", JSON.stringify(user));
    console.log("User from Google is as =======> ", user);

    // 3. Set necessary cookies/tokens
    // Example:
    /*
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    */

    // Redirect to success page with user data
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/success?user=${encodeURIComponent(JSON.stringify(user))}`);
  } catch (error) {
    console.error("Google callback error:", error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/error?error=Failed to authenticate with Google`);
  }
}
