"use client";

import Image from "next/image";
import GradientBorder from "@/components/ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { updateOrganizerProfile } from "@/lib/middleware/organizer";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import arrowrigth from "@/assets/Arrow Right.svg";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect, useRef } from "react";
import ScreenLoader from "@/components/loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import api from "@/lib/apiInterceptor";
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
import organization from "@/assets/Buildings.svg";
import cell from "@/assets/cell.svg";
import { getSponsored } from "@/lib/middleware/liveactivity";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),

  // firstname: z
  //   .string()
  //   .min(1, { message: "Full Name cannot be empty." })
  //   .regex(/^[A-Za-z\s]+$/, {
  //     message: "First name must contain only letters.",
  //   })
  //   .trim(),

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

const Legalguide = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);

  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [OrgName, setOrgName] = useState("");
  const [Role, setRole] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Description, setDescription] = useState("");

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

  async function updateActivity(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        firstName: Name,
        lastName: LastName,
        email: Email,
        organizationName: OrgName,
        role: Role,
        contactNo: ContactNo,
        message: Description,
      };
      dispatch(getSponsored(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Sponsored", res?.payload?.data);
          SuccessToast("Submitted Successfully");
        } else {
          setLoader(false);
          console.log(res?.payload?.message);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <section className="min-h-screen bg-cover bg-no-repeat bg-reward">
      <div className="lg:pt-[134px] lg:pb-[116px] pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
        <h3 className="font-extrabold text-[32px] lg:text-[48px] mb-[24px] lg:mb-[32px]">
          Legal Guide
        </h3>
        <p className="font-normal text-[13px] lg:text-[16px] mb-[24px] lg:mb-[50px]">
          Welcome to the “Legal Guide” section of the Naitram platform. Here,
          you will find all the legal information and agreements that govern
          your use of our platform. This section is designed to ensure
          transparency and clarity regarding your rights and responsibilities as
          a user of our innovative, blockchain-powered ticketing service.
          Whether you’re an event organiser or an attendee, it’s important to
          understand the terms that protect your experience on the Naitram
          platform. We encourage you to review these documents carefully to
          ensure a secure, informed, and compliant journey with us.
        </p>
        <div className="flex flex-col gap-[16px] md:gap-[24px]">
          <Link href="anti-slavery-policy">
            <div className="gradient-slate py-[22px] px-[12px] flex justify-between gradient-bg-auth w-full md:w-[492px]">
              <p className="text-base font-normal">Anti Slavery Policy</p>
              <Image
                src={arrowrigth}
                className="h-[20px] w-[20px]"
                alt="arrowrigth"
              />
            </div>
          </Link>
          <Link href="/data-protection-policy">
            <div className="gradient-slate py-[22px] px-[12px] flex justify-between gradient-bg-auth w-full md:w-[492px]">
              <p className="text-base font-normal">Data Protection Policy</p>
              <Image
                src={arrowrigth}
                className="h-[20px] w-[20px]"
                alt="arrowrigth"
              />
            </div>
          </Link>
          <Link href="/event-promoter-agreement">
          <div className="gradient-slate py-[22px] px-[12px] flex justify-between gradient-bg-auth w-full md:w-[492px]">
            <p className="text-base font-normal">
            Event Organiser Agreement
            </p>
            <Image
              src={arrowrigth}
              className="h-[20px] w-[20px]"
              alt="arrowrigth"
            />
          </div>
          </Link>
          <Link href="/ticket-exchange-policy">
          <div className="gradient-slate py-[22px] px-[12px] flex justify-between gradient-bg-auth w-full md:w-[492px]">
            <p className="text-base font-normal">
            Ticket Exchange Policy
            </p>
            <Image
              src={arrowrigth}
              className="h-[20px] w-[20px]"
              alt="arrowrigth"
            />
          </div>
          </Link>
          <Link href="/privacypolicy">
            <div className="gradient-slate py-[22px] px-[12px] flex justify-between gradient-bg-auth w-full md:w-[492px]">
              <p className="text-base font-normal">Privacy Policy</p>
              <Image
                src={arrowrigth}
                className="h-[20px] w-[20px]"
                alt="arrowrigth"
              />
            </div>
          </Link>
          <Link href="/termsandcondition  ">
            <div className="gradient-slate py-[22px] px-[12px] flex justify-between gradient-bg-auth w-full md:w-[492px]">
              <p className="text-base font-normal">Terms & Conditions</p>
              <Image
                src={arrowrigth}
                className="h-[20px] w-[20px]"
                alt="arrowrigth"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Legalguide;
