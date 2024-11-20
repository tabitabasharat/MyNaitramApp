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
    ticket: string,
    name: string,
    calories: string,
    fat: number,
    carbs: string,
    protein: number,
    Revenue: number,
) {
    return { ticket, name, calories, fat, carbs, protein, Revenue };
}

const rows = [
    createData('Ticket 1', "John Williams", "william@gmail.com", 1234567890, "xyz", 134, 1825.1),
    createData('Ticket 1', "John Williams", "william@gmail.com", 1234567890, "xyz", 134, 1825.1),
    createData('Ticket 1', "John Williams", "william@gmail.com", 1234567890, "xyz", 134, 1825.1),
    createData('Ticket 1', "John Williams", "william@gmail.com", 1234567890, "xyz", 134, 1825.1),
    createData('Ticket 1', "John Williams", "william@gmail.com", 1234567890, "xyz", 134, 1825.1),
    createData('Ticket 1', "John Williams", "william@gmail.com", 1234567890, "xyz", 134, 1825.1),
];

const Rsvpticketing = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(''); // State for selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to control dropdown visibility
    const [sumData, setSumData] = useState(0);
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
        <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[73px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
            <div>
                <h1 className="text-[24px] ps-[20px] sm:ps-[0px]  md:text-[32px] font-extrabold">
                    RSVP Ticketing
                </h1>
            </div>
            <div>
                <TableContainer component={Paper} sx={{ boxShadow: "none", background: "transparent" }}>
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
                            <TableRow sx={{ border: "none" }}>
                                <TableCell
                                    className="w-[80px] lg:w-[160px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
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
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[130px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                                    align="left"
                                    sx={{
                                        color: "#A6A6A6",
                                        borderBottom: "none",
                                        fontFamily: "var(--font-base)",
                                        borderTop: "none",
                                    }}
                                >
                                    Additional
                                </TableCell>
                                <TableCell
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[110px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
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
                                    className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[110px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
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
                            {rows.map((row,rowIndex ) => (
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
                                        className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                                        align="left"
                                    >
                                        £{row.Revenue}
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
                                <TableCell colSpan={5} align="right" className='gradient-slate' sx={{ border: "none", fontWeight: "bold", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px" }}>

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
            </div>
        </div>
    )
}
export default Rsvpticketing