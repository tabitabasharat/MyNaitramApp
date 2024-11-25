'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { TableFooter } from '@mui/material';
import Link from 'next/link';

interface Calorie {
    title: string;
    url: string;
}

interface DataRow {
    name: string;
    status: string;
    sales: string; // Fraction as a string e.g., "33/100"
    price: number;
    links: { title: string; url: string }[];
}

const createData = (name: string, status: string, sales: string, price: number, links: { title: string; url: string }[]) => ({
    name,
    status,
    sales,
    price,
    links,
});

const rows: DataRow[] = [
    createData('Emily’s Wedding', 'Sold Out', '100/100', 1825.1, [{ title: 'Custom Ticket', url: '/side-drawer/customer-ticket' }]),
    createData('Football Season 2025', 'On Sale', '100/100', 1825.1, [{ title: 'Festivals / Multi-Day Tickets', url: '/side-drawer/festivals-tickets' }]),
    createData('My Birthday Party RSVP', 'On Sale', '90/100', 1825.1, [{ title: 'RSVP Ticketing', url: '/side-drawer/rsvp-ticketing' }]),
    createData('Private Show Broadway', 'On Sale', '78/100', 1825.1, [{ title: 'Private Event Ticketing', url: '/side-drawer/private-event-ticketing' }]),
    createData('Passworded Show Broadway', 'Sold Out', '100/100', 1825.1, [{ title: 'Passworded / Discounted Voucher Event', url: '/side-drawer/passworded-event' }]),
    createData('Whitelist Show', 'On Sale', '35/100', 1825.1, [{ title: 'Whitelist / Waitlist Event Ticketing', url: '/side-drawer/whitelist-event' }]),
];


