"use client"

import dynamic from 'next/dynamic';
const DownloadAppPage = dynamic(()=>import("@/components/Download-app/DownloadAppPage"),{
  ssr:false
})

export default function page ()  {
  return <DownloadAppPage/>;
};

