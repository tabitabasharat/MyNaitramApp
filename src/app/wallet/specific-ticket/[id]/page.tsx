"use client"
import dynamic from 'next/dynamic'
const SpecificEventTickets = dynamic(() => import('@/components/Wallet/SpecificEventTickets'),{
  ssr:false
})
export default function page ()  {
    return <SpecificEventTickets/>
}
