"use client";

import * as React from "react";
import Image from "next/image";
import { ScaleReveal } from "@/components/animations/ScaleReveal";
import coverEventImage from "@/assets/card2.svg";
import Link from "next/link";
import { getEventsByUID } from "@/lib/middleware/organizer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import ScreenLoader from "@/components/loader/Screenloader";
import rocket from "@/assets/Wallet/rocket-empty.svg";
import { useRouter } from "next/navigation";
import Pagination from "@/components/reusable-components/pagination/Pagination";
import { Button } from "@/components/ui/button";

const GetPaid = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);

    const data = {
      page: 1,
      userId: userid,
    };
    dispatch(getEventsByUID(data));
  }, []);
  const EventsData = useAppSelector(
    (state) => state?.getEventsByUID?.myEvents?.data
  );
  console.log("my events data", EventsData);
  const userLoading = useAppSelector((state) => state?.getEventsByUID);

  const handlePageChange = (page: number) => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    const data = {
      page: page,
      userId: userid,
    };

    dispatch(getEventsByUID(data));
  };
  return (
    <div className="w-full md:w-[70%] px-[24px] md:px-[0px] mb-[120px] lg:px-[114px] xl:ps-[114px] xl:pe-[200px] md:mx-auto lg:w-full mt-[38px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[auto]">
      {userLoading.loading && <ScreenLoader />}

      <h3 className=" font-bold lg:text-[48px] ms-[20px] lg:ms-[0px] mb-[24px] lg:mb-[32px] text-[32px]">
        Get Paid
      </h3>
      {EventsData?.data?.events?.length > 0 ? (
        <>
          <div className="relative sm:grid flex flex-col sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-[100%] gap-[12px] lg:gap-[20px]">
            {EventsData?.data?.events?.length > 0 &&
              EventsData?.data?.events?.map((event: any, index: any) => (
                <ScaleReveal extraStyle="w-full" key={index}>
                  <Link href={`/fund-rised/${event?.id}`} className="w-full">
                    <div className="relative overflow-hidden rounded-lg w-full h-full xl:w-full  g:w-[288px] lg:h-[288px] xl:h-fit border border-[#424242]">
                      <Image
                        src={event?.coverEventImage}
                        width={288}
                        height={288}
                        className=" xl:h-[400px] w-full h-[345px] xl:w-full  g:w-[288px] sm:h-[288px] lg:h-[288px] xl:h-fit rounded-lg object-cover relative mx-auto overflow-hidden"
                        alt="event-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
                        <p className="font-bold text-white text-xl">
                          {" "}
                          {event?.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScaleReveal>
              ))}
          </div>

          <div className="container p-0 w-full">
            <Pagination
              currentPage={EventsData?.data?.currentPage}
              totalPages={EventsData?.data?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px] w-full">
          <p className="text-[16px] text-extrabold">You have no events</p>
          <Button
            className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto "
            onClick={() => router.push("/organizer-event/launch-event")}
          >
            <Image src={rocket} alt="rocket" />
            Host Event
          </Button>
        </div>
      )}
    </div>
  );
};
export default GetPaid;
