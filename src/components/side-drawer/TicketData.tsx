"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { TableFooter } from "@mui/material";
import Link from "next/link";

import { getEventByEventId } from "@/lib/middleware/event";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";

interface DataRow {
  name: string;
  status: string;
  sales: string; // Fraction as a string e.g., "33/100"
  price: number;
  links: { type: string; url: string }[];
}

const TicketData = () => {
  const dispatch = useAppDispatch();

  const [sumData, setSumData] = useState<number | undefined>(0);
  const [totalSales, setSumSales] = useState<number | undefined>(0);
  const [totalRevenue, setTotalRevenue] = useState<number | undefined>(0.0);
  const [dataRows, setDataRows] = useState<DataRow[] | undefined>();
  // const [totals, setTotals] = useState({ numerator: 0, denominator: 0 });
  const [totalNumerator, setTotalNumerator] = useState<number | undefined>(0);
  const [totalDenominator, setTotalDenominator] = useState<number | undefined>(0);

  ///
  const [event, setEvent] = useState<any>({});

  const eventData = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents?.data);
  const eventLoader = useAppSelector((state) => state?.getEventByEventID?.loading);

  useEffect(() => {
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;

    if (currentUrl) {
      const url = new URL(currentUrl);
      const pathname = url.pathname;
      const parts = pathname.split("/");
      const eventId = parts[parts.length - 1];

      console.log("my event id is", eventId);
      dispatch(getEventByEventId(eventId));
    }
  }, []);

  useEffect(() => {
    console.log("This is The event data ===> ", eventData);
    setEvent(eventData);

    // Calculating total sales from tickets
    const totalSales = eventData?.tickets?.reduce((sum: number, ticket: any) => {
      return sum + (ticket?.originalNoOfTickets - ticket?.noOfTickets);
    }, 0);
    setSumSales(totalSales);

    // Calculating total revenue
    const totalRevenue = eventData?.tickets?.reduce((sumOfRevenue: number, ticket: any) => {
      const ticketPrice = ticket?.ticketPrice ?? 0;
      return sumOfRevenue + ticketPrice * (ticket?.originalNoOfTickets - ticket?.noOfTickets);
    }, 0.0);
    setTotalRevenue(totalRevenue);

    // Temporary array to accumulate data for the table
    const updatedRows: any[] = [...(dataRows || [])];

    // Getting data for the table
    eventData?.tickets?.forEach((ticket: any, index: number) => {
      // Check if ticketType already exists
      const isTicketExist = updatedRows.some((row: any) =>
        row?.links?.some((link: any) => link?.type?.trim() === ticket?.selectedEventTicketType?.trim())
      );

      if (!isTicketExist) {
        const status = ticket?.noOfTickets === "0" ? "Sold Out" : "On Sale";
        const nomiNator = ticket?.noOfTickets;
        const deNominator = ticket?.originalNoOfTickets;
        updatedRows.push({
          name: ticket?.ticketName,
          status: status,
          sales: `${nomiNator}/${deNominator}`,
          price: ticket?.ticketPrice ? ticket?.ticketPrice * (ticket?.originalNoOfTickets - ticket?.noOfTickets) : 0,
          links: [{ type: ticket?.selectedEventTicketType.trim(), url: "" }],
        });
      } else {
      }
    });

    // Update the state once after processing all rows
    setDataRows(updatedRows);

    // Calculate the sum of all numerators
    const sumNumerators: number | undefined = updatedRows.reduce((sum, row) => {
      const [numerator] = row.sales.split("/").map((value: any) => parseInt(value, 10));
      return sum + numerator;
    }, 0);

    const sumDenominators: number | undefined = updatedRows.reduce((sum, row) => {
      const [, denominator] = row.sales.split("/").map((value: any) => parseInt(value, 10));
      return sum + denominator;
    }, 0);

    setTotalNumerator(sumNumerators);
    setTotalDenominator(sumDenominators);

    // Calculate total price
    const totalPrice: number | undefined = updatedRows.reduce((sum, row) => sum + row.price, 0.0);
    setSumData(totalPrice);
  }, [eventData]); // Depend only on `eventData`

  return (
    <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[57px] ps-[0px] min-[993px]:ps-[92px] min-[769px]:ps-[300px]   md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
      {eventLoader && <ScreenLoader />}
      <>
        <div>
          <h1 className="text-[24px] ps-[20px] sm:ps-[0px] mb-[4px]  md:text-[32px] font-extrabold">{event?.name}</h1>
        </div>
        <div className="flex gap-[12px] w-full max-[425px]:flex-col">
          <div className="w-full px-[12px] lg:w-[495px] py-[16px] gradient-slate border border-[#292929] rounded-[8px]">
            <p className="text-sm">Total Sales</p>
            <h3 className="text-[#00D059] text-[30px] font-extrabold">{totalSales}</h3>
          </div>
          <div className="w-full px-[12px] lg:w-[495px] py-[16px] gradient-slate border border-[#292929] rounded-[8px]">
            <p className="text-sm">Total Revenue</p>
            <h3 className="text-[#00D059] text-[30px] font-extrabold">£{new Intl.NumberFormat("en-US").format(Number(totalRevenue))}</h3>
          </div>
        </div>
        <div>
          <h2 className="font-extrabold text-[32px] sm:mt-[18px] md:mb-[32px] mb-[24px]">Ticket Types:</h2>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              background: "transparent",
              overflow: "auto",
              maxHeight: "100%",
              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
              },
              "&::-webkit-scrollbar-thumb": {
                display: "none",
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "60px",
            }}
          >
            <Table
              className=""
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
              <TableHead className="table-gradient-new" style={{ borderBottom: "none" }}>
                <TableRow
                  sx={{
                    borderBottom: "none",
                    border: "none",
                    borderTop: "none",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                  className="gradient-slate"
                >
                  <TableCell
                    className=" lg:w-[250px] px-[16.5px] lg:px-[20px] py-[12px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                    sx={{
                      borderTop: "none",
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
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
                      borderBottomRightRadius: "8px",
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
                {dataRows?.map((row, rowIndex) => (
                  <TableRow
                    key={row.name}
                    className="text-white text-[10px] font-normal lg:text-sm"
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
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
                        ...(rowIndex === dataRows?.length - 1 && {
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
                            <a className="text-white mr-2">{links.type}</a>
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
                        ...(rowIndex === dataRows?.length - 1 && {
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
                <TableRow
                  sx={{
                    border: "none",
                  }}
                >
                  <TableCell
                    colSpan={3}
                    align="right"
                    className="gradient-slate"
                    sx={{ border: "none", fontWeight: "bold", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px" }}
                  ></TableCell>

                  <TableCell sx={{ fontWeight: "400", fontFamily: "var(--font-base)", border: "none" }} className="gradient-slate text-[#A6A6A6]">
                    <div className="flex justify-between w-1/4">
                      <span>{totalNumerator}</span>
                      <span>/</span>
                      <span>{totalDenominator}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "400",
                      fontFamily: "var(--font-base)",
                      border: "none",
                      borderBottomRightRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                    className="gradient-slate text-[#A6A6A6]"
                  >
                    £{sumData?.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </>
    </div>
  );
};
export default TicketData;
