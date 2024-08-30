
import dynamic from 'next/dynamic';
const EventsPage = dynamic(()=>import("@/components/eventspage/EventsPage"),{
  ssr:false
})

const page = () => {
  return <EventsPage />;
};

export default page;
