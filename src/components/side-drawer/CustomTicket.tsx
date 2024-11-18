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
function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Emily’s Wedding', "Custom Ticket", "Sold Out", "100/100", 1825.1),
    createData('Football Season 2025 ', "Festivals / Multi-Day Tickets ", "On Sale", "100/100", 1825.1),
    createData('My Birthday Party RSVP', "RSVP Ticketing", "ON Sale", "90/100", 1825.1),
    createData('Private Show Broadway ', "Private Event Ticketing", "ON Sale", "78/100", 1825.1),
    createData('Passworded Show Broadway ', "Passworded / Discounted Voucher Event ", "Sold Out", "100/100", 1825.1),
    createData('Whitelist Show', "Whitelist / Waitlist Event Ticketing", "ON Sale", "35/100", 1825.1),
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

const CustomTicket = () => {
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default CustomTicket