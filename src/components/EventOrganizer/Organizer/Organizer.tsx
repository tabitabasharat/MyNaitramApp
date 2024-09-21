"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import GradientBorder from "../ui/gradient-border";
import GradientBorder from "@/components/ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ScreenLoader from "@/components/loader/Screenloader";
import { getOrganizerDetail } from "@/lib/middleware/organizer";
import { useRouter } from "next/navigation";

const Organizer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);

    dispatch(getOrganizerDetail(userid));
  }, []);

  const myOrgData = useAppSelector(
    (state) => state?.getOrgDetail?.orgDetail?.data?.data
  );

  console.log("my Profilee is", myOrgData);

  const userLoading = useAppSelector((state) => state?.getOrgDetail);

  return (
    <div className="w-full mb-[230px] lg:mb-[0px]  xl:ps-[147.5px] md:px-auto lg:w-full lg:mx-0 md:h-[90vh] lg:h-fit px-[24px]">
      {userLoading?.loading && <ScreenLoader />}
      <div>
        <div className="flex mt-[44px] md:mt-[49px] flex-col  gap-[30px] md:gap-[36px] justify-center items-start lg:mt-[90px]">
          <div className="flex flex-col justify-center lg:mx-0 md:gap-[32px] gap-[32px] w-fit">
            <h2 className="font-extrabold text-[20px] lg:ms-[0px] ms-[24px] lg:text-[32px]">
              Organiser Dashboard
            </h2>
          </div>
          <div className="lg:w-auto xl:w-auto w-full">
            <div className="flex flex-col lg:flex-row md-flex-row gap-[32px]">
              <div className="flex justify-center w-full items-center">
                <GradientBorder className="rounded-full p-[3px] w-fit">
                  <div className="bg-black rounded-full p-[6px]">
                    <Image
                      src={
                        myOrgData?.userDetails?.organizerProfile?.profilePicture
                          ? myOrgData?.userDetails?.organizerProfile
                              ?.profilePicture
                          : "/person3.jpg"
                      }
                      width={216}
                      height={216}
                      className=" w-[156px] h-[156px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(1200, 1800)
                      )}`}
                      alt="DP"
                    />
                  </div>
                </GradientBorder>
              </div>
              <div className="flex flex-col lg:items-start items-center lg:justify-start justify-center ">
                <h2 className="text-[28px] font-extrabold text-center lg:text-start xl:text-start  leading-[31.36px] mb-[0px] lg:mb-[9px] ">
                  {myOrgData?.userDetails?.fullName}
                </h2>
                <p className="md:mb-[24px] pt-[24px] pb-[20px] lg:py-[0px] font-bold text-[#FFFFFF80] text-sm lg:font-normal">
                  {myOrgData?.userDetails?.email}
                </p>
                <div
                  style={{
                    background:
                      "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                  }}
                  className="flex bg-[#0F0F0F] rounded-[6.89px] flex-wrap gap-[0px] sm:gap-[20px] md:gap-[20px] lg:gap-[20px] justify-evenly  py-[16px] px-[0px] lg:px-[19.37px] lg:py-[13.77px] w-[100%] lg:w-[428px] xl:w-[428px] border-[0.86px] border-transparent"
                >
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer "
                    onClick={() => {
                      router.push("/management");
                    }}
                  >
                    <h2
                      className="font-normal md:text-[20px] text-[24px] mb-0 cursor-pointer"
                      onClick={() => {
                        router.push("/management");
                      }}
                    >
                      {myOrgData?.pagination?.totalEvents !== null
                        ? myOrgData?.pagination?.totalEvents
                        : "0"}
                    </h2>
                    <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
                      EVENTS
                    </p>
                  </div>
                  <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
                  <div className="flex flex-col items-center justify-center ">
                    <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
                      {myOrgData?.totalAttendees !== null
                        ? myOrgData?.totalAttendees
                        : "0"}
                    </h2>
                    <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
                      ATTENDEES
                    </p>
                  </div>
                  <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
                  <div className="flex flex-col items-center justify-center ">
                    <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
                      {myOrgData?.totalFollowers !== null
                        ? myOrgData?.totalFollowers
                        : "0"}
                    </h2>
                    <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
                      FOLLOWERS
                    </p>
                  </div>
                  <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
                  <div className="flex flex-col items-center justify-center ">
                    <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
                    £{myOrgData?.totalSales !== null
                        ? myOrgData?.totalSales
                        : "0"}
                    </h2>
                    <p className="text-[#A6A6A6] md:text-[8px] text-[10px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
                      SALES
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizer;
