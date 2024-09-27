"use client";
import React from "react";
import Backward from "../Backward/Backward";
import larki from "@/assets/Images.svg";
import Image from "next/image";
import id from "@/assets/Launch your event.svg";
import tick from "@/assets/tick-yello.svg";
import Walletbalancetable from "../Wallet/Wallet-balance-table/Walletbalancetable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import filter from "@/assets/Favorite - Button.svg";
import filter1 from "@/assets/Favorite - Buttonarrow.svg";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";
import WalletChooseModal from "../Walletchoose/WalletChooseModal";
import { useState } from "react";
import location from "@/assets/Location.svg";
import clander from "@/assets/calendar1.svg";
import time from "@/assets/clock1.svg";
import { Box } from "@mui/material";
import { getSalesData } from "@/lib/middleware/organizer";
import ScreenLoader from "../loader/Screenloader";
import SalesChart from "../profile-page/SalesChart";
import SalesGraph from "../Wallet/SalesGraph/SalesGraph";
import Stack from "@mui/material/Stack";

function createData(
  name: number,
  calories: string,
  fat: number,
  carbs: number
) {
  return { name, calories, fat, carbs };
}
function tickets(name: number, calories: string, fat: number, carbs: number) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData(1, "Premium", 100, 99),
  createData(2, "Gold", 80, 78),
  createData(3, "Takeovr 2024", 150, 120),
  createData(4, "Takeovr 2024", 40, 35),
];
const rowsticket = [
  tickets(1, "Premium", 100, 99),
  tickets(2, "Gold", 80, 78),
  tickets(3, "Silver", 150, 120),
];

