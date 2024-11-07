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

const eventImages = [
    { id: 1, title: "Individual" },
    { id: 2, title: "Business" },
    { id: 3, title: "Representative" },
    { id: 4, title: "Owners" },
    { id: 5, title: "Executive" },
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

const IndividualInfo = () => {
    const [selectedEventId, setSelectedEventId] = useState<number>(1);;
    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [OrgName, setOrgName] = useState("");
    const [Role, setRole] = useState("");
    const [ContactNo, setContactNo] = useState("");
    const [Description, setDescription] = useState("");

    const handleSelect = (id: number) => {
        setSelectedEventId(id);
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
            <div>
                <div className="flex gap-[30px] flex-col md:gap-[70px]">
                    <Form {...form}>
                        <form
                            className=" w-full"
                        //  onSubmit={form.handleSubmit(login)}
                        >
                            <div className="lg:flex w-full  gap-[24px]">
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    FIRST NAME
                                                </FormLabel>
                                                <Image
                                                    src={user}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl className="text-[white]">
                                                    <Input
                                                        placeholder="Enter First Name"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Allow the input, but prevent leading space
                                                            if (value.trimStart().length === 0) {
                                                                // If input is only spaces, set to empty
                                                                setName("");
                                                                field.onChange("");
                                                            } else {
                                                                setName(value);
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Prevent leading space
                                                            if (e.key === " " && field.value.length === 0) {
                                                                e.preventDefault();
                                                            }
                                                            // Allow letters and spaces
                                                            if (
                                                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                                                !["Backspace", "Tab"].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    LAST NAME
                                                </FormLabel>
                                                <Image
                                                    src={user}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Last Name"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Prevent leading space
                                                            if (value.trimStart().length === 0) {
                                                                setLastName("");
                                                                field.onChange("");
                                                            } else {
                                                                setLastName(value);
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Prevent leading space
                                                            if (e.key === " " && field.value.length === 0) {
                                                                e.preventDefault();
                                                            }
                                                            // Allow letters and spaces
                                                            if (
                                                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                                                !["Backspace", "Tab"].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="lg:flex w-full  gap-[24px]">
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    EMAIL
                                                </FormLabel>
                                                <Envelope
                                                    className="absolute right-3 top-[30%]"
                                                    size={20}
                                                />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Email Address"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value);
                                                            field.onChange(e);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="organization"
                                        render={({ field }) => (
                                            <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    DATE OF BIRTH                                                    </FormLabel>
                                                <Image
                                                    src={dob}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter DOB"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Prevent leading space
                                                            if (value.trimStart().length === 0) {
                                                                setOrgName("");
                                                                field.onChange("");
                                                            } else {
                                                                setOrgName(value);
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Prevent leading space
                                                            if (e.key === " " && field.value.length === 0) {
                                                                e.preventDefault();
                                                            }
                                                            // Allow letters, numbers, and spaces
                                                            if (
                                                                !/^[A-Za-z0-9\s]*$/.test(e.key) &&
                                                                !["Backspace", "Tab"].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="lg:flex w-full mb-[16px] md:mb-4 gap-[24px]">
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="cell"
                                        render={({ field }) => (
                                            <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    ORGANIZATION WEBSITE
                                                </FormLabel>
                                                <Image
                                                    src={url}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        inputMode="numeric"
                                                        pattern="\d*"
                                                        placeholder="Enter URL"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            setContactNo(e.target.value);
                                                            field.onChange(e);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key.match(/[^0-9]/) &&
                                                                ![
                                                                    "Backspace",
                                                                    "ArrowLeft",
                                                                    "ArrowRight",
                                                                ].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full ">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    ADDRESS 1                                                     </FormLabel>
                                                <Image
                                                    src={organization}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Address 1"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Prevent leading space
                                                            if (value.trimStart().length === 0) {
                                                                setRole("");
                                                                field.onChange("");
                                                            } else {
                                                                setRole(value);
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Prevent leading space
                                                            if (e.key === " " && field.value.length === 0) {
                                                                e.preventDefault();
                                                            }
                                                            // Allow only letters and spaces
                                                            if (
                                                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                                                !["Backspace", "Tab"].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="lg:flex w-full mb-[16px] md:mb-4 gap-[24px]">
                                <div className="w-full ">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    ADDRESS 2
                                                </FormLabel>
                                                <Image
                                                    src={organization}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Address 2"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Prevent leading space
                                                            if (value.trimStart().length === 0) {
                                                                setRole("");
                                                                field.onChange("");
                                                            } else {
                                                                setRole(value);
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Prevent leading space
                                                            if (e.key === " " && field.value.length === 0) {
                                                                e.preventDefault();
                                                            }
                                                            // Allow only letters and spaces
                                                            if (
                                                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                                                !["Backspace", "Tab"].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="cell"
                                        render={({ field }) => (
                                            <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    TOWN/CITY
                                                </FormLabel>
                                                <Image
                                                    src={location}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        inputMode="numeric"
                                                        pattern="\d*"
                                                        placeholder="Enter Town/City"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            setContactNo(e.target.value);
                                                            field.onChange(e);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key.match(/[^0-9]/) &&
                                                                ![
                                                                    "Backspace",
                                                                    "ArrowLeft",
                                                                    "ArrowRight",
                                                                ].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="lg:flex w-full md:mb-[32px] mb-[60px] gap-[24px]">
                                <div className="w-full ">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    POSTAL CODE
                                                </FormLabel>
                                                <Image
                                                    src={postalcode}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Postal Code"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Prevent leading space
                                                            if (value.trimStart().length === 0) {
                                                                setRole("");
                                                                field.onChange("");
                                                            } else {
                                                                setRole(value);
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Prevent leading space
                                                            if (e.key === " " && field.value.length === 0) {
                                                                e.preventDefault();
                                                            }
                                                            // Allow only letters and spaces
                                                            if (
                                                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                                                !["Backspace", "Tab"].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="cell"
                                        render={({ field }) => (
                                            <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                                                <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                                                    COUNTRY                                                    </FormLabel>
                                                <Image
                                                    src={country}
                                                    alt="img"
                                                    className="absolute right-3 top-[30%]"
                                                />
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        inputMode="numeric"
                                                        pattern="\d*"
                                                        placeholder="Enter Country"
                                                        className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                                        {...field}
                                                        onChange={(e) => {
                                                            setContactNo(e.target.value);
                                                            field.onChange(e);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key.match(/[^0-9]/) &&
                                                                ![
                                                                    "Backspace",
                                                                    "ArrowLeft",
                                                                    "ArrowRight",
                                                                ].includes(e.key)
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <Button
                                    type="submit"
                                    className="w-full sm:w-[200px] font-extrabold py-[12px] text-base"
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
    );
};

export default IndividualInfo;
