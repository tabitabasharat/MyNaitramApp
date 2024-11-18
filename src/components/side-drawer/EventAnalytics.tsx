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
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[97px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                Live Events                </h1>
            </div>
           <EventcardText/>
            {/* <div className='p-[24px] gradient-slate rounded-[8px]'>
                <div>
                    <div>
                        <div>
                            <div>
                                <p className="text-lg font-semibold">Add New Event</p>
                            </div>

                            <div className="relative flex flex-col sm:flex-row gap-[12px] sm:gap-[24px] mt-4">
                                <div
                                    className="gradient-slate w-full sm:w-[456px] h-[52px] bg-black rounded-md font-bold text-base pt-[18px] pb-[14px] px-[12px] cursor-pointer flex justify-between items-center"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span>{selectedEvent || 'Lorem Ispum'}</span>
                                    <svg
                                        className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute w-full sm:w-[456px] mt-[57px] sm:mt-[60px] bg-black rounded-md shadow-lg z-10">
                                        {options.map((option) => (
                                            <div
                                                key={option}
                                                className="py-2 px-4 cursor-pointer"
                                                onClick={() => handleSelect(option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Button className='font-extrabold text-sm p-[12px] lg:w-[108px]'>
                                Add Event
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-[24px] gradient-slate rounded-[8px]'>
                <h2 className='font-bold text-[20px] mb-[24px]'>Daily Sales</h2>
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                    <Table
                        sx={{
                            minWidth: 650,
                            borderBottom: "none",
                            borderTop: "1px solid #292929",
                            borderLeft: "none",
                            borderRight: "none",
                            fontFamily: "var(--font-base)",
                            color: "white",
                            background: "#0F0F0F",
                            fontSize: 16,
                            fontweight: 500,
                        }}
                        aria-label="simple table"
                    >
                        <TableHead className="table-gradient">
                            <TableRow sx={{ border: "1px solid #292929" }}>
                                <TableCell
                                    className="w-[40px] lg:w-[220px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                    align="left"
                                >
                                    Date
                                </TableCell>
                                <TableCell
                                    className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[145px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                >
                                    Sales
                                </TableCell>
                                <TableCell
                                    className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[150px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "1px solid #292929",
                                    }}
                                >
                                    Incentives
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[140px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "1px solid #292929",
                                    }}
                                >
                                    Total In
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[140px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "1px solid #292929",
                                    }}
                                >
                                    Total Out
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[160px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                >
                                    Revenue                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="border-0">
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        padding: "20px",
                                    }}
                                    className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                >
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            padding: "20px",
                                            fontFamily: "var(--font-base)",
                                            color: "white",
                                        }}
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                    >
                                        {row.name} +
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            fontFamily: "var(--font-base)",
                                            padding: "20px",
                                            color: "white",
                                        }}
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                    >
                                        {row.calories}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "var(--font-base)",
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            padding: "20px",
                                            color: "white",
                                        }}
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                    >
                                        {row.fat}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            fontFamily: "var(--font-base)",
                                            padding: "20px",
                                            color: "white",
                                        }}
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                    >
                                        £ {row.carbs}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            padding: "20px",
                                            fontFamily: "var(--font-base)",
                                            color: "white",
                                        }}
                                        className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                        align="left"
                                    >
                                        £ {row.protein}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            fontFamily: "var(--font-base)",
                                            borderRight: "none",
                                            padding: "16px",
                                            color: "white",
                                        }}
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                        align="left"
                                    >
                                        £ {row.percent}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className=' p-[24px] lg:w-[698px] rounded-[8px] gradient-slate '>
                <h2 className='font-bold text-[20px] mb-[24px]'>Pages</h2>
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                    <Table
                        sx={{
                            minWidth: 650,
                            borderBottom: "none",
                            borderTop: "1px solid #292929",
                            borderLeft: "none",
                            fontFamily: "var(--font-base)",
                            borderRight: "none",
                            color: "white",
                            background: "#0F0F0F",
                            fontSize: 16,
                            fontweight: 500,
                        }}
                        aria-label="simple table"
                    >
                        <TableHead className="table-gradient">
                            <TableRow sx={{ border: "1px solid #292929" }}>
                                <TableCell
                                    className="w-[350px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                    align="left"
                                >
                                    Page
                                </TableCell>
                                <TableCell
                                    className="px-[16.5px] lg:px-[20px] w-[350px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                >
                                    Followers
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="border-0">
                            {pages.map((pages) => (
                                <TableRow
                                    key={pages.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        borderBottom: "none",
                                        padding: "20px",
                                    }}
                                    className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                >
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            padding: "20px",
                                            color: "white",
                                            fontFamily: "var(--font-base)",
                                        }}
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                    >
                                        {pages.name} +
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            padding: "20px",
                                            fontFamily: "var(--font-base)",
                                            color: "white",
                                        }}
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                    >
                                        {pages.calories}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> */}
        </div>
    )
}
export default EventAnalytics