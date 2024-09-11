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
import { API_URL } from "@/lib/client";
import { usePathname } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getOrganizerByID } from "@/lib/middleware/organizer";
import user from "@/assets/profile.svg";
import organization from "@/assets/Buildings.svg";
import cell from "@/assets/cell.svg";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),

  facebook: z.string().min(2, { message: "Full Name cannot be empty." }),
  roll: z.string().min(2, { message: "Roll cannot be empty." }),
  cell: z
    .string()
    .min(1, { message: "Phone number cannot be empty." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Phone number must be numeric.",
    }),
  organization: z.string().min(1, { message: "Twitter Url cannot be empty." }),
  lastname: z.string().min(1, { message: "Last name cannot be empty." }),
  BIO: z.string().min(1, { message: "Description cannot be empty." }),
});

const GetSponsored = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [bio, setBIO] = useState("");
  const [fbUrl, setFbUrl] = useState("");
  const [instaUrl, setinstaUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [twitterUrl, settwitterUrl] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState("");
  const [tiktokUrl, settiktokUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roll: "",
      cell: "",
      lastname: "",
      BIO: "",
      email: "",
      organization: "",
    },
  });

  const myActivity = useAppSelector(
    (state) => state?.getOrgByID?.myOrgData?.data
  );
  console.log("my profile data", myActivity);

  const userLoading = useAppSelector((state) => state?.getOrgByID);

  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", id);
    dispatch(getOrganizerByID(id));
  }, []);

  const handleSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Selected r img is:", file);

    if (file) {
      setLoader(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await api.post(
          `${API_URL}/upload/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          setLoader(false);

          console.log("Profile image", res);
          console.log("Profile image uploaded");
          setImageSrc(res?.data?.data);
          console.log(res?.data?.data, "this is the Profile");
          SuccessToast("Profile Image Updated Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const pathname = usePathname();

  async function updateActivity(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        fbUrl: fbUrl || myActivity?.fbUrl || "",
        instaUrl: instaUrl || myActivity?.instaUrl || "",
        linkedinUrl: linkedinUrl || myActivity?.linkedinUrl || "",
        // const [Name, setName] = useState("");
        youtubeUrl: youtubeUrl || myActivity?.youtubeUrl || "",
        twitterUrl: twitterUrl || myActivity?.twitterUrl || "",
        tiktokUrl: tiktokUrl || myActivity?.tiktokUrl || "",
        bio: bio || myActivity?.bio || "",

        profilePicture: imageSrc,

        userId: userID,
      };
      dispatch(updateOrganizerProfile(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("org Activity res", res?.payload?.data);
          SuccessToast("Profile Updated Successfully");
          dispatch(getOrganizerByID(userID));
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
    <section className="min-h-screen bg-cover bg-no-repeat    bg-reward  ">
      <div className="lg:pt-[134px] lg:pb-[116px] pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
        <h3 className="font-extrabold text-[32px] lg:text-[48px] mb-[24px] lg:mb-[32px]">
          Get Sponsored
        </h3>
        <h2 className="text-[18px] lg:text-[24px] font-extrabold mb-[16px] lg:mb-[28px]">
          Are you an event organiser or promoter looking to elevate your event
          or just getting <br className="hidden xl:block" /> started?
        </h2>
        <p className="font-normal text-[13px] lg:text-[16px] mb-[24px] lg:mb-[32px]">
          At Naitram, we are dedicated to supporting and cultivating some of the
          best events worldwide, delivering exceptional experiences{" "}
          <br className="hidden xl:block" />
          to attendees. <br className="hidden sm:block" />
          Whether you're organising music festivals, sports events, or
          networking gatherings, let's discuss how we can take your event to the
          <br className="hidden xl:block" />
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
            <br className="hidden xl:block" /> extraordinary for your audience!
          </h3>
          <Form {...form}>
            <form
              //   onSubmit={form.handleSubmit(updateActivity)}
              className=" w-full"
            >
              <div className="lg:flex w-full  gap-[24px]">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="facebook"
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
                            placeholder="Enter Contact Number"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
