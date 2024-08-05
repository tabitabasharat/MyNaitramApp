"use client";

import Image from "next/image";
import "./ticket.css";
import girl from "../../assets/Images.svg";
import gift from "@/assets/gift.png";
import calender from "../../assets/Icon.svg";
import success from "../../assets/success.svg";
import { Button } from "@/components/ui/button";
import { events } from '@/lib/dummyData';
import BuyTicket from "@/components/reusable-components/BuyTicket";
import {
  DownloadSimple,
  UsersThree,
  Ticket,
  DeviceMobile,
} from "@phosphor-icons/react/dist/ssr";
import Browserexplore from "../reusable-components/Toaster/Browserexplore";
import { Link } from "lucide-react";

function TicketPurchaseSuccessPage({ setCurrentModal }: any) {
  const initalEvent = events[2];
  return (
    <>
    <Image
    style={{ filter: "blur(30px)" }}
    width={100}
    height={100}
    src={`${initalEvent.img}`}
    className="w-full h-screen absolute object-cover object-center z-0 opacity-30"
    alt=""
  />
    <div className="main-div-stlying">

      <div className="LSH-div-stlying">
        <div className="girl-img">
          <Image alt="girl" src={girl} />
        </div>
        <div className="ticket">
          <div className="ticket-purchase-div ">
            <div>
                <Image alt="success" src={success} className="success-img"/>
            </div>
            <div className="font-bold">
              <h3>Your ticket purchase is confirmed.</h3>
              <h3>We can't wait to see you there!</h3>
            </div>
          </div>
          <h3 className="text-[28px] lg:w-full lg:text-[40px] xl:text-[48px] font-extrabold leading-[1.2] py-6">
            PIZDEZ Women’s Day Party 2024
          </h3>
          <div className="flex gap-2 pb-6 items-center">
            <Image alt="alender" src={calender} />
            <p>Saturday, 5th March 2024</p>
          </div>
          <Browserexplore />
        </div>
      </div>
      <div className="flex justify-between gradient-slate border border-[#262626] mt-6 rounded-xl download-main div">
        <div className="download-App">
          <h2 className="text-2xl">Download NAITRAM App</h2>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-3">
              <UsersThree size={22} weight="fill" className="text-[#8F8F8F]" />
              <p>Keep up with the event with Live Activity Feature</p>
            </div>
            <div className="flex gap-3">
              <Ticket size={22} weight="fill" className="text-[#8F8F8F]" />
              <p>View and open your tickets easily</p>
            </div>
            <div className="flex gap-3">
              <DeviceMobile
                size={22}
                weight="fill"
                className="text-[#8F8F8F]"
              />
              <p>Browse any event anytime from your hand</p>
            </div>
          </div>
          <Button className="flex items-center gap-[0.5rem] rounded-full mt-6 p-3 w-full">
            <DownloadSimple size={20} weight="fill" />
            Download App to Unlock Features
          </Button>
        </div>
        <div>
          <Image
            src={gift}
            width={200}
            height={200}
            className=" hidden lg:block"
            alt="gift"
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default TicketPurchaseSuccessPage;
