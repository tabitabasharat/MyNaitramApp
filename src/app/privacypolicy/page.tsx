
"use client"
// import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import dynamic from 'next/dynamic'
const PrivacyPolicy = dynamic(() => import('../../components/PrivacyPolicy/PrivacyPolicy'))

export default function page ()  {
  return <PrivacyPolicy />;
};


