"use client"

import dynamic from 'next/dynamic';
const CreateEvent = dynamic(()=>import("@/components/create-event/CreateEvent"),{
  ssr:false
})

export default function page ()  {
  return <CreateEvent/>;
};
