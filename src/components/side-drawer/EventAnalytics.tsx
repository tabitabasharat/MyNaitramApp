'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button } from '../ui/button';
import AllEventsGrid from '../reusable-components/AllEventsGrid';
import Card from '../about/vision/card/Card';
import EventCard from '../reusable-components/EventCard';
import calender from "@/assets/Calender.svg";
import calendercheck from "@/assets/Calender Check.svg";
import calenderX from "@/assets/Calender X.svg";
import calendercheckgreen from "@/assets/Calender Checkgreen.svg";
import calenderXgreen from "@/assets/Calender Xgreen.svg";
import caledndergreen from "@/assets/Calendergreen.svg";
import EventcardText from '../reusable-components/EventcardText';
import Link from "next/link";

const eventimges = [
    { id: 1, title: "All Events", imges: calender },
    { id: 2, title: "Attending", imges: calendercheck },
    { id: 3, title: "Past Events", imges: calenderX },
  ];
  
  const greenimges = [
    { id: 1, title: "All Events", imges: caledndergreen },
    { id: 2, title: "Attending", imges: calendercheckgreen },
    { id: 3, title: "Past Events", imges: calenderXgreen },
  ];

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    // totalout: number,
    percent: number,
) {
    return { name, calories, fat, carbs, protein, percent };
}

const rows = [
    createData('Today', 159, 6.0, 24, 4.0, 24),
    createData('Yesterday ', 237, 9.0, 4.3, 24, 40),
    createData('Sun 02 Nov ', 262, 16.0, 6.0, 24, 4.0),
    createData('Fri 31 Oct ', 305, 3.7, 4.3, 24, 4.0),
];

function createDatapages(
    name: string,
    calories: number,
) {
    return { name, calories };
}

const pages = [
    createDatapages('Lorem Ispum Lorem Uspum', 159),
    createDatapages('Lorem Ispum Lorem Uspum ', 237),
    createDatapages('Lorem Ispum Lorem Uspum', 262),
    createDatapages('Lorem Ispum Lorem Uspum', 305),
];

const EventAnalytics = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility

    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <Link href="/side-drawer/ticket-data" className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[97px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                {/* <div className="grid grid-cols-3 gap-[8px] events md:gap-4">
                    {eventimges.map((event) => (
                        <div
                            key={event.id}
                            // onClick={() => handleClick(event.id, event.title)}
                            className={`relative flex flex-col flex items-center justify-center md:items-start pt-[3px] rounded-[44px] md:rounded-lg w-full md:px-[12px] md:pt-[16px] md:pb-[12px] cursor-pointer  duration-300 ${selectedEvent?.id === event.id ? "gradient-slate text-[#13FF7A] gradient-border-rounded" : "gradient-slate border-muted"
                                }`}
                        >
                            <Image
                                src={event.imges}
                                // src={currentImages.find((img) => img.id === event.id)?.imges || event.imges}
                                alt={event.title}
                                width={20}
                                height={20}
                                className="rounded-lg transition-transform duration-300 hidden md:block"
                                // style={{
                                //     filter: selectedEvent?.id === event.id ? "none" : "grayscale(100%)",
                                // }}
                            />
                            <p className="md:m-0 my-[12px] text-sm md:mt-[8px]">{event.title}</p>
                        </div>
                    ))}
                </div> */}
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    Live Events                </h1>
            </div>
            <EventcardText />
        </Link>
    )
}
export default EventAnalytics