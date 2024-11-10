import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Instagram from "next-auth/providers/instagram";
import Twitter from "next-auth/providers/twitter";
import LinkedIn from "next-auth/providers/linkedin";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // Access YouTube Data API to verify the user’s YouTube channel
        const response = await fetch("https://www.googleapis.com/youtube/v3/channels?part=id,snippet&mine=true", {
          headers: {
            Authorization: `Bearer ${account?.access_token}`,
          },
        });
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          // User has a verified YouTube channel
          // Optionally store the YouTube channel ID or title for reference
          const youtubeChannelId = data.items[0].id;
          const youtubeChannelTitle = data.items[0].snippet.title;

          // Perform your logic here to mark YouTube as verified in the database
          // e.g., update the user’s verification status
          console.log(`Verified YouTube channel: ${youtubeChannelTitle}`);
        } else {
          // User does not have a YouTube channel
          return false; // This will prevent login if verification fails
        }
      }
      return true;
    },
  },
});
