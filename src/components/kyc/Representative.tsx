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
import arrowdown from "../../assets/arrow-down-drop.svg";
import location from "@/assets/new location.svg"
import dob from "@/assets/dob.svg"
import country from "@/assets/country.svg"
import postalcode from "@/assets/postal code.svg"
import url from "@/assets/global url.svg"
import urt from "@/assets/urt.svg"
import organization from "@/assets/Buildings.svg";
import cell from "@/assets/cell.svg";
import "../homepage/sections/viewevents.css";
import tick from "../../assets/fi-rr-check.svg";
const eventImages = [
    { id: 1, title: "Individual" },
    { id: 2, title: "Business" },
    { id: 3, title: "Representative" },
    { id: 4, title: "Owners" },
    { id: 5, title: "Executive" },
];
type CateOption = {
    // id: number;
    label: string;
};

const optionscate: CateOption[] = [
    { label: "Music" },
    { label: "Business" },
    { label: "Food & Drink" },
    { label: "Community" },
    { label: "Arts" },
    { label: "Film & Media" },
    { label: "Sports & Fitness" },
    { label: "Health" },
    { label: "Science & Tech" },
    { label: "Travel & utdoor" },
    { label: "Charities & Causes" },
    { label: "Spirituality" },
    { label: "Seasonal" },
    { label: "Government" },
    { label: "Fashion" },
    { label: "Home & Lifestyle" },
    { label: "Auto, Boat & Air" },
    { label: "Hobbies" },
    { label: "Family & Education" },
    { label: "School Activities" },
    { label: "Other" },
];

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email cannot be empty." })
        .email({ message: "Invalid email address." })
        .regex(/^[^\s+_]+$/, 'Invalid email address.'),
    name: z
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

const Representative = () => {
    const [selectedEventId, setSelectedEventId] = useState<number>(1);;
    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [OrgName, setOrgName] = useState("");
    const [Role, setRole] = useState("");
    const [ContactNo, setContactNo] = useState("");
    const [categoryTypes, setCategoryTypes] = useState<any>([]);
    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

    const handleSelect = (id: number) => {
        setSelectedEventId(id);
    };
    const handleCateOptionToggle = (option: any) => {
        setCategoryTypes((prev: any) => {
            if (prev.some((o: any) => o.label === option.label)) {
                return prev.filter((o: any) => o.label !== option.label);
            }

            if (prev.length < 4) {
                return [...prev, option];
            }

            // ErrorToast("You can only select 4 categories at a time")
            return prev;
        });
    };

    const handleCatDropdownToggle = () => {
        setIsCatDropdownOpen((prev) => !prev);
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
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
                            <div className="w-full lg:w-[49%]" >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="relative mb-[16px] md:mb-4 w-full rounded-md border border-[#292929] gradient-slate py-[8px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                                            <div
                                                className="flex items-center justify-between"
                                                onClick={handleCatDropdownToggle}
                                            >
                                                <div className="flex flex-col">
                                                    <p className="text-[12px] font-bold text-[#8F8F8F] uppercase">
                                                        RELATIONSHIP WITH COMPANY
                                                    </p>
                                                    <p>Select Relationship </p>
                                                </div>
                                                <Image
                                                    src={isCatDropdownOpen ? arrowdown : arrowdown}
                                                    width={11}
                                                    height={11}
                                                    alt="arrow"
                                                />
                                            </div>
                                            {isCatDropdownOpen && (
                                                <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                                    {optionscate?.map((option) => (
                                                        <div
                                                            key={option.label}
                                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                                            onClick={() => handleCateOptionToggle(option)}
                                                        >
                                                            <div className="flex items-center gap-[10px]">
                                                                {/* <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                  {option.label}
                                </p> */}
                                                                <p
                                                                    className={`text-[16px] font-normal items-center ${categoryTypes?.some(
                                                                        (o: any) => o.label === option.label
                                                                    )
                                                                        ? "text-[#00d059]"
                                                                        : "text-[#FFFFFF]"
                                                                        }`}
                                                                >
                                                                    {option.label}
                                                                </p>
                                                            </div>
                                                            {categoryTypes?.some(
                                                                (o: any) => o.label === option.label
                                                            ) && (
                                                                    <Image
                                                                        src={tick}
                                                                        width={10}
                                                                        height={10}
                                                                        alt="tick"
                                                                    />
                                                                )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
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
                                    name="name"
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
                            <div className="w-full">
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

export default Representative;
