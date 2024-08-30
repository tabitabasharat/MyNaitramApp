"use client"

import dynamic from 'next/dynamic';
const LunchModal = dynamic(()=>import("@/components/LunchEvent/LunchModal"),{
  ssr:false
})

export default function page ()  {
    return <LunchModal/>
}
