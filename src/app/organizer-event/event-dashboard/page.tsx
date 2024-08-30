"use client"
// import Organizer from "@/components/EventOrganizer/Organizer/Organizer"

import dynamic from 'next/dynamic'
const Organizer = dynamic(() => import('../../../components/EventOrganizer/Organizer/Organizer'))

export default function page ()  {
    return < Organizer/>
}
