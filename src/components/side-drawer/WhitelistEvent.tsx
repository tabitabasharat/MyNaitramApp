'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
import Image from "next/image"
import { useState, useEffect } from 'react';
import sale from "@/assets/V2assets/whitesale.svg";
import calendercheck from "@/assets/Calender Check.svg";
import calendercheckgreen from "@/assets/Calender Checkgreen.svg";
import salegreen from "@/assets/V2assets/greensale.svg";
import { Button } from '../ui/button';
function createData(
    ticket: string,
    name: number,
    calories: number,
    protein: number,
    Revenue: number,
) {
    return { ticket, name, calories, protein, Revenue };
}

const rows = [
    createData('Ticket 1', 950.6, 1, 134, 1825.1),
    createData('Ticket 1', 950.6, 1, 134, 1825.1),
    createData('Ticket 1', 950.6, 1, 134, 1825.1),
    createData('Ticket 1', 950.6, 1, 134, 1825.1),
    createData('Ticket 1', 950.6, 1, 134, 1825.1),
    createData('Ticket 1', 950.6, 1, 134, 1825.1),
];
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
    createData2("John Williams", "william@gmail.com", "05:00:11"),
    createData2("John Williams", "william@gmail.com", "05:00:11"),
];

type SelectedOption = "Sales" | "Attendance" | null;

const WhitelistEvent = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility
    const [sumData, setSumData] = useState(0);
    const [selected, setSelected] = useState<SelectedOption>("Sales");
    const [sumSales, setSumSales] = useState(0);

    useEffect(() => {
        const totalsalePrice = rows.reduce((sum, row) => sum + row.protein, 0);
        setSumSales(totalsalePrice);
    }, [])

    useEffect(() => {
        const totalPrice = rows.reduce((sum, row) => sum + row.Revenue, 0.0);
        setSumData(totalPrice);
    }, [])

    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[57px] min-[993px]:ps-[92px] min-[769px]:ps-[300px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    Whitelist / Waitlist Event Ticketing
                </h1>
            </div>
            <div className="flex gap-[12px] w-full">
                <div
                    className={`gradient-slate rounded-stlying px-[12px]  md:w-[397px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer
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
                    className={`gradient-slate rounded-stlying md:w-[397px] w-full px-[12px] flex md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer 
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
            <div>
                {selected === "Sales" ? (
                    <div>
                        <div>
                        <TableContainer component={Paper} 
                        className='w-full xl:w-[900px]' sx={{
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
                            <Table
                                sx={{
                                    minWidth: 650,
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
                                <TableHead className="table-gradient-new gradient-slate" >
                                    <TableRow sx={{ borderTop: "none", }} className='gradient-slate'>
                                        <TableCell
                                            className="w-[40px] lg:w-[200px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                            sx={{
                                                color: "#A6A6A6",
                                                borderBottom: "none",
                                                fontFamily: "var(--font-base)",
                                                border: "none",
                                                borderTop: "none",
                                                borderTopLeftRadius: "8px",
                                                borderBottomLeftRadius: '8px',

                                            }}
                                            align="left"
                                        >
                                            Ticket Name
                                        </TableCell>
                                        <TableCell
                                            className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[200px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                            align="left"
                                            sx={{
                                                color: "#A6A6A6",
                                                borderBottom: "none",
                                                borderTop: "none",
                                                fontFamily: "var(--font-base)",
                                            }}
                                        >
                                            Price
                                        </TableCell>
                                        <TableCell
                                            className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[200px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                            align="left"
                                            sx={{
                                                color: "#A6A6A6",
                                                borderBottom: "none",
                                                fontFamily: "var(--font-base)",
                                                borderTop: "none",
                                            }}
                                        >
                                            Whitelist Limit
                                        </TableCell>
                                        <TableCell
                                            className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[200px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
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
                                            className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[200px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
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
                                <TableBody className="border-0 gradient-slate">
                                    {rows.map((row, rowIndex) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                                borderBottom: "none",
                                                fontFamily: "var(--font-base)",
                                                padding: "20px",
                                            }}
                                            className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                        >
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
                                                {row.ticket}
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
                                                className=" text-[white] text-[10px] font-normal lg:text-sm"
                                            >
                                                £{row.name}
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
                                                className="text-[white] text-[10px] font-normal lg:text-sm"
                                            >
                                                {row.calories}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: "none",
                                                    padding: "20px",
                                                    fontFamily: "var(--font-base)",
                                                    color: "white",
                                                }}
                                                className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                                align="left"
                                            >
                                                {row.protein}
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
                                                className="text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                                align="left"
                                            >
                                                £ {row.Revenue}
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
                                    }>
                                        <TableCell colSpan={3} align="right" className='gradient-slate' sx={{ border: "none", fontWeight: "bold", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px" }}>

                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "400", fontFamily: "var(--font-base)", border: "none", }} className='gradient-slate text-[#A6A6A6]'>
                                            {sumSales.toFixed(2)}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "400", fontFamily: "var(--font-base)", border: "none", borderBottomRightRadius: "8px", borderTopRightRadius: "8px" }} className='gradient-slate text-[#A6A6A6]'>
                                            £{sumData.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <Button className='text-[#030303] text-sm font-extrabold pt-[13px] mt-[24px] mb-[40px] sm:w-fit w-full pb-[11px] px-[31.5px]'>
                            Download CSV
                        </Button>
                        </div>
                    </div>
                ) : (
                    <>
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
                    </>
                )}

            </div>
        </div>
    )
}
export default WhitelistEvent