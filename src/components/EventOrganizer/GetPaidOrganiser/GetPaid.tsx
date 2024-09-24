"use client";

import * as React from "react";
import Image from "next/image";
import { ScaleReveal } from "@/components/animations/ScaleReveal";
import coverEventImage from "@/assets/card2.svg";
import Link from "next/link";

const GetPaid = () => {
  const getpaid = [
    {
      id: 1,
      img: coverEventImage,
      title: "Amet est massa volutpat faucibus",
    },
    {
      id: 2,
      img: coverEventImage,
      title: "Amet est massa volutpat faucibus",
    },
    {
      id: 3,
      img: coverEventImage,
      title: "Amet est massa volutpat faucibus",
    },
    {
      id: 4,
      img: coverEventImage,
      title: "Amet est massa volutpat faucibus",
    },
    {
      id: 5,
      img: coverEventImage,
      title: "Amet est massa volutpat faucibus",
    },
  ];
  return (
    <div className="w-full md:w-[70%] px-[24px] md:px-[0px] mb-[120px] lg:px-[114px] xl:ps-[114px] xl:pe-[200px] md:mx-auto lg:w-full mt-[38px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[auto]">
      <h3 className=" font-bold lg:text-[48px] ms-[20px] lg:ms-[0px] mb-[24px] lg:mb-[32px] text-[32px]">
        Get Paid
      </h3>
      <div className="relative sm:grid flex flex-col md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-[100%] gap-[12px] lg:gap-[20px]">
        {getpaid.map(({ id, img, title }) => (
          <ScaleReveal extraStyle="w-full" key={id}>
            <Link href="/fund-rised">
              <div className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242]">
                <Image
                  src={img}
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
                  alt="event-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
                  <p className="font-bold text-white text-xl">{title}</p>
                </div>
              </div>
            </Link>
          </ScaleReveal>
        ))}
      </div>
    </div>
  );
};
export default GetPaid;
