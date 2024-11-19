
import dynamic from 'next/dynamic';
const SpecificEventPage = dynamic(()=>import("@/components/ViewSpecificEvent/SpecificEventPage"),{
  ssr:false
})

export default function page ()  {
  return <SpecificEventPage />;
};


