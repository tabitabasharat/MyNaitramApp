"use client"
import dynamic from 'next/dynamic'
const Collectiontable = dynamic(() => import('@/components/Wallet/Collectiontable/Collectiontable'),{
  ssr:false
})

export default function page ()  {
    return <Collectiontable/>
}
