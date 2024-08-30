"use client"


import dynamic from 'next/dynamic';
const OrganizerProfile = dynamic(()=>import("@/components/EventOrganizer/OrganizerProfile/OrganizerProfile"),{
  ssr:false
})

export default function page ()  {
    return <OrganizerProfile/>
}
