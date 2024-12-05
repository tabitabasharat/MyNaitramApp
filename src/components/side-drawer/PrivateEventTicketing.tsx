'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import filter from "@/assets/Favorite - Button.svg";
import sale from "@/assets/V2assets/whitesale.svg";
import calendercheck from "@/assets/Calender Check.svg";
import calendercheckgreen from "@/assets/Calender Checkgreen.svg";
import salegreen from "@/assets/V2assets/greensale.svg";
import Image from "next/image"

function createData(
    name: number,
    calories: string,
    fat: number,
    carbs: number,
) {
    return { name, calories, fat, carbs, };
}
function createData2(
    username: string,
    email: string,
    scantime: string,

) {
    return { username, email, scantime };
}

const analytics = [
    createData2("John Williams", "william@gmail.com", "05:00:11"),
    createData2("John Williams", "william@gmail.com", "05:00:11"),
    createData2("John Williams", "william@gmail.com", "05:00:11"),
    createData2("John Williams", "william@gmail.com", "05:00:11"),
];

const rows = [
    createData(1, "Premium", 40, 90),
    createData(2, "Gold", 150, 78),
    createData(3, "Takeovr 2024", 80, 82),
    createData(4, "Takeovr 2024", 100, 25),
];
type SelectedOption = "Sales" | "Attendance" | null;

