
import dynamic from 'next/dynamic';
const FAQ = dynamic(()=>import("@/components/profile-page/FAQ"),{
  ssr:false
})


export default function page ()  {
    return <FAQ/>
}
