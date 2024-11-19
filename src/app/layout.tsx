// import "./globals.css";

// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import StoreProvider from "./StoreProvider";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// export const metadata: Metadata = {
//   title: "NAITRAM - Your Ticket. Your Event. Your Experience.",
//   description:
//     'Discover a new way to engage with events through Naitram, enhance your experience from start to finish. Whether you"re attending a conference festival, or corporate gathering.',
// };

// const baseFont = localFont({
//   src: [
//     {
//       path: "../../public/fonts/NexaLight.otf",
//       weight: "300",
//     },
//     {
//       path: "../../public/fonts/NexaRegular.otf",
//       weight: "400",
//     },
//     {
//       path: "../../public/fonts/NexaBold.otf",
//       weight: "700",
//     },
//     {
//       path: "../../public/fonts/NexaExtraBold.ttf",
//       weight: "800",
//     },
//   ],
//   fallback: ["Helvetica", "ui-sans-serif"],
//   variable: "--font-base",
//   display: "swap",
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const clientId =
//     "423487913735-4r2snu681msvd6nl8lt4leu29fmjuo82.apps.googleusercontent.com";

//   return (
//     <>
//       <GoogleOAuthProvider clientId={clientId}>
//         <StoreProvider>
//           <html lang="en">
//             <body
//               className={`${baseFont.variable} font-sans bg-black text-white overflow-x-clip`}
//             >
//               {children}
//             </body>
//           </html>
//         </StoreProvider>
//       </GoogleOAuthProvider>
//     </>
//   );
// }

import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "NAITRAM - Your Ticket. Your Event. Your Experience.",
  description:
    'Discover a new way to engage with events through Naitram, enhance your experience from start to finish. Whether you"re attending a conference, festival, or corporate gathering.',
};

// Load local fonts
const baseFont = localFont({
  src: [
    {
      path: "../../public/fonts/NexaLight.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/NexaRegular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/NexaBold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/NexaExtraBold.ttf",
      weight: "800",
    },
  ],
  fallback: ["Helvetica", "ui-sans-serif"],
  variable: "--font-base",
  display: "swap",
});

// Load Google Fonts (Poppins)
const poppins = Poppins({
  subsets: ["latin"], // Specify the subsets you need
  weight: ["400", "700"], // Specify the weights you need
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = "423487913735-4r2snu681msvd6nl8lt4leu29fmjuo82.apps.googleusercontent.com";

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <StoreProvider>
          <html lang="en">
            <body className={`${baseFont.variable} ${poppins.variable} font-sans bg-black text-white overflow-x-clip`}>{children}</body>
          </html>
        </StoreProvider>
      </GoogleOAuthProvider>
    </>
  );
}
