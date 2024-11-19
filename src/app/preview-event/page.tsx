"use client"
import dynamic from 'next/dynamic';
const OrganizerPreviewEvent = dynamic(()=>import("@/components/EventOrganizer/PreviewEvent/SpecificEventPage"),{
  ssr:false
})
export default function page ()  {
    return <OrganizerPreviewEvent/>
}
