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

const formSchema = z
    .object({
        name: z.string().min(1, { message: "Venue Name cannot be empty." }),
        address: z.string().min(1, { message: "Venue Address cannot be empty." }),
        city: z.string().min(1, { message: "City cannot be empty." }),
        state: z.string().min(1, { message: "State/Region cannot be empty." }),
        postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
        country: z.string().min(1, { message: "Country cannot be empty." }),
    });

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
        },
    });

    return (
        <div className="pt-[120px] z-[1200] md:pt-[132px] md:px-[180px] px-[24px]">
            <Backward />
            <h1 className="text-[30px] md:text-[48px] font-extrabold pb-[24px]">Event Venue Verification Form</h1>
            <div className="flex flex-col gap-[52px] md:gap-[32px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => console.log(values))}>
                        <div className="gradient-slate w-full md:w-[1080px]">
                            <div className="flex h-[56px] bg-color">
                                <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                                    <span className="text-[#13FF7A]">Venue </span>
                                    <span>Information</span>
                                </p>
                                <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                            </div>
                            <div className="p-[24px] md:py-[32px] md:px-[60px]">
                                <div className="flex items-start gap-[24px] w-full common-container">
                                    {/* Event Name fields */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="relative w-full">
                                                <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3 uppercase pt-[16px] pb-[4px]">
                                                    Event Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Event Name"
                                                        className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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
                        <div className="gradient-slate w-full md:w-[1080px]">
                            <div className="flex h-[56px] bg-color">
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
                                        <p  className="text-sm md:text-base mb-[20px]">
                                        This form must be completed and approved by the ticket platform before ticket sales or event promotion can commence.
                                        </p>
                                </div>
                                                                    </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-8 px-4 py-[12px] bg-[#00A849] text-sm md:text-base font-extrabold w-[200px] text-black font-bold rounded-[200px]"
                        >
                            Submit
                        </button>
                    </form>
                </Form>
            </div>
            <div className="relative">
                <Image src={blur} alt="blur-effect" className="absolute z-[1100]" />
            </div>
        </div >
    );
}

export default VenueVerification;
