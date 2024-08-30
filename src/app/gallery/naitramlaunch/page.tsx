"use client"

import dynamic from 'next/dynamic';
const NaitramLaunch = dynamic(()=>import("@/components/gallery/naitramlaunch/NaitramLaunch"),{
  ssr:false
})

export default function page ()  {
  return <NaitramLaunch />;
};

