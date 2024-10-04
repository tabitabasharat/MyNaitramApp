
import dynamic from 'next/dynamic';
const Manageevent = dynamic(()=>import("@/components/EventSalesMang/Manageevent"),{
  ssr:false
})

export default function page ()  {
    return <Manageevent/>
}
