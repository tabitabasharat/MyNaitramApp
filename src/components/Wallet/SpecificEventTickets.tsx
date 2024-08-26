"use client";
import React from "react";
import Image from "next/image";
import Backbtn from "@/assets/Wallet/Back - Button.svg";
import { Badge } from "@/components/ui/badge";
import rhsimg from "@/assets/Wallet/Tickets.svg";
import location from "../../assets/Location.svg";
import candendar from "../../assets/calendar1.svg";
import time from "../../assets/clock1.svg";
import stall from "../../assets/stall1.svg";
import food from "../../assets/dob1.svg";
import vip from "../../assets/crown1.svg";
import security from "../../assets/security.svg";
import info from "../../assets/Info.svg";
import qrcode from "../../assets/QR Code.svg"
import blockchain from "../../assets/blockchain-icon 1.svg"
import Link from "next/link";

interface Location {
  id: number;
  address: string;
  image: any;
}
interface Ticket {
  id: number;
  address: string;
  image: any;
}

const Ticket: Ticket[] = [
  {
    id: 1,
    image: stall,
    address: "Merchandise Stalls",
  },
  { id: 2, image: food, address: "Food and Beverages" },
  { id: 3, image: vip, address: "VIP Lounge" },
  { id: 4, image: security, address: "Security and First Aid" },
];

const locations: Location[] = [
  {
    id: 1,
    image: location,

    address: "DOMA PUB Main floor, Light Street, London",
  },
  { id: 2, image: candendar, address: "Saturday, 5th March 2024" },
  { id: 3, image: time, address: "5 PM - 12 AM" },
];

export default function SpecificEventTickets() {
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat"
    >
      <div className="max-w-screen-lg px-[24px] lg:gap-[0px]   mx-auto text-center lg:text-left">
        {/* Container for back button and title */}
        <div className="flex justify-start items-center lg:gap-[16px] gap-[12px] mb-8">
          <Image
            src={Backbtn}
            alt="back"
            className="w-[28px] h-[28px] lg:w-[44px] lg:h-[44px]"
          />
          <p className="text-[20px] lg:text-[24px] font-bold">
            NAITRAM Launch Party 2024
          </p>
        </div>
        {/* Main content container */}
        <div className="flex flex-col-reverse gap-[62px] lg:items-start items-center lg:flex-row">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row items-center  lg:items-start gap-[16px]">
              <div className="flex w-full gap-[8px] mb-[12px] mt-[11px] lg:mt-[0px] lg:mb-0">
                <Badge className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]">
                  Party
                </Badge>
                <Badge className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]">
                  Invitation
                </Badge>
                <Badge className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]">
                  TAKEOVR
                </Badge>
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-start pb-[12px] lg:pb-[24px] text-[32px] lg:text-[48px]">
                PIZDEZ Women’s Day Party 2024
              </h2>
              <div className="flex flex-col justify-center">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center mb-[12px] gap-[8px]"
                  >
                    <Image
                      src={location.image}
                      width={30}
                      height={30}
                      // className=" "
                      alt="Location Icon"
                    />
                    <p className="font-bold text-start text-[16px]">
                      {location.address}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-start text-[20px] lg:pt-[24px] pt-[16px] pb-[12px]">
                  Included in this ticket type
                </h3>
                {Ticket.map((Ticket) => (
                  <div key={Ticket.id} className="flex items-center mb-[12px]">
                    <Image
                      src={Ticket.image}
                      width={30}
                      height={30}
                      alt="Location Icon"
                      className=" me-[8px]"
                    />
                    <p className="font-bold text-start text-[16px]">
                      {Ticket.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-ticket-img sm:w-[408px] md:w-[408px] lg:w-[408px] w-full rounded-[12px] pt-[12px] px-[20px] pb-[2px]">
            <div className="flex justify-end">
              <Image src={info} alt="img" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image src={qrcode} alt="img"/>
              <Link href="/wallet/specific-ticket">
              <button className="font-extrabold text-sm rounded-[100px] mb-[24px] mt-[16px] p-[10px] bg-[#00D059] text-black">Enlarge Code</button>
              </Link>
            </div>
            <div>
              <h2 className="font-normal text-sm pb-[4px]">Event Name</h2>
              <h3 className="font-extrabold text-base pb-[20px] border-b border-dashed border-[#00D059]">NAITRAM Launch Party 2024</h3>
            </div>
            <div className="pt-[24px]">
              <h2 className="font-normal text-sm pb-[4px]">Event Name</h2>
              <h3 className="font-extrabold text-base pb-[24px] border-b border-dashed border-[#00D059]">NAITRAM Launch Party 2024</h3>
            </div>
            <div className=" flex justify-between rounded-[8px] my-[24px] p-[12px] items-center bg-[#007A35]">
              <div>
              <h2 className="font-normal text-sm">Transaction ID</h2>
              <h3 className="font-bold text-base ">NAITRAM Launch Party 2024</h3>
              </div>
              <div>
                <Image src={blockchain} alt="img"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
