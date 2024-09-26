"use client";
import React from "react";
import Backward from "@/components/Backward/Backward";
import larki from "@/assets/Images.svg";
import Image from "next/image";
import cardimg from "@/assets/Images.png";
import profile from "@/assets/promoter-pic.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import filter from "@/assets/Favorite - Button.svg";
import location from "@/assets/Location.svg";
import clander from "@/assets/calendar1.svg";
import time from "@/assets/clock1.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import ReceviePaymentModal from "./ReceivePaymentModal";
import { getPaidDetail } from "@/lib/middleware/payout";
import ScreenLoader from "@/components/loader/Screenloader";
function createData(name: number, calories: any, fat: number) {
  return { name, calories, fat };
}

const FUndRised = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [eventid, setEventid] = useState<any>();
  const [ticketsSoldPrice, setticketsSoldPrice] = useState<any>("");

  const eventAllData = "hello";
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    dispatch(getPaidDetail(value));
    console.log("my event id is", value);
  }, []);

  const paidDetails = useAppSelector(
    (state: any) => state.getPaidDetail?.paidData?.data
  );
  console.log("user paid data", paidDetails);
  const userLoading = useAppSelector(
    (state: any) => state.getPaidDetail?.loading
  );

  // const ticketSales = paidDetails?.ticketTypes?.map((ticket:any) => ticket?.price * ticket?.count);
  // console.log("my sales", ticketSales)
  // const totalSales = ticketSales?.reduce(
  //   (sales: any, ticket: any) => sales + ticket.total,
  //   0
  // );
  // console.log("Total Sales:", totalSales);

  const ticketSales = paidDetails?.ticketTypes?.map((ticket: any) => ({
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
  console.log("Total Saless:", totalSales);
  const platformfee = paidDetails?.event?.funds?.platformFee;
  const PayoutAmount = totalSales - platformfee;
  const rows = [
    createData(1, "Tickets Sold", totalSales || 0),
    createData(2, "Platform Fees", paidDetails?.event?.funds?.platformFee || 0),
    createData(3, "Payout Available", PayoutAmount || 0),
  ];

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

  const eventStartDate = new Date(paidDetails?.event?.startTime);
  console.log("event start date ", eventStartDate )

  const currentDate = new Date();
  console.log("today date ", currentDate)
  const isGetPaidDisabled =  currentDate >eventStartDate ;
  return (
    <div className="pt-[120px] pb-[59.12px] lg:pb-[26.25px] px-[24px] event-bg-effect lg:px-[100px] xl:px-[216px] md:pt-[132px] mx-auto">
      {userLoading.loading && <ScreenLoader />}
      <div className="mb-[12px] w-full lg:mb-[24px]">
        <Backward />
      </div>
      <div className="gap-[32px] w-full mb-[24px] lg:mb-[30px] flex lg:flex-row flex-col lg:gap-[42px]">
        <div className="flex md:w-[392px] md:h-[392px] md:justify-center sm:justify-center">
          <Image
            src={
              paidDetails?.event?.coverEventImage
                ? paidDetails?.event?.coverEventImage
                : cardimg
            }
            alt="img"
            width={392}
            height={392}
            className="h-full rounded-[12px] sm:w-[392px] w-full  sm:h-[392px]  "
          />
        </div>
        <div>
          <div className="bg-[#00A849] border border-solid border-[#757575] py-[8px] px-[12px] w-[130px] lg:w-[135px] rounded-[100px]">
            <p className="text-[#030303] italic text-[11px] lg:font-extrabold font-[900] lg:text-[12px]">
              FEATURED EVENT
            </p>
          </div>
          <p className="font-extrabold text-[32px] lg:text-[48px] mb-[12px] lg:mb-[24px] mt-[12px]">
            {paidDetails?.event?.name}
          </p>
          <div className="flex  items-center">
            <div className=" w-[40px] h-[40px] rounded-[8px]">
              <Image
                src={
                  paidDetails?.event?.user?.profilePicture
                    ? paidDetails?.event?.user?.profilePicture
                    : profile
                }
                width={40}
                height={40}
                sizes="40px"
                className="w-[40px] h-[40px] object-fit rounded-[8px]"
                alt="img"
              />
            </div>
            <div>
              <p className="ps-[8px] text-sm lg:font-bold font-[900]">
                {paidDetails?.event?.user?.fullname}
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
              {paidDetails?.event?.location}
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={clander}
                alt="clander"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              {/* {ConvertDate(eventSales?.salesData?.data?.event?.startTime)} */}
              {/* Saturday, 5th March, 2024 - 5 PM */}
              {ConvertDate(paidDetails?.event?.startTime)} -{" "}
              {ConvertTime(paidDetails?.event?.startTime)}
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={time}
                alt="time"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              {/* Tuesday, 8th March, 2024 - 10 PM */}
              {ConvertDate(paidDetails?.event?.endTime)} -{" "}
              {ConvertTime(paidDetails?.event?.endTime)}
            </p>
          </div>
        </div>
      </div>
      {/* <SalesGraph /> */}
      <div className=" mb-[32px] mt-[32px] w-full lg:mb-[32px] gradient-slate border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[14px] text-[#D9D9D9] font-normal">
              Fund Raised <br />
              <span className="text-[#00D059] text-[32px] font-bold pt-[2px]">
                £120,000
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
                  Item
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
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="border-0">
              {rows?.map((row: any, index: any) => (
                <TableRow
                  key={index}
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
                  >
                    {row?.name}
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
                    {row?.calories}
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
                    £{row?.fat}
                    {/* £{row?.fat.toLocaleString()} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex mb-[32px] md:justify-end w-full">
        <button
        disabled={isGetPaidDisabled}
          onClick={() => setOpenModal(true)}
          className="text-sm w-full md:w-fit lg:text-base font-extrabold bg-[#00D059] 
          text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px] disabled:opacity-50"
        >
          Get Paid
        </button>
      </div>
      {openModal && (
        <ReceviePaymentModal
          onClose={() => setOpenModal(false)}
          open={() => setOpenModal(true)}
          ticketSold={totalSales}
          platformFee={platformfee}
          payoutAvailable={PayoutAmount}
          eventID={eventid}
        />
      )}
    </div>
  );
};

export default FUndRised;
