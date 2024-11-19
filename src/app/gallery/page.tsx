
"use client"

import dynamic from 'next/dynamic';
const GalleryPage = dynamic(()=>import("@/components/gallery/GalleryPage"),{
  ssr:false
})

export default function page ()  {
  return <GalleryPage />;
};

