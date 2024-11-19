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
import Link from 'next/link';

interface Calorie {
    title: string;
    url: string;
}

interface DataRow {
    name: string;
    fat: string;
    carbs: string;
    protein: number;
    calories?: Calorie[];
}

function createData(
    name: string,
    fat: string,
    carbs: string,
    protein: number,
    calories?: Calorie[]
): DataRow {
    return { name, fat, carbs, protein, calories };
}

const rows: DataRow[] = [
    createData('Emily’s Wedding', 'Sold Out', '100/100', 1825.1, [{ title: 'Custom Ticket', url: '/side-drawer/customer-ticket' }]),
    createData('Football Season 2025', 'On Sale', '100/100', 1825.1, [{ title: 'Festivals / Multi-Day Tickets', url: '/festivals-tickets' }]),
    createData('My Birthday Party RSVP', 'On Sale', '90/100', 1825.1, [{ title: 'RSVP Ticketing', url: '/rsvp-ticketing' }]),
    createData('Private Show Broadway', 'On Sale', '78/100', 1825.1, [{ title: 'Private Event Ticketing', url: '/private-event-ticketing' }]),
    createData('Passworded Show Broadway', 'Sold Out', '100/100', 1825.1, [{ title: 'Passworded / Discounted Voucher Event', url: '/passworded-event' }]),
    createData('Whitelist Show', 'On Sale', '35/100', 1825.1, [{ title: 'Whitelist / Waitlist Event Ticketing', url: '/whitelist-event' }]),
];


const TicketData = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility

    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[57px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    PIZDEZ Womens Day Party 2024
                </h1>
            </div>
            <div className='flex gap-[12px] w-full'>
                <div className='w-full px-[12px] py-[16px] gradient-slate rounded-[8px]'>
                    <p className='text-sm'>Total Sales</p>
                    <h3 className='text-[#00D059] text-[30px] font-extrabold'>54</h3>
                </div>
                <div className='w-full px-[12px] py-[16px] gradient-slate rounded-[8px]'>
                    <p className='text-sm'>Total Revenue</p>
                    <h3 className='text-[#00D059] text-[30px] font-extrabold'>£10,950.6</h3>
                </div>
            </div>
            <div>
                <h2 className='font-extrabold text-[32px] mb-[24px]'>Sales</h2>
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
                        <TableHead className="table-gradient" >
                            <TableRow sx={{ border: "1px solid #292929" }}>
                                <TableCell
                                    className="w-[40px] lg:w-[250px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",

                                    }}
                                    align="left"
                                >
                                    Ticket Names
                                </TableCell>
                                <TableCell
                                    className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[303px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                >
                                    Ticket Type
                                </TableCell>
                                <TableCell
                                    className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[175px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "1px solid #292929",
                                    }}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[175px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "1px solid #292929",
                                    }}
                                >
                                    Sales
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
                                    Revenue
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* <TableBody className="border-0">
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
                                        {row.name} 
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
                                </TableRow>
                                
                            ))}
                        </TableBody> */}
                        <TableBody className="border-0">
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    className="bg-[#0F0F0F] text-white text-[10px] font-normal lg:text-sm"
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        borderBottom: 'none',
                                        fontFamily: 'var(--font-base)',
                                        padding: '20px',
                                    }}
                                >
                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="bg-[#0F0F0F] text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: '20px', borderBottom: 'none', fontFamily: 'var(--font-base)' }}
                                    >
                                        {row.name}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        className="bg-[#0F0F0F] text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: '20px', borderBottom: 'none', fontFamily: 'var(--font-base)' }}
                                    >
                                        {row.calories ? (
                                            row.calories.map((calorie, index) => (
                                                <Link key={index} href={calorie.url} passHref legacyBehavior>
                                                    <a className="text-white font-bold text-sm mr-2">{calorie.title}</a>
                                                </Link>
                                            ))
                                        ) : (
                                            <span>No Data</span>
                                        )}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        className="bg-[#0F0F0F] text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: '20px', borderBottom: 'none', fontFamily: 'var(--font-base)' }}
                                    >
                                        {row.fat}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        className="bg-[#0F0F0F] text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: '20px', borderBottom: 'none', fontFamily: 'var(--font-base)' }}
                                    >
                                        £ {row.carbs}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        className="bg-[#0F0F0F] text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: '20px', borderBottom: 'none', fontFamily: 'var(--font-base)' }}
                                    >
                                        £ {row.protein}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default TicketData