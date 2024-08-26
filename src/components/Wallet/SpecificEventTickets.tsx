"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Backbtn from "@/assets/Wallet/Back - Button.svg";
import { Badge } from "@/components/ui/badge";
import rhsimg from "@/assets/Wallet/Tickets.svg";

export default function SpecificEventTickets() {
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat  "
    >
      {/* Container for back button and title */}
      <div className="flex items-center gap-[16px] ">
        <Image src={Backbtn} alt="back" />
        <p>NAITRAM Launch Party 2024</p>
      </div>
      
      {/* Main content container */}
      <div className="flex items-start mt-4">
        <div className="flex gap-[0.35rem]">
          <Badge className="lg:text-[12px]">Party</Badge>
          <Badge className="lg:text-[12px]">Invitation</Badge>
          <Badge className="lg:text-[12px]">TAKEOVR</Badge>
        </div>

        <div>
          <Image src={rhsimg} alt="rhs" />
        </div>
      </div>
    </section>
  );
}
