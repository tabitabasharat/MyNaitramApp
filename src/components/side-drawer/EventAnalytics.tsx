'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import arrowdown from "@/assets/V2assets/Line arrow-down.svg"
import { useState } from 'react';
import arrowup from "@/assets/V2assets/Button.svg"
import arrowred from "@/assets/V2assets/Buttonred.svg"
import { Button } from '../ui/button';
import Analyticbarchart from './Analyticbarchart';
import Image from 'next/image';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function createData(
    name: number,
    calories: string,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, 'Naitram Launch Party 2024', 100, 90, 1825.1),
    createData(2, 'Naitram Launch Party 2024', 100, 90, 1825.1),
    createData(3, 'Naitram Launch Party 2024', 100, 90, 1825.1),
    createData(4, 'Naitram Launch Party 2024', 100, 90, 1825.1),
    createData(5, 'Naitram Launch Party 2024', 100, 90, 1825.1),
];
const data = [
    { name: 'Page D', uv: 30, pv: 2000, amt: 2120 },
    { name: 'Page D', uv: 100, pv: 2000, amt: 2181 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
];

const Revenue = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
];
const ticketsale = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
];
const redticketsale = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
];
const pageview = [
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
    { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
    { name: 'Page C', uv: 200, pv: 2290, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 2000, amt: 2181 },
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
                    Event Analytics
                </h1>
            </div>
            <div className='flex gap-[22px]'>
                <div className='flex gap-[12px] flex-col'>
                    <div className='flex gap-[12px]'>
                        <div className='gradient-slate p-[24px] gradient-slate-input rounded-[8px] w-[250px] h-[220px]'>

                            <p className='font-bold text-[20px] mb-[16px]'>Revenue</p>
                            <LineChart width={200} height={51} data={Revenue}>
                                <Line type="monotone" dot={false} dataKey="uv" strokeWidth={2} stroke="#32D583" />
                            </LineChart>
                            <div className='flex gap-[16px] mt-[11px] items-start'>
                                <div>
                                    <Image src={arrowup} sizes='26px' alt="arrowup" className='mt-[10px]' />
                                </div>
                                <div>
                                    <p className='font-extrabold text-[32px]'>£1,825.1</p>
                                    <p className='flex gap-[4px]'><span className='text-[#00D059] text-sm'>+7.3%</span><span className='text-[#D9D9D9] text-[12px]'>vs Last 7 Days</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-slate p-[24px] gradient-slate-input rounded-[8px] w-[250px] h-[220px]'>
                            <p className='font-bold text-[20px] mb-[16px]'>Ticket Sales</p>
                            <LineChart width={200} height={51} data={ticketsale}>
                                <Line type="monotone" dot={false} dataKey="uv" strokeWidth={2} stroke="#32D583" />
                            </LineChart>
                            <div className='flex gap-[16px] mt-[11px] items-start'>
                                <div>
                                    <Image src={arrowup} sizes='26px' alt="arrowup" className='mt-[10px]' />
                                </div>
                                <div>
                                    <p className='font-extrabold text-[32px]'>293</p>
                                    <p className='flex gap-[4px]'><span className='text-[#00D059] text-sm'>+7.3%</span><span className='text-[#D9D9D9] text-[12px]'>vs Last 7 Days</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[12px]'>
                        <div className='gradient-slate  p-[24px] gradient-slate-input rounded-[8px] w-[250px] h-[220px]'>

                            <p className='font-bold text-[20px] mb-[16px]'>Rep Ticket Sales</p>
                            <LineChart width={200} height={51} data={redticketsale}>
                                <Line type="monotone" dot={false} dataKey="uv" strokeWidth={2} stroke="#32D583" />
                            </LineChart>
                            <div className='flex gap-[16px] mt-[11px] items-start'>
                                <div>
                                    <Image src={arrowup} sizes='26px' alt="arrowup" className='mt-[10px]' />
                                </div>
                                <div>
                                    <p className='font-extrabold text-[32px]'>69</p>
                                    <p className='flex gap-[4px]'><span className='text-[#00D059] text-sm'>+7.3%</span><span className='text-[#D9D9D9] text-[12px]'>vs Last 7 Days</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-slate p-[24px] gradient-slate-input rounded-[8px] w-[250px] h-[220px]'>

                            <p className='font-bold text-[20px] mb-[16px]'>Page Views</p>
                            <LineChart width={200} height={51} data={pageview}>
                                <Line type="monotone" dot={false} dataKey="uv" strokeWidth={2} stroke="#F34213" />
                            </LineChart>
                            <div className='flex gap-[16px] mt-[11px] items-start'>
                                <div>
                                    <Image src={arrowred} sizes='26px' alt="arrowup" className='mt-[10px]' />
                                </div>
                                <div>
                                    <p className='font-extrabold text-[32px]'>123</p>
                                    <p className='flex gap-[4px]'><span className='text-[#F34213] text-sm'>-7.3%</span><span className='text-[#D9D9D9] text-[12px]'>vs Last 7 Days</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gradient-slate p-[24px] gradient-slate-input rounded-[8px] w-[465px] h-[452px]'>
                    <p className='font-bold text-[20px] mb-[20px]'>Followers</p>
                    <p className='mt-[20px] flex items-center gap-[20px] mb-[30px]'><span className='text-[#00D059] font-extrabold text-[48px]'>+130</span> <span className='text-[#D9D9D9] text-[20px]'>(169 all time)</span></p>
                    <LineChart width={400} height={258} data={data}>
                        <Line type="monotone" dataKey="uv" dot={false} stroke="#00D059" strokeWidth={3} />
                        <CartesianGrid stroke="#292929" strokeWidth={0.5} vertical={false} strokeDasharray="5 5" />
                        {/* <XAxis dataKey="name" /> */}
                        <YAxis axisLine={false} tick={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            fill: '#D9D9D9', // Tick label color
                        }} tickLine={false} />
                    </LineChart>
                </div>
            </div>

            <div className='p-[24px] gradient-slate gradient-slate-input rounded-[8px]'>
                <h2 className='font-bold text-[20px] mb-[24px]'>Top Events</h2>
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
                        <TableHead className="table-gradient-new">
                            <TableRow sx={{
                                border: "none", borderTop: "none",
                                borderBottom: "1px solid #292929",
                            }}>
                                <TableCell
                                    className="w-[40px] lg:w-[70px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    sx={{
                                        color: "#A6A6A6",
                                        borderTop: "none",
                                        borderBottom: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                    align="left"
                                >
                                    #
                                </TableCell>
                                <TableCell
                                    className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[320px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderTop: "none",
                                        borderBottom: "1px solid #292929",
                                        fontFamily: "var(--font-base)",
                                    }}
                                >
                                    Event Name
                                </TableCell>
                                <TableCell
                                    className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[195px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderTop: "none",
                                        fontFamily: "var(--font-base)",
                                        borderBottom: "1px solid #292929",
                                    }}
                                >
                                    Tickets
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[195px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderTop: "none",
                                        fontFamily: "var(--font-base)",
                                        borderBottom: "1px solid #292929",
                                    }}
                                >
                                    Attendees
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[175px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderTop: "none",
                                        fontFamily: "var(--font-base)",
                                        borderBottom: "1px solid #292929",
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
                        </TableRow>
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
                                        {row.carbs}
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
            <div className='flex gap-[16px]' >
                <Analyticbarchart />
                <div className='gradient-slate gradient-slate-input w-[369px] h-[288px] flex flex-col rounded-[8px] gap-[30px] py-[24px] px-[28px]'>
                    <div>
                        <h3>CSV Reports</h3>

                    </div>
                    <div>
                        <p className='flex gap-[6px] mb-[10px]'><Image src={arrowdown} sizes='16px' alt="arrowdown" /> User</p>
                        <p className='flex gap-[6px] mb-[10px]'><Image src={arrowdown} sizes='16px' alt="arrowdown" />Tickets</p>
                        <p className='flex gap-[6px] mb-[10px]'><Image src={arrowdown} sizes='16px' alt="arrowdown" />Transactions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventAnalytics