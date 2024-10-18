"use client"
import dynamic from 'next/dynamic';
const Helpcenter = dynamic(()=>import("@/components/helpcenter/Helpcenter"),{
    ssr:false
  })

const page = () =>{
    return <Helpcenter/>
}
export default page 