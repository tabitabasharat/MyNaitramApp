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
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";
import ReceviePaymentModal from "./ReceivePaymentModal";

function createData(name: number, calories: string, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData(1, "Tickets Sold", 100000),
  createData(2, "Platform Fees", 10000),
  createData(3, "Payout Available", 90000),
];

const FUndRised = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  return (
    <div className="pt-[120px] pb-[59.12px] lg:pb-[26.25px] px-[24px] event-bg-effect lg:px-[100px] xl:px-[216px] md:pt-[132px] mx-auto">
      {/* {eventSales.loading && <ScreenLoader />} */}
      <div className="mb-[12px] lg:w-[903px] w-full lg:mb-[24px]">
        <Backward />
      </div>
      <div className="gap-[32px] lg:w-[903px] w-full mb-[24px] lg:mb-[30px] flex lg:flex-row flex-col lg:gap-[42px]">
        <div className="flex md:w-[392px] md:h-[392px] md:justify-center sm:justify-center">
          <Image
            src={cardimg}
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
            NAITRAM Launch Party 2024
          </p>
          <div className="flex items-center">
            <div className=" w-[40px] h-[40px] rounded-[8px]">
              <Image
                src={profile}
                width={40}
                height={40}
                sizes="40px"
                className="w-[40px] h-[40px] rounded-[8px]"
                alt="img"
              />
            </div>
            <div>
              <p className="ps-[8px] pe-[4px] text-sm lg:font-bold font-[900]">
                {/* {eventSales?.salesData?.data?.event?.user?.fullname} */}
                AKEMIWRLD
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
              {/* {eventSales?.salesData?.data?.event?.location} */}
              DOMA PUB Main floor, Light Street, London
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={clander}
                alt="clander"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              {/* {ConvertDate(eventSales?.salesData?.data?.event?.startTime)} */}
              Saturday, 5th March, 2024 - 5 PM
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={time}
                alt="time"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              Tuesday, 8th March, 2024 - 10 PM
              {/* {ConvertTime(eventSales?.salesData?.data?.event?.startTime)} -{" "} */}
              {/* {ConvertTime(eventSales?.salesData?.data?.event?.endTime)}{" "} */}
            </p>
          </div>
        </div>
      </div>
      {/* <SalesGraph /> */}
      <div className=" mb-[32px] mt-[32px] lg:w-[903px] w-full lg:mb-[32px] gradient-slate border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
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
              {rows.map((row, index) => (
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
                    {row.name}
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
                    {row.calories}
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
                    £{row.fat.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex mb-[32px] md:justify-end lg:w-[903px] w-full">
        <button
          onClick={() => setOpenModal(true)}
          className="text-sm w-full md:w-fit lg:text-base font-extrabold bg-[#00D059] text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px]"
        >
          Get Paid
        </button>
      </div>
      {openModal && (
        <ReceviePaymentModal
          onClose={() => setOpenModal(false)}
          open={() => setOpenModal(true)}
          eventData={eventAllData}
        />
      )}
    </div>
  );
};

export default FUndRised;
