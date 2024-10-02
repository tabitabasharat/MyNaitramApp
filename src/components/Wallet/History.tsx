"use client";
import React from "react";
import backward from "@/assets/Back - Button.svg";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import { useEffect } from "react";
import { z } from "zod";
// import { Image } from "next/image";
import Image from "next/image";
import ticket from "@/assets/Ticket2.svg";
import arrow from "@/assets/Arrow Right.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

// const formSchema = z.object({
//   subject: z.string().min(1, { message: "Subject cannot be empty." }),
// });

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject cannot be empty." }),
});

function History() {
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       subject: "",
  //     },
  //   });

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
      dispatch(getUserSocialProfile(userid));
    }
  }, []);
  const myProfile = useAppSelector(
    (state) => state?.getUserSocialProfile?.myProfile?.data
  );

  console.log("my Social Profile info is", myProfile);
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
          <p className="font-bold text-sm mb-[10px] md:mb-[8px] md:text-base text-[#E6E6E6]">
            July 2024
          </p>
          {/* <Form {...form}>
            <form
              className=" w-full md:w-[600px]"
            >
              <FormField
                name="subject"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px] space-y-0">
                    <FormLabel className="text-base md:text-8 font-extrabold absolute left-3 top-3">
                    500 MRT
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="From login "
                        className="pt-11 pb-5 placeholder:text-[#8F8F8F] placeholder:text-[12px] placeholder:font-normal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form> */}
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default History;
