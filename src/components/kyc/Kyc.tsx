"use client";
import Image from "next/image";
import calender from "@/assets/Calender.svg";
import calendercheck from "@/assets/Calender Check.svg";
import calenderX from "@/assets/Calender X.svg";
import calendercheckgreen from "@/assets/Calender Checkgreen.svg";
import calenderXgreen from "@/assets/Calender Xgreen.svg";
import caledndergreen from "@/assets/Calendergreen.svg";
import { Button } from "@/components/ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { updateOrganizerProfile } from "@/lib/middleware/organizer";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ScreenLoader from "@/components/loader/Screenloader";
import {
    SuccessToast,
    ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { styled } from "@mui/material/styles";

import { usePathname } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import user from "@/assets/profile.svg";
import location from "@/assets/new location.svg"
import dob from "@/assets/dob.svg"
import country from "@/assets/country.svg"
import postalcode from "@/assets/postal code.svg"
import url from "@/assets/global url.svg"
import organization from "@/assets/Buildings.svg";
import cell from "@/assets/cell.svg";
import "../homepage/sections/viewevents.css";
import IndividualInfo from "./IndividualInfo";
import Business from "./Business";
import Representative from "./Representative";
import Owners from './Owners';
import Executive from "./Executive";

type Event = {
    id: number;
    title: string;
    url: string;
  }; 

const eventImages = [
    { id: 1, title: "Individual", url: "/kyc/individual-info" },
    { id: 2, title: "Business" ,url: "/kyc/business" },
    { id: 3, title: "Representative",url: "/kyc/representative"  },
    { id: 4, title: "Owners",url: "/kyc/owner"  },
    { id: 5, title: "Executive",url: "/kyc/executive" },
];

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email cannot be empty." })
        .email({ message: "Invalid email address." })
        .regex(/^[^\s+_]+$/, 'Invalid email address.'),
    firstname: z
        .string()
        .min(1, { message: "First name cannot be empty." })
        .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters." })
        .trim(),
    role: z
        .string()
        .min(1, { message: "Role cannot be empty." })
        .regex(/^[A-Za-z]+$/, { message: "Role must contain only letters." })
        .trim(),
    cell: z
        // .string()
        // .min(1, { message: "Phone number cannot be empty." })
        // .regex(/^\d+$/, { message: "Phone number must be numeric." })
        // .length(15, { message: "Phone number cannot be more than 15 digits." }),

        .string()
        .min(1, { message: "Phone Number cannot be empty." })
        .max(15, { message: "Phone number cannot be more than 15 digits." })
        .regex(/^\d{1,15}$/, { message: "Phone number must be up to 15 digits." }),
    // organization: z
    //   .string()
    //   .min(1, { message: "Organization name cannot be empty." }),

    organization: z
        .string()
        .min(1, { message: "Organization name cannot be empty." })
        .regex(/^[A-Za-z0-9][A-Za-z0-9\s]*$/, {
            message: "Organization name cannot be empty.",
        })
        .trim(),
    // lastname: z
    //   .string()
    //   .min(1, { message: "Last name cannot be empty." })
    //   .regex(/^[A-Za-z\s]+$/, {
    //     message: "Last name must contain only letters.",
    //   }),

    lastname: z
        .string()
        .min(1, { message: "Last name cannot be empty." })
        .regex(/^[A-Za-z][A-Za-z\s]*$/, {
            message: "Last name must contain only letters.",
        })
        .trim(),

    BIO: z.string().min(1, { message: "Description cannot be empty." }),
});

const Kyc = () => {
    const [selectedEventId, setSelectedEventId] = useState<number>(1);
    const router = useRouter();

    const handleSelect = (id: number, url: string) => {
      setSelectedEventId(id);
      router.push(url); // Navigate to the specified URL
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            role: "",
            cell: "",

            BIO: "",
            email: "",
            organization: "",
        },
    });

    return (
        <section className="min-h-screen bg-cover bg-no-repeat bg-reward">
            <div className="lg:pt-[134px] lg:pb-[116px] pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
                <h1 className="text-[24px] md:text-[36px] font-extrabold mb-[20px] md:mb-[24px]">
                    KYC
                </h1>
                <div className="flex gap-[30px] flex-col md:gap-[70px]">
                    <div className="w-full flex whitespace-nowrap overflow-y-auto scrollbar-hide flex-nowrap md:gap-[12px] gap-[5px] events">
                        {/* {eventImages.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => handleSelect(event.id)}
                                className={`relative flex flex-col items-center justify-center w-[130px] md:items-start pt-[3px] rounded-[44px] md:rounded-lg md:w-[240px] md:px-[12px] px-[31.5px] md:py-[16.5px] cursor-pointer duration-300 ${selectedEventId === event.id
                                    ? "gradient-slate text-[#13FF7A] font-extrabold md:text-base text-sm gradient-border-rounded"
                                    : "gradient-slate font-normal md:text-base text-sm border-muted"
                                    }`}
                            >
                                <p className="md:m-0 my-[12px] font-normal md:text-base text-sm">
                                    {event.title}
                                </p>
                            </div>
                        ))} */}
                          {eventImages.map((event) => (
        <div
          key={event.id}
          onClick={() => handleSelect(event.id, event.url)}
          className={`relative flex flex-col items-center justify-center w-[130px] md:items-start pt-[3px] rounded-[44px] md:rounded-lg md:w-[240px] md:px-[12px] px-[31.5px] md:py-[16.5px] cursor-pointer duration-300 ${
            selectedEventId === event.id
              ? "gradient-slate text-[#13FF7A] font-extrabold md:text-base text-sm gradient-border-rounded"
              : "gradient-slate font-normal md:text-base text-sm border-muted"
          }`}
        >
          <p className="md:m-0 my-[12px] font-normal md:text-base text-sm">
            {event.title}
          </p>
        </div>
      ))}
                    </div>
                    {/* <IndividualInfo /> */}
{/* <Business/> */}
{/* <Representative/> */}
<Owners/>
{/* <Executive/> */}
                </div>
            </div>
        </section>

    );
};

export default Kyc;
