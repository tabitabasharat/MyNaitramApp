
import dynamic from 'next/dynamic';
const EventSales = dynamic(()=>import("@/components/EventSales/EventSales"),{
  ssr:false
})

export default function page ()  {
    return <EventSales/>
}
