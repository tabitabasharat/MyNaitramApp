"use client";

import { useEffect, useState } from "react";
import Backward from "../Backward/Backward";

import { useRouter } from "next/navigation";

import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import ScreenLoader from "../loader/Screenloader";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

import { getEventByEventId, stopTicketSales } from "@/lib/middleware/event"; // First Import the API function method
import { useAppDispatch, useAppSelector } from "@/lib/hooks"; // Second Import the selector and dispatch

const formSchema = z.object({
  reasontext: z.string().min(1, { message: "Please write a reason to delete" }),
});

function StopSales() {
  const EventData = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents?.data); // 5th Get data through slector from get API method imported previousely
  const isEventDataLoading = useAppSelector((state) => state?.getEventByEventID?.loading);
  const router = useRouter();
  const dispatch = useAppDispatch(); // 3rd Make dispatch Object
  const [eventID, setEventID] = useState<string>("");
  const [userID, setUserid] = useState<string>("");
  const [reasonData, setReasonDataToStop] = useState("");
  const [loader, setLoader] = useState<boolean>(isEventDataLoading); // First let the Event Data loading properly

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reasontext: "",
    },
  });

  useEffect(() => {
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventID(value);
    console.log("my event id is", value);
    dispatch(getEventByEventId(value)); // 4rd call method with a Id to get Data in dispatch module

    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID || "");
    console.log("user ID logged in is", userID);
  }, []);

  async function StopSalesMethod() {
    console.log("My EVENT DATA IS AS ===> ", EventData, "AND Event ID is as ===> ", eventID);
    if (EventData?.id.toString() === eventID) {
      const values = form.getValues();
      console.log("my values", values);
      try {
        const data = {
          eventId: parseInt(eventID, 10),
          userId: parseInt(userID, 10),
          // text: reasonData || "",
        };
        console.log("This is reason Data ====> ", data);
        dispatch(stopTicketSales(data)).then((res: any) => {
          console.log("Stop sales status ===> ", res?.payload?.status);
          if (res?.payload?.status === 200) {
            console.log("Stop Sales of ticket succesfully");
            SuccessToast(res?.message);
            router.push("/management");
          } else {
            ErrorToast(res?.payload?.body?.message);
          }
        });
      } catch (error) {
        console.error("Error:", error);
        ErrorToast(error);
        ErrorToast("Error while Creating Form");
      }
    } else {
      ErrorToast("Event not Found");
      router.push("/management");
    }
  }

  return (
    <section
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px]"
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl  w-full pt-[120px] lg:pt-[132px]  ">
        <Backward text="Stop Sales" />
        <div>
          <Form {...form}>
            <form className=" w-full">
              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="reasontext"
                  render={({ field }) => (
                    <FormItem className="relative w-full md:w-[65%] space-y-0">
                      {/* text-[16px] font-extrabold leading-[19.2px] text-left underline decoration-skip-ink-none */}
                      <FormLabel className="text-[16px] font-extrabold leading-[19.2px] text-left absolute left-3  uppercase pt-[16px] pb-[4px]">
                        reason for Stop sales
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Reason"
                          className="pt-11 text-[12px] font-bold placeholder:text-[12px] placeholder:font-bold placeholder:leading-[16.2px] placeholder:text-left placeholder:text-[#8F8F8F]"
                          {...field}
                          value={reasonData}
                          onChange={(e) => {
                            setReasonDataToStop(e.target.value);
                            field.onChange(e);
                          }}
                          style={{ resize: "none", height: "210px" }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <div className="flex gap-[20px] mt-[50px] justify-center items-center w-full md:justify-start">
            <div className="flex justify-center items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px] gradient-slate text-[#00A849]">
              Cancel
            </div>
            <div
              onClick={() => StopSalesMethod()}
              className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] bg-red-500 p-[12px]"
            >
              Stop Sales
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StopSales;
