"use client";
import React from "react";
import Image from "next/image";
import Backbtn from "@/assets/Wallet/Back - Button.svg";
import { Badge } from "@/components/ui/badge";
import rhsimg from "@/assets/qr.svg";
import location from "@/assets/Location.svg";
import candendar from "@/assets/calendar1.svg"
import time from "@/assets/clock1.svg"
import stall from "@/assets/stall1.svg"
import food from "@/assets/dob1.svg"
import vip from "@/assets/crown1.svg"
import security from "@/assets/security.svg"
import { useRouter } from "next/navigation";

interface Location {
  id: number;
  address: string;
  image:any

}
interface Ticket {
  id: number;
  address: string;
  image:any
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

export default function Specificqrcode() {
  const router = useRouter();
  return (
    <section className="min-h-screen py-[8rem]  bg-cover bg-no-repeat px-[24px] md:px-[100px]   bg-reward  ">
      <div className="max-w-screen-lg lg:gap-[0px]  mx-auto text-center lg:text-left">
        {/* Container for back button and title */}
        <div className="flex justify-start items-center lg:gap-[16px] gap-[12px] mb-[52px] lg:mb-[34px]">
          <Image
            src={Backbtn}
            alt="back"
            onClick={() => router.back()}
            className="w-[28px] h-[28px] lg:w-[44px] lg:h-[44px]"
          />
          <p className="text-[20px] text-start lg:text-[24px] font-bold">
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
                    <p className="font-bold text-start text-[16px]">{location.address}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-start text-[20px] lg:pt-[24px] pt-[16px] pb-[12px]">Included in this ticket type</h3>
                {Ticket.map((Ticket) => (
                  <div
                    key={Ticket.id}
                    className="flex items-center mb-[12px]"
                  >
                    <Image
                      src={Ticket.image}
                      width={30}
                      height={30}
                      alt="Location Icon"
                      className=" me-[8px]"
                    />
                    <p className="font-bold text-start text-[16px]">{Ticket.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div 
          >
            <Image src={rhsimg} alt="rhs" className="pt-[0px] lg:pt-[87px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
