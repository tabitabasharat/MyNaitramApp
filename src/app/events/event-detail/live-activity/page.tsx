"use client"

import dynamic from 'next/dynamic';
const LiveActivity = dynamic(()=>import("@/components/live-activity-page/LiveActivity"),{
  ssr:false
})

export default function page ()  {
  return <LiveActivity />;
};


