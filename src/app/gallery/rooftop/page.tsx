"use client"

import dynamic from 'next/dynamic';
const RoofTop = dynamic(()=>import("@/components/gallery/rooftopparty/RoofTop"),{
  ssr:false
})

export default function page ()  {
  return <RoofTop />;
};

