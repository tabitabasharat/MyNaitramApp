"use client";
import React from "react";
import backward from "@/assets/Back - Button.svg";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import { useEffect, useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import rocket from "@/assets/Wallet/rocket-empty.svg";

import { getwallethistory } from "@/lib/middleware/wallet";

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject cannot be empty." }),
});

function History() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userid = localStorage.getItem("_id");
      console.log("user id ", userid);
      dispatch(getwallethistory(userid));
    }
  }, []);
  const myHistory = useAppSelector(
    (state) => state?.getWalletHistory?.myWalletHistory?.data
  );

  console.log("my wallet history is", myHistory);

  const groupByMonth = (history: any) => {
    const grouped: any = {};

    history.forEach((item: any) => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleString("default", {
        year: "numeric",
        month: "long",
      });

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(item);
    });

    return grouped;
  };

  const groupedHistory = myHistory?.history
    ? groupByMonth(myHistory.history)
    : {};
  console.log("my history is", groupedHistory);
  return (
    <div>
      <section className="min-h-screen bg-cover bg-no-repeat bg-reward">
        <div className="lg:pt-[134px] lg:pb-[116px] w-full xl:w-[80%] pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
          <div className="flex gap-[16px] mb-[25px] md:mb-[32px] items-center ">
            <button onClick={() => router.back()}>
              <Image
                src={backward}
                alt="backward-btn"
                className="md:w-[44px] md:h-[44px] h-[28px] w-[28px]"
              />
            </button>
            <h3 className="font-extrabold text-[20px] lg:text-[24px] ">
              History
            </h3>
          </div>
          {myHistory?.history?.length > 0 ? (
            myHistory.history.map((item: any, index: number) => {
              // Extract day, month, and year from the date string
              const date = new Date(item.date);
              const day = date.getDate();
              const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });
              const fullDate = `${day} ${monthYear}`; // Format: "1 September 2024"

              return (
                <div key={index} className="mb-[28px] lg:mb-[40px]">
                  <p className="font-bold text-sm mb-[10px] md:mb-[8px] md:text-base text-[#E6E6E6]">
                    {fullDate}
                  </p>

                  <div className="flex gap-[12px] flex-col">
                    <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px]">
                      <p className="text-base md:text-8 font-extrabold">
                        {item.amount} MRT
                      </p>
                      <p className="text-[#8F8F8F] text-[12px] font-normal">
                        {item.type}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px] w-full">
              <p className="text-[16px] text-extrabold">There's no History</p>
              <button
                className="text-[16px] font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto"
                onClick={() => router.push("/wallet")}
              >
                <Image src={rocket} alt="add-icon" />
                See What's On
              </button>
            </div>
          )}


          {/* {myHistory?.history?.length > 0 ? (
            Object.entries(groupedHistory)?.map(([monthYear, entries]: any) => (
              <div key={monthYear}>
                <p className="font-bold text-sm mb-[10px] md:mb-[8px] md:text-base text-[#E6E6E6]">
                  {monthYear}
                </p>
                <div className="flex gap-[12px] mb-[28px] lg:mb-[40px] flex-col">
                  {entries.map((item: any, index: any) => (
                    <div
                      className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px]"
                      key={index}
                    >
                      <p className="text-base md:text-8 font-extrabold">
                        {item.amount} MRT
                      </p>
                      <p className="text-[#8F8F8F] text-[12px] font-normal">
                        {item.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px] w-full">
              <p className="text-[16px] text-extrabold">There's no History</p>
              <button
                className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto "
                onClick={() => router.push("/wallet")}
              >
                <Image src={rocket} alt="add-icon" />
                See What's On
              </button>
            </div>
          )} */}

          {/* <div className="flex gap-[12px] mb-[28px] lg:mb-[40px] flex-col">
            {filteredHistory?.length > 0 &&
              filteredHistory?.map((item: any, index: any) => {
                return(
                <div
                  className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] "
                  key={index}
                >
                  <p className="text-base md:text-8 font-extrabold">
                    {item?.amount} MRT
                  </p>
                  <p className="text-[#8F8F8F] text-[12px] font-normal">
                    {item?.type}
                  </p>
                </div>
                )
              })}
          </div> */}
          {/* <p className="font-bold text-sm mb-[10px] md:mb-[8px] md:text-base text-[#E6E6E6]">
            July 2024
          </p>
          <div className="flex gap-[12px] mb-[28px] lg:mb-[40px] flex-col">
            <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] ">
              <p className="text-base md:text-8 font-extrabold">500 MRT</p>
              <p className="text-[#8F8F8F] text-[12px] font-normal">
                From login
              </p>
            </div>
            <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] ">
              <p className="text-base md:text-8 font-extrabold">300 MRT</p>
              <p className="text-[#8F8F8F] text-[12px] font-normal">
                From buying
              </p>
            </div>
            <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] ">
              <p className="text-base md:text-8 font-extrabold">100 MRT</p>
              <p className="text-[#8F8F8F] text-[12px] font-normal">
                From ticketing
              </p>
            </div>
          </div>
          <p className="font-bold text-sm mb-[10px] md:mb-[8px] md:text-base text-[#E6E6E6]">
            July 2024
          </p>
          <div className="flex gap-[12px] mb-[28px] lg:mb-[40px] flex-col">
            <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] ">
              <p className="text-base md:text-8 font-extrabold">500 MRT</p>
              <p className="text-[#8F8F8F] text-[12px] font-normal">
                From login
              </p>
            </div>
            <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] ">
              <p className="text-base md:text-8 font-extrabold">300 MRT</p>
              <p className="text-[#8F8F8F] text-[12px] font-normal">
                From buying
              </p>
            </div>
            <div className="gradient-slate rounded-[8px] py-[24px] px-[38px] lg:px-[24px] lg:pt-[24px] lg:pb-[32px] ">
              <p className="text-base md:text-8 font-extrabold">100 MRT</p>
              <p className="text-[#8F8F8F] text-[12px] font-normal">
                From ticketing
              </p>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default History;
