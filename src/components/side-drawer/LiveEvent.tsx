'use client'
import { useState } from 'react';
import ticket from "../../assets/Ticket.svg";
import Image from "next/image"
import cards from "../../assets/Cards.svg";
import cardsgreen from "../../assets/Cards (1).svg";
import ticketgreen from "../../assets/Ticket (1).svg";
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

type SelectedOption = "tickets" | "collectables" | null;

const LiveEvent = () => {
    const [selected, setSelected] = useState<SelectedOption>("tickets");
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility

    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <>
            <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[97px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
                <div className='mt-[45px] lg:mt-[0px] '>
                    <div className="flex gap-[12px] w-full">
                        <div
                            className={`gradient-slate border border-[#292929] rounded-stlying px-[12px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${selected === "tickets"
                                ? "gradient-border-rounded text-[#00A849]"
                                : ""
                                }`}
                            onClick={() => setSelected("tickets")}
                        >
                            {selected === "tickets" ? (
                                <Image
                                    src={caledndergreen}
                                    className="pb-[8px] hidden md:block"
                                    alt="Green Ticket"
                                />
                            ) : (
                                <Image
                                    src={calender}
                                    className="pb-[8px] hidden md:block"
                                    alt="Default Ticket"
                                />
                            )}
                            <p>Live Events</p>
                        </div>
                        <div
                            className={`gradient-slate border border-[#292929] rounded-stlying px-[12px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${selected === "collectables"
                                ? "gradient-border-rounded text-[#00A849]"
                                : ""
                                }`}
                            onClick={() => setSelected("collectables")}
                        >
                            {selected === "collectables" ? (
                                <Image
                                    src={calenderXgreen}
                                    className="pb-[8px] hidden md:block"
                                    alt="Green Collectibles"
                                />
                            ) : (
                                <Image
                                    src={calenderX}
                                    className="pb-[8px] hidden md:block"
                                    alt="Default Collectibles"
                                />
                            )}
                            <p>Past Events</p>
                        </div>
                    </div>
                    <h1 className="text-[24px] mt-[38px] ps-[20px] sm:ps-[0px] mb-[32px] md:text-[48px] font-extrabold">
                        Live Events                </h1>
                    <Link href="/side-drawer/ticket-data" >
                        <EventcardText />
                    </Link>
                </div>
            </div>


        </>
    )
}
export default LiveEvent