"use client";
import React from "react";
import LunchModal from "./LunchModal";
import { useState } from "react";

function LunchEvent() 
{
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const LunchModalhandler = () => {
    setisCreateModalOpen(true);
  };

  return (
    <div className="w-full flex justify-center flex-col items-center h-[90vh] md:h-[88vh] lg:h-[91%] mt-[45px] bg-lunchevent-img">
      <p className="font-extrabold text-[30px] text-center lg:text-[64px]">
        Let’s launch your event
      </p>
      <div
        className="flex justify-center items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]"
        onClick={LunchModalhandler}
      >
        <p className="text-[#00D059] text-sm font-extrabold">Let’s Create</p>
      </div>
      {isCreateModalOpen && (
        <LunchModal
          onClose={() => setisCreateModalOpen(false)}
          open={() => setisCreateModalOpen(true)}
        />
      )}
    </div>
  );
}

export default LunchEvent;