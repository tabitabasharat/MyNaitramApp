"use client"

import Backward from "../Backward/Backward";
import ufo from "@/assets/UFO_SVG.png";
import Image from "next/image";
import blur from "@/assets/V2assets/Blur.svg";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import link from "@/assets/V2assets/Link Simple.svg"

const formSchema = z
    .object({
        name: z.string().min(1, { message: "Venue Name cannot be empty." }),
        address: z.string().min(1, { message: "Venue Address cannot be empty." }),
        city: z.string().min(1, { message: "City cannot be empty." }),
        state: z.string().min(1, { message: "State/Region cannot be empty." }),
        postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
        country: z.string().min(1, { message: "Country cannot be empty." }),
        managerName: z.string().min(1, { message: "Manager Name cannot be empty." }),
        capacity: z.string().min(1, { message: "Capacity cannot be empty." }),
        email: z
            .string()
            .email({ message: "Please enter a valid email address." }) // Email validation
            .nonempty({ message: "Email cannot be empty." }),
        phone: z
            .string()
            .regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number." }) // Only digits and optional leading '+'
            .nonempty({ message: "Phone number cannot be empty." }),
        inspection: z.string().min(1, { message: "Inspection cannot be empty." }),

    });
const cities = ["New York", "Los Angeles", "Chicago", "Houston"];

function VenueVerification() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            city: "",
            state: "",
            postalcode: "",
            country: "",
            managerName: "",
            capacity: "",
            email: "",
            phone: "",
            inspection: "",
        },
    });

    return (
        <section className="bg-img-effect bg-cover bg-center ">
        <div className="pt-[120px] z-[1200] md:pt-[132px] pb-[100px] md:pb-[132px] md:px-[35px] lg:px-[75px] xl:px-[180px] px-[24px]">
            <Backward />
            <h1 className="text-[30px] md:text-[48px] font-extrabold pb-[24px] mt-[20px] md:mt-[30px]">Event Venue Verification Form</h1>
            <div className="flex flex-col gap-[52px] md:gap-[32px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => console.log(values))}>
                        <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                            <div className="flex h-[56px] bg-color rounded-t-[12px]">
                                <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                                    <span className="text-[#13FF7A]">Venue </span>
                                    <span>Information</span>
                                </p>
                                <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                            </div>
                            <div className="pt-[8px] p-[24px] md:pb-[32px] md:pt-[8px] md:px-[60px]">
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    venue NAME
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Venue Name"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    venue address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Venue Address"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full space-y-[16px] md:space-y-[24px]">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    City
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter City"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full space-y-[16px] md:space-y-[24px]">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    State/Region
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter State/Region"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="postalcode"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    Postal Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Postal Code"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    venue country
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Venue Country"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="space-t-0" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                            <div className="flex h-[56px] bg-color rounded-t-[12px]">
                                <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                                    <span className="text-[#13FF7A]">Venue </span>
                                    <span>Details</span>
                                </p>
                                <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                            </div>
                            <div className="pt-[8px] p-[24px] md:pb-[32px] md:pt-[8px] md:px-[60px]">
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="capacity"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                                <FormLabel className="text-base text-white text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    venue capacity
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Capacity"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full space-y-[16px] md:space-b-[24px] md:space-t-[24px]">
                                                <FormLabel className="text-base px-[20px] font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    City
                                                </FormLabel>
                                                <FormControl >
                                                    <select
                                                        {...field}
                                                        className="w-full px-[24px] pt-12 pb-[10px] font-bold text-[12px] text-[#8F8F8F] gradient-slate border rounded-md focus:outline-none"
                                                    >
                                                        <option value="" disabled className="gradient-slate">
                                                            Select a city
                                                        </option>
                                                        <option value="new-york" className="gradient-slate">
                                                            New York
                                                        </option>
                                                        <option value="los-angeles" className="gradient-slate">
                                                            Los Angeles
                                                        </option>
                                                        <option value="chicago" className="gradient-slate">
                                                            Chicago
                                                        </option>
                                                        <option value="houston" className="gradient-slate">
                                                            Houston
                                                        </option>
                                                           </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full space-y-[16px] md:space-y-[24px]">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    City
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter City"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="postalcode"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full sm:w-[49%]">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    licensed copy
                                                </FormLabel>
                                                <Image src={link} alt="link" className="absolute top-[30px] right-[12px]" />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Postal Code"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                            <div className="flex h-[56px] rounded-t-[12px] bg-color">
                                <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                                    <span className="text-[#13FF7A]">Venue </span>
                                    <span>Contact Information</span>
                                </p>
                                <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                            </div>
                            <div className="pt-[8px] p-[24px] md:pb-[32px] md:pt-[8px] md:px-[60px]">
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="managerName"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                            <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase max-[326px]truncate max-[326px]:w-[195px]">
                                              venue manager name
                                            </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Venue Manager Name"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="relative space-y-[16px] md:space-y-[24px] w-full">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    Venue manager email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Venue Manager Email"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full space-y-[16px] md:space-y-[24px]">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    venue manager PHONE NUMBER
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Phone Number"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                            // onInput={(e) => {
                                                            //     // Remove any non-numeric characters
                                                            //     e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                            // }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="inspection"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full space-y-[16px] md:space-y-[24px]">
                                                <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[35px] md:top-[40px] uppercase">
                                                    inspection notes
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Inspection Notes"
                                                        className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="gradient-slate w-full rounded-[12px] xl:w-[1080px]">
                            <div className="flex h-[56px] bg-color rounded-[12px]">
                                <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                                    <span className="text-[#13FF7A]">Declaration </span>
                                </p>
                                <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                            </div>
                            <div className="p-[24px] md:py-[32px] md:px-[60px]">
                                <div className="items-start gap-[24px] w-full common-container">
                                    <p className="text-sm md:text-base mb-[20px]">By signing this form, I confirm that the above information is
                                        accurate and that I have provided all necessary documentation
                                        to verify the venue for the event.</p>
                                    <p className="text-sm md:text-base mb-[20px]">
                                        Organizer Signature: ___________________________</p>
                                    <p className="text-sm md:text-base mb-[20px]">Date: ___________________________
                                    </p>
                                    <p className="text-sm md:text-base mb-[20px]">
                                        Ticket Platform Representative Signature: ___________________________</p>
                                    <p className="text-sm md:text-base mb-[20px]"> Date: ___________________________
                                    </p>
                                    <p className="text-sm md:text-base mb-[20px]">
                                        This form must be completed and approved by the ticket platform before ticket sales or event promotion can commence.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <Button
                                type="submit"
                                className="mt-8 px-4 py-[12px] bg-[#00A849]  text-sm md:text-base font-extrabold w-full sm:w-[200px] text-black font-bold rounded-[200px]"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="relative">
                {/* <Image src={blur} alt="blur-effect" className="absolute z-[1100]" /> */}
            </div>
        </div >
        </section>
    );
}

export default VenueVerification;
