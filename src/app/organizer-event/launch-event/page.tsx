
import dynamic from 'next/dynamic';
const LunchEvent = dynamic(()=>import("@/components/LunchEvent/LunchEvent"),{
  ssr:false
})


export default function page ()  {
    return <LunchEvent/>
}
