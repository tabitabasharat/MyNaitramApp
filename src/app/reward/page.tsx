
"use client"

import dynamic from 'next/dynamic';
const Rewards = dynamic(()=>import("@/components/Reward/Rewards"),{
  ssr:false
})

export default function page ()  {
  return <Rewards />;
};


