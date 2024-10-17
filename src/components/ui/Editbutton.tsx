'use client';
import Image from "next/image";
import greenpencile from "@/assets/Pencil.svg"

function Editbutton() {
  return (
    <div className="absolute top-[133px] right-[445px]">
    <div className="flex justify-center items center  rounded-[44px]  gap-[6px] w-[151px] gradient-bg gradient-border p-[12px]">
      <Image src={greenpencile} alt="pencil"/>
      <p className="text-[#00D059] text-sm font-extrabold">Edit Image</p>
    </div>
    </div>
  );
}

export default Editbutton;