function EventSales() {
  const dispatch = useAppDispatch();
  const [eventid, setEventid] = useState<any>();
  const eventSales = useAppSelector((state: any) => state.getSalesData);
  console.log("user sales data", eventSales);

  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const WalletModalhandler = () => {
    setisCreateModalOpen(true);
    console.log("clicked");
  };

  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    dispatch(getSalesData(value));
    console.log("my event id is", value);
  }, []);

  const ConvertDate = (originalDateStr: string): string => {
    const originalDate = new Date(originalDateStr);

    // Extract the day, date, month, and year
    const dayOfWeek = originalDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = originalDate.getDate();
    const month = originalDate.toLocaleDateString("en-US", { month: "long" });
    const year = originalDate.getFullYear();

    // Function to get ordinal suffix
    const getOrdinalSuffix = (date: number) => {
      if (date > 3 && date < 21) return "th"; // covers 11th to 19th
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const ordinalSuffix = getOrdinalSuffix(date);

    // Construct the formatted date string
    const formattedDate = `${dayOfWeek}, ${date}${ordinalSuffix} ${month} ${year}`;

    return formattedDate;
  };
  const ConvertTime = (timeStr: string): string => {
    // Ensure input is a string
    if (typeof timeStr !== "string") {
      console.error("Input must be a string");
      return "";
    }

    // Extract the time part if the input includes a date and time
    const timeOnly = timeStr.split("T")[1]?.split("Z")[0];

    if (!timeOnly) {
      console.error("Input must include a valid time");
      return "";
    }

    const parts = timeOnly.split(":");

    // Check if timeOnly is in HH:MM or HH:MM:SS format
    if (parts.length < 2) {
      console.error("Input time must be in HH:MM or HH:MM:SS format");
      return "";
    }

    const [hours, minutes] = parts.map(Number);

    // Ensure the hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      console.error("Invalid time format");
      return "";
    }

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight

    // Combine hours and period
    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;

    return formattedTime;
  };

  console.log(eventSales?.salesData?.data?.totalSold, "this is total sold");


  const ticketSales =eventSales?.salesData?.data?.ticketTypes?.map((ticket: any) => ({
    // price: ticket?.price,
    // count: ticket?.userCount,
    total: ticket?.price * ticket?.userCount,
  }));
  console.log("Individual Ticket Sales:", ticketSales);

  let totalSales = 0;
  if (ticketSales) {
    for (let i = 0; i < ticketSales.length; i++) {
      totalSales = totalSales + ticketSales[i].total;
    }
  }

  return (
    <div className="pt-[120px] pb-[59.12px] lg:pb-[26.25px] px-[24px] event-bg-effect lg:px-[100px] xl:px-[216px] md:pt-[132px] mx-auto">
      {eventSales.loading && <ScreenLoader />}
      <div className="mb-[12px] lg:mb-[24px]">
        <Backward />
      </div>
      <div className="gap-[32px] mb-[24px] lg:mb-[30px] flex lg:flex-row flex-col lg:gap-[42px]">
        <div className="flex md:justify-center sm:justify-center">
          <Image
            src={eventSales?.salesData?.data?.event?.coverEventImage}
            alt="img"
            width={392}
            height={392}
            className="rounded-[12px] w-[392px] h-[392px]"
          />
        </div>
        <div>
          <div className="bg-[#00A849] border border-solid border-[#757575] py-[8px] px-[12px] w-[124px] lg:w-[135px] rounded-[100px]">
            <p className="text-[#030303] italic text-[11px] lg:font-extrabold font-[900] lg:text-[12px]">
              FEATURED EVENT
            </p>
          </div>
          <p className="font-extrabold text-[32px] lg:text-[48px] mb-[12px] lg:mb-[24px] mt-[12px]">
            {eventSales?.salesData?.data?.event?.name}
          </p>
          <div className="flex items-center">
            <div className=" w-[40px] h-[40px] rounded-[8px]">
              <Image
                src={
                  eventSales?.salesData?.data?.event?.user?.profilePicture
                    ? eventSales?.salesData?.data?.event?.user?.profilePicture
                    : id
                }
                width={40}
                height={40}
                sizes="40px"
                className="w-[40px] h-[40px] rounded-[8px]"
                alt="img"
              />
            </div>
            <div>
              <p className="ps-[8px] pe-[4px] text-sm lg:font-bold font-[900]">
                {eventSales?.salesData?.data?.event?.user?.fullname}
              </p>
            </div>
          </div>
          <div className="mt-[16px] lg:mt-[24px]">
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={location}
                className="pe-[8px] w-[30px] h-[30px]"
                alt="location"
              />
              {eventSales?.salesData?.data?.event?.location}
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={clander}
                alt="clander"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              {ConvertDate(eventSales?.salesData?.data?.event?.startTime)}
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={time}
                alt="time"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              {ConvertTime(eventSales?.salesData?.data?.event?.startTime)} -{" "}
              {ConvertTime(eventSales?.salesData?.data?.event?.endTime)}{" "}
            </p>
          </div>
        </div>
      </div>
      <SalesGraph />
      <div className=" mb-[32px] mt-[32px] lg:mb-[32px] gradient-slate border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[14px] text-[#D9D9D9] font-normal">
              Tickets Sold <br />
              <span className="text-[#00D059] text-[32px] font-bold pt-[2px]">
                {eventSales?.salesData?.data?.totalSold}
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
              {eventSales?.salesData?.data?.ticketTypes?.map(
                (rows: any, index: any) => (
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
                      {index}
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
                      {rows?.type}
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
                      {rows?.userCount}
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
                      {rows?.scanCount && rows?.userCount
                        ? ((rows.scanCount / rows.userCount) * 100).toFixed(2)
                        : 0}
                      %
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="gradient-slate border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[14px] text-[#D9D9D9] font-normal">
              Scanned Tickets
              <br />
              <span className="text-[#00D059] text-[32px] font-bold pt-[2px]">
                {eventSales?.salesData?.data?.totaChecked}
              </span>
            </p>
          </div>
          <div>
            <Image src={filter1} alt="img" />
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
                  Scan
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
              </TableRow>
            </TableHead>
            <TableBody className="border-0">
              {eventSales?.salesData?.data?.ticketTypes?.map(
                (rows: any, index: any) => (
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
                      {index}
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
                      {rows?.type}
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
                      {rows?.userCount}
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
                      {rows?.scanCount && rows?.userCount
                        ? ((rows.scanCount / rows.userCount) * 100).toFixed(2)
                        : 0}
                      %
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className=" mb-[32px] gradient-slate border rounded-lg border-muted mt-[32px] px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[32px] text-[24px] font-normal lg:font-bold">
              Scanned Ticket Categories
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
                  Ticket Categories
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
                  Scanned
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
                  Attendees
                </TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody className="border-0">
              {eventSales?.salesData?.data?.ticketTypes?.map(
                (rows: any, index: any) => (
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
                     {index}
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
                      {rows?.type}
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
                      {rows?.userCount}
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
                      {rows?.scanCount}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EventSales;
