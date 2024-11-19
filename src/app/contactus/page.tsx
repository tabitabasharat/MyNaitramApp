"use client"

import dynamic from 'next/dynamic';
const ContactUsPage = dynamic(()=>import("@/components/contact-us/ContactUsPage"),{
  ssr:false
})

export default function page ()  {
  return <ContactUsPage />;
};


