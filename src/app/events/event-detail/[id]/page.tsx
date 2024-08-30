
import dynamic from 'next/dynamic';
const EventDetail = dynamic(()=>import("@/components/event-detail-page/EventDetail"),{
  ssr:false
})

export default function page ()  {
  return <EventDetail />;
};

