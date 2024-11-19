

import dynamic from 'next/dynamic';
const TakeOverEvent = dynamic(()=>import("@/components/gallery/takeover/TakeOverEvent"),{
  ssr:false
})

export default function page ()  {
  return <TakeOverEvent />;
};

