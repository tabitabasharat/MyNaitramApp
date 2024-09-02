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
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";
import WalletChooseModal from "../Walletchoose/WalletChooseModal";
import { useState } from "react";
import location from "@/assets/Location.svg";
import clander from "@/assets/calendar1.svg";
import time from "@/assets/clock1.svg";
import { Box } from "@mui/material";

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
  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(showProfile(userid));
  }, []);

  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const WalletModalhandler = () => {
    setisCreateModalOpen(true);
    console.log("clicked");
  };
  console.log("my Profile is", myProfile);
  const userLoading = useAppSelector((state) => state?.getShowProfile);
  return (
    <div className="pt-[48px] px-[24px] lg:px-[216px] md:pt-[90px] mx-auto">
      <div className="mb-[12px] lg:mb-[24px]">
        <Backward />
      </div>
      <div className="gap-[32px] mb-[24px] lg:mb-[30px] flex xl:flex-row flex-col lg:gap-[42px]">
        <div className="">
          <Image
            src={larki}
            alt="img"
            className=" md:size-[100%] size-[100%] md:h-[100%] lg:w-[100%]"
          />
        </div>
        <div className="">
          <div
            className="bg-[#00A849] py-[8px] px-[12px] w-[124px] lg:w-[135px] rounded-[100px]"
            onClick={WalletModalhandler}
          >
            <p className="text-[#030303] text-[11px] lg:font-extrabold font-[900] lg:text-[12px]">
              FEATURED EVENT
            </p>
            {isCreateModalOpen && (
              <WalletChooseModal
                onClose={() => setisCreateModalOpen(false)}
                open={() => setisCreateModalOpen(true)}
              />
            )}
          </div>
          <p className="font-extrabold text-[32px] lg:text-[48px] mb-[12px] lg:mb-[24px] mt-[12px]">
            NAITRAM Launch Party 2024
          </p>
          <div className="flex items-center">
            <div className="border-[#D9D9D9] border border-solid w-[40px] h-[40px] rounded-[8px]">
              <Image
                src={id}
                sizes="40px"
                className="w-[40px] h-[40px]"
                alt="img"
              />
            </div>
            <div>
              <p className="ps-[8px] pe-[4px] text-sm lg:font-bold font-[900]">
                AKEMIWRLD
              </p>
            </div>
            <div>
              <Image src={tick} alt="tick" />
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
              Grand De Vere Connaught Room, WC2b 5DA
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={clander}
                alt="clander"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              Saturday, 16th March 2024
            </p>
            <p className="flex items-center text-base font-bold mb-[12px]]">
              {" "}
              <Image
                src={time}
                alt="time"
                className="pe-[8px] w-[30px] h-[30px]"
              />
              7 PM - 1 AM (Last entry 9 PM)
            </p>
          </div>
        </div>
      </div>
      <Walletbalancetable />
      <div className=" mb-[32px] lg:mb-[46px] gradient-slate border rounded-lg border-muted lg:mt-[30px] mt-[24px] px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[32px] text-[24px] font-normal lg:font-bold">
              Sales over Time
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
              color: "white",
              background: "#0F0F0F",
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
                  Users
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
              {rows.map((rows) => (
                <TableRow
                  key={rows.name}
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
                    {rows.carbs}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          background:
            "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
        }}
        className="flex bg-[#0F0F0F] rounded-[6.89px] gap-[0px] sm:gap-[20px] md:gap-[20px] lg:gap-[20px] justify-evenly  py-[16px] px-[0px] lg:px-[19.37px] lg:py-[13.77px] w-[100%] lg:w-full xl:w-full border-[0.86px] border-transparent"
      >
        <div className="flex flex-col items-center justify-center ">
          <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
            {myProfile?.attendees !== null ? myProfile?.attendees : "0"}
          </h2>
          <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
            TICKETS SOLD
          </p>
        </div>
        <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
        <div className="flex flex-col items-center justify-center ">
          <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
            {myProfile?.attendees !== null ? myProfile?.attendees : "0"}
          </h2>
          <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
            PREMIUM
          </p>
        </div>
        <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
        <div className="flex flex-col items-center justify-center ">
          <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
            {myProfile?.attendees !== null ? myProfile?.attendees : "0"}
          </h2>
          <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
            GOLD
          </p>
        </div>
        <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
        <div className="flex flex-col items-center justify-center ">
          <h2 className="font-normal md:text-[20px] text-[24px] mb-0">324</h2>
          <p className="text-[#A6A6A6] md:text-[8px] text-[10px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
            SILVER
          </p>
        </div>
      </div>
      <div className=" mb-[32px] gradient-slate border rounded-lg border-muted mt-[32px] px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[32px] text-[24px] font-normal lg:font-bold">
              Attendees Check in
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
                  Users
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
              {rows.map((rows) => (
                <TableRow
                  key={rows.name}
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
                      padding: "20px",
                      color: "white",
                    }}
                    className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rows.carbs}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className=" mb-[32px] lg:mb-[46px] gradient-slate border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
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
              {rowsticket.map((rowsticket) => (
                <TableRow
                  key={rowsticket.name}
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
                    }}
                    align="center"
                    component="th"
                    scope="row"
                    className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                    // className="d-flex gap-3 align-items-center "
                  >
                    {rowsticket.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      padding: "20px",
                    }}
                    className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rowsticket.calories}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      padding: "20px",
                    }}
                    className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rowsticket.fat}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      borderRight: "none",
                      padding: "20px",
                      color: "white",
                    }}
                    className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rowsticket.carbs}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className=" mb-[59.12px] lg:mb-[26.25px] gradient-slate border rounded-lg border-muted px-[16px] lg:px-[24px] pb-[26px] lg:pb-[24px] pt-[16px] lg:pt-[26px]">
        <div className="flex items-center mb-[17px] lg:mb-[24px] justify-between">
          <div>
            <p className="lg:text-[14px] text-[#D9D9D9] font-normal">
              Tickets Checked
              <br />
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
              </TableRow>
            </TableHead>
            <TableBody className="border-0">
              {rowsticket.map((rowsticket) => (
                <TableRow
                  key={rowsticket.name}
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
                    }}
                    align="center"
                    component="th"
                    scope="row"
                    className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                  >
                    {rowsticket.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      padding: "20px",
                    }}
                    className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rowsticket.calories}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      padding: "20px",
                    }}
                    className="bg-[#0F0F0F] text-[white] border-0 text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rowsticket.fat}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      borderRight: "none",
                      padding: "20px",
                      color: "white",
                    }}
                    className="bg-[#0F0F0F] text-[white] text-[10px] font-normal lg:text-sm"
                    align="left"
                  >
                    {rowsticket.carbs}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EventSales;
