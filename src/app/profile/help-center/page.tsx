
import dynamic from 'next/dynamic';
const Helpcenter = dynamic(()=>import("@/components/profile-page/Helpcenter"),{
  ssr:false
})

export default function page ()  {
    return <Helpcenter/>
}