const TicketData = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility
    const [sumData, setSumData] = useState(0);
    const [sumSales, setSumSales] = useState(0);
    // const [totals, setTotals] = useState({ numerator: 0, denominator: 0 });
    const [totalNumerator, setTotalNumerator] = useState(0);
    const [totalDenominator, setTotalDenominator] = useState(0);

    useEffect(() => {
        // Calculate the sum of all numerators
        const sumNumerators = rows.reduce((sum, row) => {
            const [numerator] = row.sales.split('/').map((value) => parseInt(value, 10));
            return sum + numerator;
        }, 0);

        const sumDenominators = rows.reduce((sum, row) => {
            const [, denominator] = row.sales.split('/').map((value) => parseInt(value, 10));
            return sum + denominator;
        }, 0);

        setTotalNumerator(sumNumerators);
        setTotalDenominator(sumDenominators);
    }, []);

    useEffect(() => {
        const totalPrice = rows.reduce((sum, row) => sum + row.price, 0.0);
        setSumSales(totalPrice);
    }, []);
    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };
    useEffect(() => {
        const totalPrice = rows.reduce((sum, row) => sum + row.price, 0.0);
        setSumData(totalPrice);
    }, [])

    return (
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[57px] ps-[0px] min-[993px]:ps-[92px] min-[769px]:ps-[300px]   md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    PIZDEZ Womens Day Party 2024
                </h1>
            </div>
            <div className='flex gap-[12px] w-full max-[425px]:flex-col'>                            
                <div className='w-full px-[12px] lg:w-[495px] py-[16px] gradient-slate gradient-slate-input rounded-[8px]'>
                    <p className='text-sm'>Total Sales</p>
                    <h3 className='text-[#00D059] text-[30px] font-extrabold'>54</h3>
                </div>
                <div className='w-full px-[12px] lg:w-[495px] py-[16px] gradient-slate gradient-slate-input rounded-[8px]'>
                    <p className='text-sm'>Total Revenue</p>
                    <h3 className='text-[#00D059] text-[30px] font-extrabold'>£10,950.6</h3>
                </div>
            </div>
            <div>
                <h2 className='font-extrabold text-[32px] mb-[24px]'>Sales</h2>
                <TableContainer component={Paper} sx={{
                    boxShadow: "none", background: "transparent", overflow: "auto",
                    maxHeight: "100%",
                    '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    <Table className=''
                        sx={{
                            // minWidth: 650,
                            borderBottom: "none",
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            fontFamily: "var(--font-base)",
                            color: "white",
                            fontSize: 16,
                            fontweight: 500,

                        }}
                        aria-label="simple table"
                    >
                        <TableHead className="table-gradient-new" style={{ borderBottom: 'none' }} >
                            <TableRow sx={{
                                borderBottom: 'none', border: "none",
                                borderTop: "none",
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                                borderBottomLeftRadius: '8px',
                                borderBottomRightRadius: '8px',
                            }} className='gradient-slate'>
                                <TableCell
                                    className=" lg:w-[250px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    sx={{
                                        borderTop: 'none',
                                        borderTopLeftRadius: '10px',
                                        borderBottomLeftRadius: '10px',
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",


                                    }}
                                    align="left"
                                >
                                    Ticket Names
                                </TableCell>
                                <TableCell
                                    className=" px-[16.5px] lg:px-[20px] lg:w-[303px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        borderTop: "none",
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
                                        borderTop: "none",
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
                                        borderTop: "none",
                                    }}
                                >
                                    Sales
                                </TableCell>
                                <TableCell
                                    className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[175px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "none",
                                        border: "none",
                                        borderTopRightRadius: "8px",
                                        borderBottomRightRadius: '8px',
                                    }}
                                >
                                    Revenue
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableRow
                            sx={{

                                backgroundColor: "transparent",
                                height: "8px",
                            }}
                        >
                            <TableCell
                                colSpan={5}
                                sx={{
                                    padding: 0,
                                    border: "none",
                                }}
                            />
                            <TableCell
                                colSpan={5}
                                sx={{
                                    padding: 0,
                                    border: "none",
                                }}
                            />
                        </TableRow>

                        <TableBody className="gradient-slate ">
                            {rows.map((row, rowIndex) => (
                                <TableRow
                                    key={row.name}
                                    className="text-white text-[10px] font-normal lg:text-sm"
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        padding: "20px",
                                    }}
                                >
                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        className="text-white text-[10px] font-normal lg:text-sm"
                                        sx={{
                                            padding: "20px",
                                            borderBottom: "none",
                                            fontFamily: "var(--font-base)",
                                            ...(rowIndex === 0 && {
                                                borderTopLeftRadius: "8px",
                                            }),
                                            ...(rowIndex === rows.length - 1 && {
                                                borderBottomLeftRadius: "8px",
                                            }),
                                        }}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-white text-[10px] font-normal lg:text-sm"
                                        sx={{
                                            padding: "20px",
                                            borderBottom: "none",
                                            fontFamily: "var(--font-base)",

                                        }}
                                    >
                                        {row.links ? (
                                            row.links.map((links, index) => (
                                                <Link key={index} href={links.url} passHref legacyBehavior>
                                                    <a className="text-white mr-2">{links.title}</a>
                                                </Link>
                                            ))
                                        ) : (
                                            <span>No Data</span>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: "20px", borderBottom: "none", fontFamily: "var(--font-base)" }}
                                    >
                                        {row.status}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-white text-[10px] font-normal lg:text-sm"
                                        sx={{ padding: "20px", borderBottom: "none", fontFamily: "var(--font-base)" }}
                                    >
                                        {row.sales}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        className="text-white text-[10px] font-normal lg:text-sm"
                                        sx={{
                                            padding: "20px",
                                            borderBottom: "none",
                                            fontFamily: "var(--font-base)",
                                            ...(rowIndex === 0 && {
                                                borderTopRightRadius: "8px", // Top-left radius for the first row
                                            }),
                                            ...(rowIndex === rows.length - 1 && {
                                                borderBottomRightRadius: "8px", // Bottom-left radius for the last row
                                            }),
                                        }}
                                    >
                                        £ {row.price}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>


                        <TableFooter>
                            <TableRow
                                sx={{

                                    backgroundColor: "transparent",
                                    height: "8px",
                                }}
                            >
                                <TableCell
                                    colSpan={5}
                                    sx={{
                                        padding: 0,
                                        border: "none",
                                    }}
                                />
                            </TableRow>
                            <TableRow sx={
                                {
                                    border: "none",
                                }
                            }
                            >
                                <TableCell colSpan={3} align="right" className='gradient-slate' sx={{ border: "none", fontWeight: "bold", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px" }}>

                                </TableCell>

                                <TableCell sx={{ fontWeight: "400", fontFamily: "var(--font-base)", border: "none", }} className='gradient-slate text-[#A6A6A6]'>
                                    <div className="flex justify-between w-1/4">
                                        <span>{totalNumerator}</span>
                                        <span>/</span>
                                        <span>{totalDenominator}</span>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ fontWeight: "400", fontFamily: "var(--font-base)", border: "none", borderBottomRightRadius: "8px", borderTopRightRadius: "8px" }} className='gradient-slate text-[#A6A6A6]'>
                                    £{sumData.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default TicketData