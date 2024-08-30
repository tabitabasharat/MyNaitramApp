"use client"
import dynamic from 'next/dynamic';
const OganizerCreateEvent = dynamic(()=>import("@/components/EventOrganizer/Organizer/OganizerCreateEvent/OganizerCreateEvent"),{
  ssr:false
})
export default function page ()  {
    return <OganizerCreateEvent/>
}
