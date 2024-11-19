"use client"
import dynamic from 'next/dynamic'
const Specificqrcode = dynamic(() => import('@/components/Wallet/specificqrcode/Specificqrcode'),{
  ssr:false
})

export default function page ()  {
    return <Specificqrcode/>
}
