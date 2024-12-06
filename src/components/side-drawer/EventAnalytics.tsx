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
import {
    BarChart,
    Bar,
    LineChart,
    XAxis,
    YAxis,
    AreaChart,
    Line,
    Area,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LabelList,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="gradient-border border element border-muted rounded-lg pt-[10.22px] pe-[15.33px] pb-[15.33px] ps-[16.61px] ">
                <p className='text-[12px] '>29 July 00:00</p>
                <p className='flex items-center gap-[7.67px]'><span className='text-[#00D059] text-[20.44px] font-extrabold'>{`${payload[0].value}`}</span><span className='element2 text-center w-[44px] h-[18px] text-[#00D059] text-[12px]'>+3.4%</span></p>
            </div>
        );
    }

    return null;
};

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
const dataa = [
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



const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={4} // This applies the 4px border-radius
            fill={fill}
        />
    );
};

const data = [
    {
        name: '01 Oct',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '02 Oct',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '03 Oct',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '04 Oct',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '05 Oct',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '06 Oct',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '07 Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const ticket = [
    {
        name: '01 Oct',
        uv: 2000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '02 Oct',
        uv: 3000,
        pv: 1328,
        amt: 2210,
    },
    {
        name: '03 Oct',
        uv: 2000,
        pv: 9450,
        amt: 2290,
    },
    {
        name: '04 Oct',
        uv: 2780,
        pv: 308,
        amt: 2000,
    },
    {
        name: '05 Oct',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '06 Oct',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '07 Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const EventAnalytics = () => {
    const [activeTab, setActiveTab] = useState<"TICKET" | "REVENUE">("TICKET"); // Default: Ticket tab
    const [activeText, setActiveText] = useState<"Analytics" | "Event Analytics">("Analytics"); // Default: Analytics text
    const [activeData, setActiveData] = useState(ticket); // Default: Ticket data

    const handleTabChange = (tab: "TICKET" | "REVENUE") => {
        setActiveTab(tab);
        if (tab === "REVENUE") {
            setActiveText("Event Analytics");
            setActiveData(data); // Set data to Revenue data
        } else {
            setActiveText("Analytics");
            setActiveData(ticket); // Set data to Ticket data
        }
    };

    return (
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[97px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[25px] lg:mt-[120px] lg:mx-0 relative h-full">
            <div className="flex sm:mt-[0px] mt-[24px]">
                <p
                    className={`text-[24px] ps-[20px] mb-[4px] sm:ps-[0px]  md:text-[32px] font-extrabold cursor-pointer`}
                >
                    {activeText}
                </p>
            </div>
            <div className='flex flex-col lg:flex-row gap-[22px]'>
                <div className='flex gap-[12px] flex-col'>
                    <div className='flex flex-col sm:flex-row gap-[12px]'>
                        <div className='gradient-slate p-[24px] border border-[#292929] rounded-[8px] w-full lg:w-[250px] h-[220px]'>

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
                        <div className='gradient-slate p-[24px] border border-[#292929] rounded-[8px] w-full lg:w-[250px] h-[220px]'>
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
                    <div className='flex flex-col sm:flex-row gap-[12px]'>
                        <div className='gradient-slate  p-[24px] border border-[#292929] rounded-[8px] w-full lg:w-[250px] h-[220px]'>

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
                        <div className='gradient-slate p-[24px] border border-[#292929] rounded-[8px] w-full lg:w-[250px] h-[220px]'>

                            <p className='font-bold text-[20px] mb-[16px]'>Page Views</p>
                            <LineChart width={200} height={51} data={pageview}>
                                <Line type="monotone" dot={false} dataKey="uv" strokeWidth={3} stroke="#F34213" />
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
                <div className='gradient-slate p-[24px] border border-[#292929] rounded-[8px] w-full lg:w-[465px] h-[452px]'>
                    <p className='font-bold text-[20px]'>Followers</p>
                    <p className='mt-[20px] flex items-center gap-[20px] mb-[30px]'><span className='text-[#00D059] font-extrabold text-[48px]'>+130</span> <span className='text-[#D9D9D9] text-[20px]'>(169 all time)</span></p>
                    <ResponsiveContainer width="100%" height={258}>
                        <AreaChart data={dataa}>
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="43.56%" stopColor="rgba(0, 208, 89, 0.1)" />
                                    <stop offset="106.32%" stopColor="rgba(0, 208, 89, 0)" />
                                </linearGradient>
                            </defs>

                            <Line type="monotone" dataKey="uv" dot={false} stroke="#00D059" strokeWidth={3} />
                            <Tooltip
                                cursor={{
                                    stroke: "#00D059",      // Cursor color
                                    strokeWidth: 3,         // Cursor thickness
                                    type: "line",           // Line cursor
                                    fill: "transparent",    // Transparent background
                                }}
                                content={<CustomTooltip />}
                            />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#00D059"
                                fill="url(#gradient1)"  // Reference the gradient
                                fillOpacity={0.3}
                                strokeWidth={3}
                            />

                            <CartesianGrid stroke="#292929" strokeWidth={0.5} vertical={false} strokeDasharray="5 5" />

                            <YAxis
                                axisLine={false}
                                tick={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    fill: '#D9D9D9',
                                }}
                                tickLine={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* table */}
            <div className='p-[24px] gradient-slate border border-[#292929] rounded-[8px]'>
                <h2 className='font-bold text-[20px] mb-[24px]'>Top Events</h2>
                <TableContainer component={Paper} sx={{ boxShadow: "none" }} className='gradient-slate'>
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
            <div className='flex flex-col md:flex-row gap-[16px] h-[]' >
                <div
                    style={{
                    }}
                    className=" lg:p-[24px] w-full md:w-[618px] border-linear rounded-[8px] border border-[#292929] gradient-slate p-[16px]"
                >
                    <div className="flex justify-between">
                        <p className="font-bold text-[20px]">Sales</p>
                    </div>
                    <div className="flex mt-[24px]">
                        <div className="w-[120px]">
                            <p
                                onClick={() => handleTabChange("TICKET")}
                                className={`text-center text-sm font-bold pb-[10px]   ${activeTab === "TICKET" ? "text-[#00A849] border-[#00A849] font-bold border-b-2" : "border-b-2 text-white font-normal border-[#292929]"
                                    } cursor-pointer`}
                            >
                                Tickets
                            </p>
                        </div>
                        <div className="w-[120px]">
                            <p
                                onClick={() => handleTabChange("REVENUE")}
                                className={`text-center text-sm font-bold pb-[10px]  ${activeTab === "REVENUE" ? "text-[#00A849] border-[#00A849] font-bold border-b-2" : "border-b-2 text-white font-normal border-[#292929]"
                                    } cursor-pointer`}
                            >
                                Revenue
                            </p>
                        </div>
                    </div>
                    <ResponsiveContainer
                        width="115%"
                        height="65%"
                        className="scale-[0.83] ms-[16px] sm:ms-[0px] md:ms-[0px] lg:ms-[0px] flex-items-center justify-center lg:w-[120%] -translate-x-[47px] lg:-translate-x-[50px] xl:-translate-x-[70px] translate-y-[1rem]"
                    >
                        <BarChart
                            className="lg:w-[120%] max-width-adjustment-in-graph w-[135%]"
                            data={activeData} // Active data based on selected tab
                            barSize={27}
                            margin={{ top: 20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(0, 208, 89, 0.1)" />
                                    <stop offset="100%" stopColor="rgba(0, 208, 89, 0.1)" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                stroke="#292929"
                                strokeWidth={0.5}
                                vertical={false}
                                strokeDasharray="5 5"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tick={{
                                    fontSize: 10,
                                    fontWeight: "normal",
                                    fill: "#D9D9D9",
                                }}
                                tickLine={false}
                            />
                            <YAxis
                                axisLine={false}
                                tick={{
                                    fontSize: 10,
                                    fontWeight: "normal",
                                    fill: "#D9D9D9",
                                }}
                                tickLine={false}
                                tickFormatter={(value) =>
                                    activeTab === "REVENUE" ? `£${value}` : value // £ for Revenue, no symbol for Ticket
                                }
                                domain={[
                                    0,
                                    Math.max(
                                        ...activeData.map((item) => Math.max(item.uv, item.pv))
                                    ),
                                ]}
                            />
                            <Tooltip cursor={{ fill: "transparent" }} />
                            <Bar dataKey="uv" stackId="stack" shape={<CustomBar />} fill="#00D059" />
                            <Bar dataKey="pv" stackId="stack" shape={<CustomBar />} fill="url(#customGradient)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* <Analyticbarchart /> */}
                <div className='gradient-slate h-[228px] w-full md:w-[369px] flex flex-col rounded-[8px] gap-[30px] py-[24px] px-[28px]'>
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
        </div >
    )
}
export default EventAnalytics