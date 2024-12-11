// Aysha

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import image1 from "@/assets/image28.svg";
import heart from "@/assets/heart.svg";
import eye from "@/assets/eye.svg";
import img from "@/assets/Img.svg";
import location from "@/assets/location-1.svg";
import calendar from "@/assets/calendar1.svg";
import v2Calender from "../../../public/Images/Nft_animakid_img/clendr.svg";
import clock from "@/assets/clock-1.svg";
import { Button } from "../ui/button";
import ticketType from "@/assets/ticketType.svg";
import arrowDown from "@/assets/Vector@3x.svg";
import priceHistory from "@/assets/bx_stats.svg";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { color } from "framer-motion";
import listing from "@/assets/tag.svg";
import itemActivity from "@/assets/arrowItem.svg";
import "./NftDetails.css";
import MakeOfferModal from "./makeOfferModal";

const data = [
  { name: "April 12, 2024", value: 1.6 },
  { name: "April 12, 2024", value: 0.8 },
  { name: "April 12, 2024", value: 1.6 },
  { name: "April 12, 2024", value: 0 },
  { name: "April 12, 2024", value: 1.6 },
  { name: "April 12, 2024", value: 1.6 },
  { name: "April 12, 2024", value: 1.6 },
  { name: "April 12, 2024", value: 0.8 },
  // Add more data if needed
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white">
        <p>{`Volume: ${payload[0].value} ETH`}</p>
      </div>
    );
  }
  return null;
};
interface VisibleSections {
  [key: string]: boolean;
}
const NftDetails = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Price History");

  const [visibleSections, setVisibleSections] = useState<VisibleSections>({
    section2: false,
    section3: false,

  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["Price History", "Listings", "Item Activity"];
  const rows = [
    { event: "Transfer", price: "<0.0001 ETH", from: "BB9117", to: "BB9117", date: "7h Ago" },
    { event: "Transfer", price: "<0.0001 ETH", from: "BB9117", to: "BB9117", date: "7h Ago" },
    { event: "Transfer", price: "<0.0001 ETH", from: "BB9117", to: "BB9117", date: "7h Ago" },
  ];
  const toggleSection = (section: string) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section], // Toggle visibility of the specific section
    }));
  };


  const handleOpen = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };


  const handleBuyNowClick = () => {
    router.push("/marketPlace/nft/buy-now");
  };
  return (
    <div className="relative overflow-hidden">
      <section className=" pt-[173px] pb-[236px]  main pl-[92px] pr-[97px]">
        <div className="flex gap-[50px] xl:gap-[80px]">
          <div className="flex flex-col w-full lg:w-[40%] min-[1500px]:w-[593px] rightDive">
            <div className=" image w-full ">
              <Image className="img w-full rounded-[8px]  " src={image1} alt="/" />
            </div>
            <div className="flex flex-row gap-[25px]">
              <div className="flex gap-[10px] pt-[32px] items-center">
                <Image src={eye} alt="Eye" />
                <p className="font-[700] text-[14px] leading-[16.8px]">44 Views</p>
              </div>
              <div className="flex gap-[10px] pt-[32px] items-center">
                <Image src={heart} alt="heart" />
                <p className="font-[700] text-[14px] leading-[16.8px]">3 Favorites</p>
              </div>
            </div>
            <div className="pt-[50px] flex flex-col ">
              <p className="pb-[16px] font-[800] text-[24px] leading-[28.8px]">Event Detail</p>
              <div className="doma items-center flex gap-[8px] mb-[12px]">
                <Image src={location} alt="Location" />
                <p className="font-[700] text-[16px] leading-[24px]">DOMA PUB Main floor, Light Street, London</p>
              </div>
              <div className=" saturday  items-center flex gap-[8px] mb-[12px]">
                <Image src={v2Calender} alt="Calendar" />
                <p className=" font-[700] text-[16px] leading-[24px]">Saturday, 5th March 2024 - Sunday, 6th March 2024</p>
              </div>
              <div className="items-center flex gap-[8px]">
                <Image src={clock} alt="clock" />
                <p className="font-[700] text-[16px] leading-[24px]">5 PM - 12 AM</p>
              </div>
            </div>
            <div className="pt-[30px]">
              <p className="font-[800] text-[24px] leading-[28.8px] pb-[16px] ">Ticket Types</p>
              <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[8px] items-center">
                  <Image src={ticketType} alt="ticketType" />
                  <p className="font-[700] text-[16px] leading-[24px] ">Custom Ticket</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px] sm:gap-[32px] wid min-[1500px]:w-[671px]">
            <p className="font-[800] text-[48px] leading-[57.6px] fasty ">A Fasty Brush Flower Arts</p>
            <div className="flex flex-col gap-[12px] sm:gap-[16px]">
              <p className="font-[800] text-[24px] leading-[28.8px] description ">Description</p>
              <p className="font-[400] text-[16px] mb-[8px] sm:mb-[0px] leading-[19.2px] para">
                Join us for the PIZDEZ Women’s Day Party 2024, an unforgettable celebration of women's achievements and empowerment! Enjoy an
                electrifying night filled with live music, dancing, and entertainment.{" "}
              </p>
            </div>
            <div className="hidden  hiddenclass">
              <div className="w-full flex justify-center">
                <Image className="w-[500px] rounded-[8px] hiddenPicture" src={image1} alt="/" />
              </div>
              <div className="flex flex-row mt-[16px] sm:mt-[32px] gap-[25px]">
                <div className="flex gap-[10px] ">
                  <Image src={eye} alt="Eye" />
                  <p className="font-[800] text-[14px] leading-[16.8px] ">44 Views</p>
                </div>
                <div className="flex gap-[10px]">
                  <Image src={heart} alt="heart" />
                  <p className="font-[800] text-[14px] leading-[16.8px] ">3 Favorites</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-[38px] sm:mt-[0px] gap-[8px]">
              <p className="text-customGreen font-[700] text-[13px] leading-[16.25px] tickett">Ticket Type</p>
              <p className="font-[800] text-[24px] leading-[27.6px] festivals ">Festivals / Multi-Day Tickets </p>
            </div>
            <div className="customizeDiv my-[38px] sm:my-[0px] flex gap-[32px]">
              <div
                className="rounded-[8px]  bg-[linear-gradient(360deg,_#0F0F0F_72%,_#1A1A1A_100%)] flex flex-col gap-[8px] px-[40.5px] py-[8px] customizeButton"
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)",
                 
                }}
              >
                <p className="current  font-[400] text-[16px] leading-[19.2px] ">Current Price</p>
                <p className="text-customGreen">
                  <span className="number1 text-[20px] font-[700] leading-[20px]">0.10195</span>
                  <span className="eth text-[14px] font-[700] leading-[14px]">ETH</span>
                </p>
              </div>
              {/* <div
                className="rounded-[8px] bg-[linear-gradient(360deg,_#0F0F0F_72%,_#1A1A1A_100%)] flex flex-col gap-[8px] px-[40.5px] py-[8px] customizeButton"
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)",
                  borderImageSlice: 1, 
                }}
              >
                <p className="current  font-[400] text-[16px] leading-[19.2px] ">Count Down</p>
                <p className="number1 text-customGreen text-[20px] font-[700] leading-[20px]">11 : 22 : 33</p>
              </div> */}
            </div>
            <div className="flex gap-[14.92px]">
              <Image className="rounded-full" src={img} alt="Profile" />
              <div className="flex flex-col justify-center">
                <p className="owner text-[#BFBFBF] font-[400] text-[14px] leading-[16.8px]">Owner</p>
                <p className="silentBlue font-[700] text-[16px] leading-[28px]">@silent-blue</p>
              </div>
            </div>
            <div className="flex flex-col gap-[40px]">
              <div className="buttonsrounded flex mt-[20px] sm:mt-[0px] gap-[32px]">
                <Button
                 onClick={handleOpen}
                  size="lg"
                  className="buttonrounded h-[59px]  w-[290px]  font-[800] text-[16px] leading-[22.4px] flex items-center ready-btn   px-[110.5px] py-[19.5px] "
                >
                  Buy Now
                </Button>

                <Button
                   onClick={handleBuyNowClick}
                  style={{ border: "none" }}
                  variant="outline"
                  size="lg"
                  className="buttonrounded h-[59px]  w-[290px] flex items-center transition duration-300 ease-in-out hover:bg-transparent hover:text-customGreen bg-none relative ready-btn px-[102.5px] py-[19.5px] text-customGreen font-[800] text-[16px] leading-[22.4px] gradient-border-edit hover:filter  hover:brightness-[0.7]"
                >
                  Create an offer
                </Button>
                {isModalOpen && (
                  <MakeOfferModal open={isModalOpen} onClose={handleClose} />
                )}
              </div>
              <div className="sm:pt-[50px] flex flex-col hidden  hiddenEventDetail">
                <p className="eventDetail pb-[20px] sm:pb-[16px] font-[800] text-[24px] leading-[28.8px]">Event Detail</p>
                <div className="items-start flex gap-[8px] mb-[8px] sm:mb-[12px]">
                  <Image src={location} alt="Location" />
                  <p className="eventPoint font-[700] text-[16px] leading-[24px]">DOMA PUB Main floor, Light Street, London</p>
                </div>
                <div className="items-start flex gap-[8px] mb-[8px] sm:mb-[12px]">
                  <Image src={v2Calender} alt="Calendar" />
                  <p className="eventPoint font-[700] text-[16px] leading-[16px]">Saturday, 5th March 2024 - Sunday, 6th March 2024</p>
                </div>
                <div className="items-start flex gap-[8px]">
                  <Image src={clock} alt="clock" />
                  <p className="eventPoint font-[700] text-[16px] leading-[24px]">5 PM - 12 AM</p>
                </div>
              </div>
              <div className="hidden  hidenTicketType">
                <p className="ticket1 font-[800] text-[24px] leading-[28.8px] pb-[20px] pt-[10px] sm:pt-[0px] sm:pb-[16px] ">Ticket Types</p>
                <div className="flex flex-col gap-[12px]">
                  <div className="flex gap-[8px] items-center">
                    <Image src={ticketType} alt="ticketType" />
                    <p className="ticketpoint font-[700] text-[16px] leading-[24px] ">Custom Ticket</p>
                  </div>
                  {/* <div className="flex gap-[8px] items-center">
                    <Image src={ticketType} alt="ticketType" />
                    <p className=" ticketpoint font-[700] text-[16px] leading-[24px] ">Festivals / Multi-Day Tickets </p>
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <Image src={ticketType} alt="ticketType" />
                    <p className="ticketpoint font-[700] text-[16px] leading-[24px] ">RSVP Ticketing </p>
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <Image src={ticketType} alt="ticketType" />
                    <p className="ticketpoint font-[700] text-[16px] leading-[24px] ">Private Event Ticketing </p>
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <Image src={ticketType} alt="ticketType" />
                    <p className="ticketpoint font-[700] text-[16px] leading-[24px] ">Passworded / Discounted Voucher Event </p>
                  </div> */}
                  {/* <div className="flex gap-[8px] items-center">
                    <Image src={ticketType} alt="ticketType" />
                    <p className="ticketpoint font-[700] text-[16px] leading-[24px] ">Whitelist / Waitlist Event Ticketing </p>
                  </div> */}
                </div>
              </div>
              <div style={{visibility: "visible"}} className="block">

                <div style={{visibility: "visible"}} className="block mb-[20px] flex justify-start">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`Tab text-[16px] leading-[23.2px] w-[140px] pb-[7px] border-b-[2px]  ${activeTab === tab ? "text-customGreen font-[700]" : "text-white font-[400]"
                        } hover:text-green-500 focus:outline-none`}
                      style={{
                        borderBottomColor: activeTab === tab ? "rgba(0, 168, 73, 1)" : "rgba(41, 41, 41, 1)",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "Price History" ? (
                  <div
                  className="w-fit Graph1"
                    style={{
                    
                      position: "relative",
                      background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                      borderRadius: "8px",
                      color: "white",
                      overflow: "hidden",
                    
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "8px",
                        background: "transparent",
                        border: "1.41px solid transparent",
                        borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)", // Apply gradient border
                        borderImageSlice: 1, // Ensure the gradient is applied
                        zIndex: -1,
                      }}
                    ></div>

                    <div
                      className="upperdiv w-[671px] sm:my-[0px] max-[1150px]:w-[100%]  flex justify-between items-center px-[24px] py-[14.4px] sm:py-[28px]"
                      style={{ borderBottom: "1.41px solid rgba(41, 41, 41, 0.5)" }}
                    >
                      <div className="flex gap-[15px]">
                        <Image className="arrowImage" src={priceHistory} alt="Price History" />
                        <p className="Listings">Price History</p>
                      </div>
                      <div className="text-gray-500" onClick={() => toggleSection("section1")}>
                        <Image
                          className={`arrowImage transform transition-all duration-300 ${visibleSections.section1 ? "rotate-180" : "rotate-0"
                            }`}
                          src={arrowDown}
                          alt="arrow"
                        />
                      </div>
                    </div>

                    {visibleSections.section1 && (
                      <ResponsiveContainer width="100%" height={200} style={{ paddingLeft: "0px", paddingRight: "0px", paddingBottom:"20px", paddingTop: "36px" }}>
                        <BarChart  style={{ color: "rgba(0, 208, 89, 1)" }} width={400} data={data} margin={{ top: 20, bottom: 20 }}>
                         

                          {/* Cartesian grid */}
                          <CartesianGrid stroke="#444" vertical={false} />

                          {/* X-axis */}
                          <XAxis dataKey="name" tickLine={false} tick={{
                              fill: "rgba(180, 180, 183, 1)", // Change tick text color here
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          label={{
                        
                          
                            style: {
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "red", // Change label color here
                            },
                          }}
                           />

                          {/* Left Y-axis without stroke */}
                          <YAxis
                            yAxisId="left"
                            // tick={{ fill: "#BFBFBF" }}
                            ticks={[0, 0.8, 1.6]}
                            tick={{
                              fill: "rgba(180, 180, 183, 1)", // Change tick text color here
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                            axisLine={false}                       
                            tickLine={false}
                            label={{
                              style: {
                                fontSize: "16px",
                                fontWeight: "700",
                                lineHeight: "16px",
                                color: "rgba(255, 255, 255, 1)",
                              },
                              dx: -46,
                              value: "Volume (ETH)",
                              angle: -90,
                              position: "outside-center",
                              fill: "white",
                            }}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            ticks={[-1, 1, 3]}
                            tick={{
                              fill: "rgba(180, 180, 183, 1)", // Change tick text color here
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                            axisLine={false} 
                            tickLine={false}
                            label={{
                              style: {
                                fontSize: "16px",
                                fontWeight: "700",
                                lineHeight: "16px",
                                color: "rgba(255, 255, 255, 1)",
                              },
                              dx: 46,
                              value: "Average Price (ETH)",
                              angle: 90,
                              position: "outside-center",
                              fill: "white",
                            }}
                          />

                          {/* Tooltip */}
                          <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />

                          {/* Bar data */}
                        
                          <Bar dataKey="value"  fill="rgba(0, 208, 89, 1)" yAxisId="left" radius={[5, 5, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                     )} 
                  </div>
                ) : activeTab === "Listings" ? (
                  <div
                       className="w-fit Graph1"
                    style={{
                    
                      position: "relative",
                      background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                      borderRadius: "8px",
                      color: "white",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "8px",
                        background: "transparent",
                        border: "1.41px solid transparent",
                        borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)", // Apply gradient border
                        borderImageSlice: 1, // Ensure the gradient is applied
                        zIndex: -1,
                      }}
                    ></div>

                    <div className="upperdiv   w-[671px] max-[1150px]:w-[100%]  flex justify-between items-center px-[24px] sm:py-[28px]">
                      <div className="flex gap-[15px] ">
                        <Image className="arrowImage" src={listing} alt="Listings" />
                        <p className="Listings">listings</p>
                      </div>
                      <div className="text-gray-500" onClick={() => toggleSection("section2")}>
                        <Image
                          className={`arrowImage transform transition-all duration-300 ${visibleSections.section2 ? "rotate-180" : "rotate-0"
                            }`}
                          src={arrowDown}
                          alt="arrow"
                        />
                      </div>
                    </div>
                    {visibleSections.section2 && (
                      <div>
                        <TableContainer
                          sx={{
                            background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                            borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))",
                            borderImageSlice: 1,
                            color: "white",
                          }}
                        
                        >
                          <Table>
                            <TableHead>
                              <TableRow className="table1Row" sx={{ borderTop: "1.41px solid  #29292980" }}>
                                <TableCell
                                  className="TableHeader"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                                >
                                  Price
                                </TableCell>
                                <TableCell
                                  className="TableHeader"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                                >
                                  USD Price
                                </TableCell>
                                <TableCell
                                  className="TableHeader"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none",  borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                                >
                                  Quantity
                                </TableCell>
                                <TableCell
                                  className="TableHeader"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                                >
                                  Expiration
                                </TableCell>
                                <TableCell
                                  className="hidecol"
                                  sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                                ></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow sx={{borderBottom:"none"}}>
                                <TableCell className="tableRow"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}>
                                  0.00001 ETH
                                </TableCell>
                                <TableCell className="tableRow"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none", textDecoration:"underline", textUnderlineOffset: "3px",borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}>
                                  $0.30
                                </TableCell>
                                <TableCell className="tableRow"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none", textDecoration:"underline", textUnderlineOffset: "3px",borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}>
                                  1
                                </TableCell>
                                <TableCell className="tableRow"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}>
                                  In 6 Months
                                </TableCell>
                                <TableCell
                                  className="latertobeHide"
                                  style={{ fontFamily: "var(--font-base)", }}
                                  sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}
                                >
                                  <Button className="w-[73px] h-[32px] size-lg px-[27px] rounded-[100px]">Buy</Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Button className="latertobeDis h-[27px] w-[47px] hidden size-lg  px-[14px] py-[10px] rounded-[51.42px] mt-[12.99px] ml-[10.8px] mb-[14px]">
                          Buy
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                     className="w-fit Graph1"
                    style={{
                      position: "relative",
                      background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                      borderRadius: "8px",
                      color: "white",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "8px",
                        background: "transparent",
                        border: "1.41px solid transparent",
                        borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)", // Apply gradient border
                        borderImageSlice: 1, // Ensure the gradient is applied
                        zIndex: -1,
                      }}
                    ></div>

                    <div className="upperdiv w-[671px] max-[1150px]:w-[100%] flex justify-between items-center px-[24px] sm:py-[28px]">
                      <div className="flex gap-[15px]">
                        <Image className="arrowImage" src={itemActivity} alt="Item Activity" />
                        <p className="Listings">Item Activity</p>
                      </div>
                      <div className="text-gray-500" onClick={() => toggleSection("section3")}>
                        <Image
                          className={`arrowImage transform transition-all duration-300 ${visibleSections.section3 ? "rotate-180" : "rotate-0"
                            }`}
                          src={arrowDown}
                          alt="arrow"
                        />
                      </div>
                    </div>
                    {visibleSections.section3 && (
                      <TableContainer
                        sx={{
                          background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",

                          borderImageSource: "linear-gradient(360deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))",
                          borderImageSlice: 1,
                          color: "white",
                        }}
                        component={Paper}
                      >
                        <Table>
                          <TableHead>
                            <TableRow className="table1Row" sx={{ borderTop: "1.41px solid  #29292980" }}>
                              <TableCell
                                style={{ fontFamily: "var(--font-base)", }}
                                className="Table2Header"
                                sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                              >
                                Event
                              </TableCell>
                              <TableCell
                                style={{ fontFamily: "var(--font-base)", }}
                                className="Table2Header"
                                sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                              >
                                Price
                              </TableCell>
                              <TableCell
                                className="Table2Header"
                                style={{ fontFamily: "var(--font-base)", }}
                                sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                              >
                                From
                              </TableCell>
                              <TableCell
                                className="Table2Header"
                                style={{ fontFamily: "var(--font-base)", }}
                                sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                              >
                                To
                              </TableCell>
                              <TableCell
                                className="Table2Header"
                                style={{ fontFamily: "var(--font-base)", }}
                                sx={{ borderBottom: "none", borderTop: "1.41px solid  #29292980", color: "#BFBFBF" }}
                              >
                                Date
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell
                                  className="tableRow2"
                                  style={{ fontFamily: "var(--font-base)", font: '18px !important', fontWeight: '700 !important', lineHeight: '18px !important' }}
                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}
                                >
                                  {row.event}
                                </TableCell>
                                <TableCell
                                  className="tableRow2"
                                  style={{ fontFamily: "var(--font-base)" }}
                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}
                                >
                                  {row.price}
                                </TableCell>
                                <TableCell
                                  className="tableRow2"
                                  style={{ fontFamily: "var(--font-base)" }}
                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}
                                >
                                  {row.from}
                                </TableCell>
                                <TableCell
                                  className="tableRow2"
                                  style={{ fontFamily: "var(--font-base)" }}
                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}
                                >
                                  {row.to}
                                </TableCell>
                                <TableCell
                                  className="tableRow2"
                                  style={{ fontFamily: "var(--font-base)" }}

                                  sx={{ borderBottom: "none",textDecoration:"underline", textUnderlineOffset: "3px", borderTop: "1.41px solid  #29292980", color: "#FFFFFF" }}
                                >
                                  {row.date}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                     )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </section>
      <div className="absolute right-[1px] bottom-[-26%] w-[57%] h-[40%] bg-[#00D059] blur-[275px] rounded-[30%] -z-10 max-[992px]:hidden">
      </div>


    </div>
  );
};

export default NftDetails;
