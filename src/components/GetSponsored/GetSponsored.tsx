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

const GetSponsored = () => {
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
          Get Sponsored
        </h3>
        <h2 className="text-[18px] lg:text-[24px] font-extrabold mb-[16px] lg:mb-[28px]">
          Are you an event organiser or promoter looking to elevate your event
          or just getting <br className="hide-text" /> started?
        </h2>
        <p className="font-normal text-[13px] lg:text-[16px] mb-[24px] lg:mb-[32px]">
          At Naitram, we are dedicated to supporting and cultivating some of the
          best events worldwide, delivering exceptional experiences{" "}
          <br className="hide-text" />
          to attendees. <br className="hidden lg:block" />
          Whether you're organising music festivals, sports events, or
          networking gatherings, let's discuss how we can take your event to the
          <br className="hide-text" />
          next level with sponsorship opportunities.
        </p>
        <h2 className="text-[18px] lg:text-[24px] font-extrabold mb-[16px] lg:mb-[24px]">
          Our sponsorship offerings include, but are not limited to:
        </h2>
        <ul className="list-disc ml-5 font-normal text-[13px] text-[16px] mb-[50px] lg:mb-[80px]">
          <li>Funding</li>
          <li>Media and publicity support</li>
          <li>Venue arrangements</li>
          <li>Marketing and promotional assistance</li>
          <li>Artist bookings</li>
          <li>Travel and logistics</li>
        </ul>
        <div>
          <h3 className="font-extrabold text-[32px] lg:text-[48px] mb-[24px] lg:mb-[32px]">
            Let’s collaborate to create something
            <br className="hide-text" /> extraordinary for your audience!
          </h3>
          <Form {...form}>
            <form
              className=" w-full"
              onSubmit={(event) => {
                console.log("Form submit triggered");
                form.handleSubmit(updateActivity)(event);
              }}
              //  onSubmit={form.handleSubmit(login)}
            >
              <div className="lg:flex w-full  gap-[24px]">
                {/* <div className="w-full">
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
                              setName(e.target.value);
                              field.onChange(e);
                            }}
                            onKeyDown={(e) => {
                              // Allow only letters and spaces
                              if (
                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                e.key !== "Backspace" &&
                                e.key !== "Tab"
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
                </div> */}
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
                {/* <div className="w-full">
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
                              setLastName(e.target.value);
                              field.onChange(e);
                            }}
                            onKeyDown={(e) => {
                              // Allow only letters and spaces
                              if (
                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                e.key !== "Backspace" &&
                                e.key !== "Tab"
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
                </div> */}
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
                {/* <div className="w-full">
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Organization
                        </FormLabel>
                        <Image
                          src={organization}
                          alt="img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Organization Name"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              setOrgName(e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Organization
                        </FormLabel>
                        <Image
                          src={organization}
                          alt="img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Organization Name"
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
              <div className="lg:flex w-full  gap-[24px]">
                {/* <div className="w-full">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          ROLE
                        </FormLabel>
                        <Image
                          src={user}
                          alt="img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Role"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              setRole(e.target.value);
                              field.onChange(e);
                            }}
                            onKeyDown={(e) => {
                              // Allow only letters and spaces
                              if (
                                !/^[A-Za-z\s]*$/.test(e.key) &&
                                e.key !== "Backspace" &&
                                e.key !== "Tab"
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
                </div> */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          ROLE
                        </FormLabel>
                        <Image
                          src={user}
                          alt="img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Role"
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
                      <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          CONTACT NUMBER
                        </FormLabel>
                        <Image
                          src={cell}
                          alt="img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="Enter Contact Number"
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
              {/* <FormField
                control={form.control}
                name="BIO"
                render={({ field }) => (
                  <FormItem className="relative mb-[32px] md:mb-[24px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                      MESSAGE
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Message"
                        className="pt-[36px] pb-5 h-[135px] lg:h-[260px] placeholder:text-base placeholder:text-[white] placeholder:font-extrabold resize-none"
                        {...field}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="BIO"
                render={({ field }) => (
                  <FormItem className="relative mb-[32px] md:mb-[24px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                      MESSAGE
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Message"
                        className="pt-[36px] pb-5 h-[135px] lg:h-[260px] placeholder:text-base placeholder:text-[white] placeholder:font-extrabold resize-none"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Prevent leading space
                          if (value.trimStart().length === 0) {
                            setDescription("");
                            field.onChange("");
                          } else {
                            setDescription(value);
                            field.onChange(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Prevent leading space
                          if (
                            e.key === " " &&
                            field.value.trim().length === 0
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

              <div className="flex justify-start">
                <Button
                  type="submit"
                  className="w-full md:w-[316px] font-bold py-[12px] px-[30.5px] text-base sm:w-fit"
                >
                  I’m Ready
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default GetSponsored;
