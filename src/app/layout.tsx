import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'NAITRAM - Your Ticket. Your Event. Your Experience.',
  description:
    'Discover a new way to engage with events through Naitram, enhance your experience from start to finish. Whether you"re attending a conference festival, or corporate gathering.',
};

const baseFont = localFont({
  src: [
    {
      path: '../../public/fonts/NexaLight.otf',
      weight: '300',
    },
    {
      path: '../../public/fonts/NexaRegular.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/NexaBold.otf',
      weight: '700',
    },
    {
      path: '../../public/fonts/NexaExtraBold.ttf',
      weight: '800',
    },
  ],
  fallback: ['Helvetica', 'ui-sans-serif'],
  variable: '--font-base',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baseFont.variable} font-sans bg-black text-white overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
