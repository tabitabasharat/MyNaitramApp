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
function createData(
    name: string,
    calories: string,
    fat: number,
    carbs: string,
    protein: string,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("John Williams", "william@gmail.com", 1234567890, "xyz", "xyz"),
    createData("John Williams", "william@gmail.com", 1234567890, "xyz", "xyz"),
    createData("John Williams", "william@gmail.com", 1234567890, "xyz", "xyz"),
    createData("John Williams", "william@gmail.com", 1234567890, "xyz", "xyz"),
    createData("John Williams", "william@gmail.com", 1234567890, "xyz", "xyz"),
    createData("John Williams", "william@gmail.com", 1234567890, "xyz", "xyz"),
];

const Rsvpticketing = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility
    const [sumData, setSumData] = useState(0);
    const [sumSales, setSumSales] = useState(0);

    const options = ['Event 1', 'Event 2', 'Event 3']; // Dropdown options

    const handleSelect = (option: string) => {
        setSelectedEvent(option); // Set the selected option
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[73px] min-[993px]:ps-[92px] min-[769px]:ps-[300px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    RSVP Ticketing
                </h1>
            </div>
            <div className='w-full flex flex-col gap-[16px] gradient-slate lg:w-[610px] gradient-border p-[16px] rounded-[12px]'>
                <div className='flex justify-between lg:items-center items-start wallet-div-content w-full'>
                    <p className='text-[#8F8F8F] text-sm font-normal '>Name of Ticket Type</p>
                    <p className='text-[#D9D9D9] text-base font-bold'>Birthday Party RSVP</p>
                </div>
                <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                    <p className='text-[#8F8F8F] text-sm font-normal '>RSVP Deadline</p>
                    <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                </div>
                <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                    <p className='text-[#8F8F8F] text-sm font-normal '>RSVP Capacity</p>
                    <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                </div>

            </div>
            <div>
                <TableContainer component={Paper} className=' xl:w-[900px]' sx={{
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
                                        borderTop: "none",
                                        fontFamily: "var(--font-base)",
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
                                    }}
                                >
                                    Phone
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[170px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "none",
                                    }}
                                >
                                    Additional Field
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[170px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "none",
                                    }}
                                >
                                    Additional Field 2
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
                                        {row.name}
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
                                        {row.calories}
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
                                        {row.fat}
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
                                        {row.carbs}
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
                                        {row.protein}
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
            <div className='w-full flex flex-col gap-[16px] gradient-slate lg:w-[610px] gradient-border p-[16px] rounded-[12px]'>
                <div className='flex justify-between lg:items-center items-start wallet-div-content w-full'>
                    <p className='text-[#8F8F8F] text-sm font-normal '>Name of Ticket Type</p>
                    <p className='text-[#D9D9D9] text-base font-bold'>Birthday Party RSVP</p>
                </div>
                <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                    <p className='text-[#8F8F8F] text-sm font-normal '>RSVP Deadline</p>
                    <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                </div>
                <div className='flex justify-between lg:items-center items-start wallet-div-content w-full '>
                    <p className='text-[#8F8F8F] text-sm font-normal '>RSVP Capacity</p>
                    <p className='text-[#D9D9D9] text-base font-bold'>5th March, 2024 - 5 PM </p>
                </div>

            </div>
            <div>
                <TableContainer component={Paper}
                    className='xl:w-[900px]' sx={{
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
                                        borderTop: "none",
                                        fontFamily: "var(--font-base)",
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
                                    }}
                                >
                                    Phone
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[170px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "none",
                                    }}
                                >
                                    Additional Field
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[170px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "none",
                                    }}
                                >
                                    Additional Field 2
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
                                        {row.name}
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
                                        {row.calories}
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
                                        {row.fat}
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
                                        {row.carbs}
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
                                        {row.protein}
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
    )
}
export default Rsvpticketing