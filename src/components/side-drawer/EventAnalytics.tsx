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
import EventcardText from '../reusable-components/EventcardText';
import Link from "next/link";

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
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    Live Events                </h1>
            </div>
            <EventcardText />
        </Link>
    )
}
export default EventAnalytics