const PrivateEventTicketing = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility
    const [sumData, setSumData] = useState(0);
    const [sumSales, setSumSales] = useState(0);
    const [selected, setSelected] = useState<SelectedOption>("Sales");

    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[57px] ps-[0px] min-[993px]:ps-[92px] min-[769px]:ps-[300px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    Private Event Ticketing
                </h1>
            </div>
            <div className="flex gap-[12px] w-full">
                <div
                    className={`gradient-slate md:w-[397px] rounded-stlying px-[12px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer
                         ${selected === "Sales"
                            ? "gradient-border-rounded text-[#00A849]"
                            : ""
                        }`}
                    onClick={() => setSelected("Sales")}
                >
                    {selected === "Sales" ? (
                        <Image
                            src={salegreen}
                            className="pb-[8px] hidden md:block"
                            alt="Green Ticket"
                        />
                    ) : (
                        <Image
                            src={sale}
                            className="pb-[8px] hidden md:block"
                            alt="Default Ticket"
                        />
                    )}
                    <p>Sales</p>
                </div>
                <div
                    className={`gradient-slate md:w-[397px] rounded-stlying px-[12px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer 
                        ${selected === "Attendance"
                            ? "gradient-border-rounded text-[#00A849]"
                            : ""
                        }`}
                    onClick={() => setSelected("Attendance")}
                >
                    {selected === "Attendance" ? (
                        <Image
                            src={calendercheckgreen}
                            className="pb-[8px] hidden md:block"
                            alt="Green Collectibles"
                        />
                    ) : (
                        <Image
                            src={calendercheck}
                            className="pb-[8px] hidden md:block"
                            alt="Default Collectibles"
                        />
                    )}
                    <p>Attendance</p>
                </div>
            </div>
            {selected === "Sales" ? (<div>
                <div className='w-full mb-[24px] flex flex-col gap-[16px] gradient-slate xl:w-[610px] gradient-border p-[16px] rounded-[12px]'>
                    <div className='flex justify-between lg:items-center items-start wallet-div-content w-full'>
                        <p className='text-[#8F8F8F] text-sm font-normal '>Name of Ticket Type</p>
                        <p className='text-[#D9D9D9] text-base font-bold'>Private meeting of Founders</p>
                    </div>
                    <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                        <p className='text-[#8F8F8F] text-sm font-normal '>Start Date/Time</p>
                        <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                    </div>
                    <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                        <p className='text-[#8F8F8F] text-sm font-normal '>End Date/Time</p>
                        <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                    </div>

                </div>
                <div className="gradient-slate border xl:w-[900px] rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
                    <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
                        <div>
                            <p className="lg:text-[14px] text-[#D9D9D9] font-normal">
                                Tickets Sold <br />
                                <span className="text-[#00D059] text-[32px] font-bold pt-[2px]">
                                    {/* {eventSales?.salesData?.data?.totalSold} */}
                                    330
                                    {/* £{totalSales || 0} */}
                                </span>
                            </p>
                        </div>
                        <div>
                            <Image src={filter} alt="img" />
                        </div>
                    </div>
                    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                        <Table
                            sx={{
                                minWidth: 650,
                                borderBottom: "none",
                                borderTop: "1px solid #292929",
                                borderLeft: "none",
                                borderRight: "none",
                                // padding: "20px 100px 22px 30px",
                                color: "white",
                                background: "#0F0F0F",
                                // color: "white",
                                fontSize: 16,
                                fontweight: 500,
                            }}
                            aria-label="simple table"
                        >
                            <TableHead className="table-gradient">
                                <TableRow sx={{ border: "1px solid #292929" }}>
                                    <TableCell
                                        className="w-[40px] lg:w-[70px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            borderTop: "1px solid #292929",
                                        }}
                                        align="center"
                                    // width={"10%"}
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[500px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        // width={"10%"}
                                        align="left"
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            borderTop: "1px solid #292929",
                                        }}
                                    >
                                        Ticket Type
                                    </TableCell>
                                    <TableCell
                                        className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[413px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        // width={"9%"}
                                        align="left"
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            borderTop: "1px solid #292929",
                                        }}
                                    >
                                        Sold
                                    </TableCell>
                                    <TableCell
                                        className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[233px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        // width={"9%"}
                                        align="left"
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            borderTop: "1px solid #292929",
                                        }}
                                    >
                                        Percentage
                                    </TableCell>
                                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody className="border-0">
                                {rows.map((rows: any, index: any) => (
                                    <TableRow
                                        key={rows.type}
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
                                            }}
                                            align="center"
                                            component="th"
                                            scope="row"
                                            className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                        // className="d-flex gap-3 align-items-center "
                                        >
                                            {rows.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                padding: "20px",
                                                color: "white",
                                            }}
                                            className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                            align="left"
                                        >
                                            {rows.calories}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                padding: "20px",
                                                color: "white",
                                            }}
                                            className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                            align="left"
                                        >
                                            {rows.fat}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                borderRight: "none",
                                                padding: "16px",
                                                color: "white",
                                            }}
                                            className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                            align="left"
                                        >
                                            {/* {rows?.scanCount && rows?.userCount ? ((rows.scanCount / rows.userCount) * 100).toFixed(2) : 0}% */}
                                            {rows.carbs}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button className='text-[#030303] mt-[24px] text-sm font-extrabold pt-[13px] mb-[40px] sm:w-fit w-full pb-[11px] px-[31.5px]'>
                    Download CSV
                </Button>
                <div className='w-full mb-[24px] flex flex-col gap-[16px] gradient-slate lg:w-[610px] gradient-border p-[16px] rounded-[12px]'>
                    <div className='flex justify-between lg:items-center items-start wallet-div-content w-full'>
                        <p className='text-[#8F8F8F] text-sm font-normal '>Name of Ticket Type</p>
                        <p className='text-[#D9D9D9] text-base font-bold'>Private meeting of Founders</p>
                    </div>
                    <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                        <p className='text-[#8F8F8F] text-sm font-normal '>Start Date/Time</p>
                        <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                    </div>
                    <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                        <p className='text-[#8F8F8F] text-sm font-normal '>End Date/Time</p>
                        <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                    </div>

                </div>
                <div className=" gradient-slate xl:w-[900px] border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
                    <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
                        <div>
                            <p className="lg:text-[14px] text-[#D9D9D9] font-normal">
                                Tickets Sold <br />
                                <span className="text-[#00D059] text-[32px] font-bold pt-[2px]">
                                    330
                                </span>
                            </p>
                        </div>
                        <div>
                            <Image src={filter} alt="img" />
                        </div>
                    </div>
                    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                        <Table
                            sx={{
                                minWidth: 650,
                                borderBottom: "none",
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none",
                                // padding: "20px 100px 22px 30px",
                                color: "white",
                                background: "#0F0F0F",
                                // color: "white",
                                fontSize: 16,
                                fontweight: 500,
                            }}
                            aria-label="simple table"
                        >
                            <TableHead className="table-gradient">
                                <TableRow sx={{ border: "none" }}>
                                    <TableCell
                                        className="w-[40px] lg:w-[70px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            fontFamily: "var(--font-base)",
                                            borderTop: "none",
                                            borderTopLeftRadius: "8px",
                                            borderBottomLeftRadius: '8px',
                                        }}
                                        align="center"
                                    // width={"10%"}
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[500px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        // width={"10%"}
                                        align="left"
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            borderTop: "1px solid #292929",
                                        }}
                                    >
                                        Ticket Type
                                    </TableCell>
                                    <TableCell
                                        className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[413px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        // width={"9%"}
                                        align="left"
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            borderTop: "1px solid #292929",
                                        }}
                                    >
                                        Sold
                                    </TableCell>
                                    <TableCell
                                        className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[233px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                        // width={"9%"}
                                        align="left"
                                        sx={{
                                            color: "#A6A6A6",
                                            borderBottom: "none",
                                            fontFamily: "var(--font-base)",
                                            borderTop: "none",
                                            borderTopRightRadius: "8px",
                                            borderBottomRightRadius: '8px',
                                        }}
                                    >
                                        Percentage
                                    </TableCell>
                                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody className="border-0">
                                {rows.map((rows: any, index: any) => (
                                    <TableRow
                                        key={rows.type}
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
                                            }}
                                            align="center"
                                            component="th"
                                            scope="row"
                                            className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                        // className="d-flex gap-3 align-items-center "
                                        >
                                            {rows.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                padding: "20px",
                                                color: "white",
                                            }}
                                            className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                            align="left"
                                        >
                                            {rows.calories}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                padding: "20px",
                                                color: "white",
                                            }}
                                            className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                            align="left"
                                        >
                                            {rows.fat}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: "none",
                                                borderRight: "none",
                                                padding: "16px",
                                                color: "white",
                                            }}
                                            className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                                            align="left"
                                        >
                                            {/* {rows?.scanCount && rows?.userCount ? ((rows.scanCount / rows.userCount) * 100).toFixed(2) : 0}% */}
                                            {rows.carbs}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button className='text-[#030303] mt-[24px] text-sm font-extrabold pt-[13px] mb-[40px] sm:w-fit w-full pb-[11px] px-[31.5px]'>
                    Download CSV
                </Button>
            </div>) : (
                <>
                    <div>
                        <div className='w-full mb-[24px] flex flex-col gap-[16px] gradient-slate lg:w-[610px] gradient-border p-[16px] rounded-[12px]'>
                            <div className='flex justify-between lg:items-center items-start wallet-div-content w-full'>
                                <p className='text-[#8F8F8F] text-sm font-normal '>Name of Ticket Type</p>
                                <p className='text-[#D9D9D9] text-base font-bold'>Private meeting of Founders</p>
                            </div>
                            <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                                <p className='text-[#8F8F8F] text-sm font-normal '>Start Date/Time</p>
                                <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                            </div>
                            <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                                <p className='text-[#8F8F8F] text-sm font-normal '>End Date/Time</p>
                                <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                            </div>

                        </div>
                        <div>
                            <TableContainer component={Paper} className='xl:w-[900px]' sx={{
                                boxShadow: "none", background: "transparent",
                                overflow: "auto",
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
                                <Table
                                    sx={{
                                        minWidth: 650,
                                        borderBottom: "none",
                                        // borderTop: "1px solid #292929",
                                        borderLeft: "none",
                                        borderRight: "none",
                                        fontFamily: "var(--font-base)",
                                        color: "white",
                                        // background: "#0F0F0F",
                                        fontSize: 16,
                                        fontweight: 500,

                                    }}
                                    aria-label="simple table"
                                >
                                    <TableHead className="table-gradient-new gradient-slate" >
                                        <TableRow sx={{ border: "none" }} className=' gradient-slate'>
                                            <TableCell
                                                className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[160px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                                align="left"
                                                sx={{
                                                    color: "#A6A6A6",
                                                borderBottom: "none",
                                                fontFamily: "var(--font-base)",
                                                borderTop: "none",
                                                borderTopLeftRadius: "8px",
                                                borderBottomLeftRadius: '8px',
                                                }}
                                            >
                                                Name
                                            </TableCell>
                                            <TableCell
                                                className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[201px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                                align="left"
                                                sx={{
                                                    color: "#A6A6A6",
                                                    borderBottom: "none",
                                                    fontFamily: "var(--font-base)",
                                                    borderTop: "none",
                                                }}
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[130px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                                align="left"
                                                sx={{
                                                    color: "#A6A6A6",
                                                borderBottom: "none",
                                                fontFamily: "var(--font-base)",
                                                borderTop: "none",
                                                borderTopRightRadius: "8px",
                                                borderBottomRightRadius: '8px',
                                                }}
                                            >
                                                Scanned Time
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
                                    <TableBody className="border-0 gradient-slate">
                                        {analytics.map((row, rowIndex) => (
                                            <TableRow
                                                key={row.username}
                                                sx={{
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                    borderBottom: "none",
                                                    fontFamily: "var(--font-base)",
                                                    padding: "20px",
                                                }}
                                                className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                            >
                                                {/* <TableCell
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
                                            align="left"
                                            component="th"
                                            scope="row"
                                            className=" text-[white] text-[10px] font-normal lg:text-sm"
                                        >
                                            {row.ticket}
                                        </TableCell> */}
                                                <TableCell
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
                                                    align="left"
                                                    component="th"
                                                    scope="row"
                                                    className=" text-[white] text-[10px] font-normal lg:text-sm"
                                                >
                                                    {row.username}
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
                                                    className=" text-[white] text-[10px] font-normal lg:text-sm"
                                                >
                                                    {row.email}
                                                </TableCell>
                                                <TableCell
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
                                                    className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                                    align="left"
                                                >
                                                    {row.scantime}
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button className='text-[#030303] text-sm font-extrabold pt-[13px] mt-[24px] mb-[40px] sm:w-fit w-full pb-[11px] px-[31.5px]'>
                                Download CSV
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className='w-full flex mb-[24px] flex-col gap-[16px] gradient-slate lg:w-[610px] gradient-border p-[16px] rounded-[12px]'>
                            <div className='flex justify-between lg:items-center items-start wallet-div-content w-full'>
                                <p className='text-[#8F8F8F] text-sm font-normal '>Name of Ticket Type</p>
                                <p className='text-[#D9D9D9] text-base font-bold'>Private meeting of Founders</p>
                            </div>
                            <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                                <p className='text-[#8F8F8F] text-sm font-normal '>Start Date/Time</p>
                                <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                            </div>
                            <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                                <p className='text-[#8F8F8F] text-sm font-normal '>End Date/Time</p>
                                <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                            </div>

                        </div>
                        <div>
                            <TableContainer component={Paper} className='xl:w-[900px]' sx={{
                                boxShadow: "none", background: "transparent",
                                overflow: "auto",
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
                                <Table
                                    sx={{
                                        minWidth: 650,
                                        borderBottom: "none",
                                        // borderTop: "1px solid #292929",
                                        borderLeft: "none",
                                        borderRight: "none",
                                        fontFamily: "var(--font-base)",
                                        color: "white",
                                        // background: "#0F0F0F",
                                        fontSize: 16,
                                        fontweight: 500,

                                    }}
                                    aria-label="simple table"
                                >
                                    <TableHead className="table-gradient-new gradient-slate" >
                                        <TableRow sx={{ border: "none" }} className=' gradient-slate'>
                                            <TableCell
                                                className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[160px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                                align="left"
                                                sx={{
                                                    color: "#A6A6A6",
                                                    borderBottom: "none",
                                                    fontFamily: "var(--font-base)",
                                                    borderTop: "none",
                                                    borderTopLeftRadius: "8px",
                                                    borderBottomLeftRadius: '8px',
                                                }}
                                            >
                                                Name
                                            </TableCell>
                                            <TableCell
                                                className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[201px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                                align="left"
                                                sx={{
                                                    color: "#A6A6A6",
                                                    borderBottom: "none",
                                                    fontFamily: "var(--font-base)",
                                                    borderTop: "none",
                                                }}
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[130px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                                align="left"
                                                sx={{
                                                    color: "#A6A6A6",
                                                    borderBottom: "none",
                                                    fontFamily: "var(--font-base)",
                                                    borderTop: "none",
                                                    borderTopRightRadius: "8px",
                                                    borderBottomRightRadius: '8px',
                                                }}
                                            >
                                                Scanned Time
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
                                    <TableBody className="border-0 gradient-slate">
                                        {analytics.map((row, rowIndex) => (
                                            <TableRow
                                                key={row.username}
                                                sx={{
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                    borderBottom: "none",
                                                    fontFamily: "var(--font-base)",
                                                    padding: "20px",
                                                }}
                                                className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                            >
                                                {/* <TableCell
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
                                            align="left"
                                            component="th"
                                            scope="row"
                                            className=" text-[white] text-[10px] font-normal lg:text-sm"
                                        >
                                            {row.ticket}
                                        </TableCell> */}
                                                <TableCell
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
                                                    align="left"
                                                    component="th"
                                                    scope="row"
                                                    className=" text-[white] text-[10px] font-normal lg:text-sm"
                                                >
                                                    {row.username}
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
                                                    className=" text-[white] text-[10px] font-normal lg:text-sm"
                                                >
                                                    {row.email}
                                                </TableCell>
                                                <TableCell
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
                                                    className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                                    align="left"
                                                >
                                                    {row.scantime}
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button className='text-[#030303] text-sm font-extrabold pt-[13px] mt-[24px] mb-[40px] sm:w-fit w-full pb-[11px] px-[31.5px]'>
                                Download CSV
                            </Button>
                        </div>
                    </div>
                </> 
            )}
        </div>
    )
}
export default PrivateEventTicketing