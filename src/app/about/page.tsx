"use client"
// import AboutPage from '@/components/about/AboutPage';
import dynamic from 'next/dynamic';
const AboutPage = dynamic(()=>import("@/components/about/AboutPage"),{
  ssr:false
})

export default function page ()  {
  return <AboutPage />;
};



