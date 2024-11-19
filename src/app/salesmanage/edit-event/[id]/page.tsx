
import dynamic from 'next/dynamic';
const Editevent = dynamic(()=>import("@/components/Manageevent/Editevent"),{
  ssr:false
})

export default function page ()  {
    return <Editevent/>
}
