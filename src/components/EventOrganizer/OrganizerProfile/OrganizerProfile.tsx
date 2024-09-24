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
  TelegramLogo,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  Chats,
  UserGear,
  TiktokLogo,
  YoutubeLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Stack from "@mui/material/Stack";
import { getOrganizerByID } from "@/lib/middleware/organizer";

const formSchema = z.object({
  facebook: z
    .string()
    .min(2, { message: "Facebook Url name cannot be empty." }),
  linkedIn: z.string().min(2, { message: "linkedin Url cannot be empty." }),
  telegram: z.string().min(2, { message: "Telegram Url cannot be empty." }),
  insta: z.string().min(2, { message: "Instagram Url cannot be empty." }),
  twitter: z.string().min(1, { message: "Twitter Url cannot be empty." }),
  tiktok: z.string().min(1, { message: "Tiktok Url cannot be empty." }),
  youtube: z.string().min(1, { message: "Youtube Url cannot be empty." }),

  BIO: z.string().min(1, { message: "Description cannot be empty." }),
});

const OrganizerProfile = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [bio, setBIO] = useState("");

  const [fbUrl, setFbUrl] = useState("");
  const [instaUrl, setinstaUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [telegramUrl, settelegramUrl] = useState("");
  const [twitterUrl, settwitterUrl] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState("");
  const [tiktokUrl, settiktokUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "https://www.facebook.com/",
      insta: "https://instagram.com/",
      linkedIn: "https://linkedin.com/in/",
      telegram: "https://t.me/",
      twitter: "https://www.x.com/",
      youtube: "https://www.youtube.com/",
      tiktok: "https://www.tiktok.com/@",
      BIO: "",
    },
  });

  const myActivity = useAppSelector(
    (state) => state?.getOrgByID?.myOrgData?.data?.organizerProfiles[0]
  );
  console.log("my profile data", myActivity);

  const userLoading = useAppSelector((state) => state?.getOrgByID);

  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", id);
    dispatch(getOrganizerByID(id));
  }, []);

  useEffect(() => {
    if (myActivity) {
      const currentValues = form.getValues();

      form.reset({
        facebook: myActivity?.fbUrl || currentValues.facebook,
        insta: myActivity?.instaUrl || currentValues.insta,
        linkedIn: myActivity?.linkedinUrl || currentValues.linkedIn,
        telegram: myActivity?.telegramUrl || currentValues.telegram,
        twitter: myActivity?.twitterUrl || currentValues.twitter,
        tiktok: myActivity?.tiktokUrl || currentValues.tiktok,
        youtube: myActivity?.youtubeUrl || currentValues.youtube,
        BIO: myActivity?.bio || currentValues.BIO,
      });
      if (myActivity?.profilePicture) {
        setImageSrc(myActivity?.profilePicture);
      } else {
        setImageSrc("/person3.jpg");
      }
    }
  }, [myActivity]);

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
          // SuccessToast("Profile Image Updated Successfully");
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

  // async function updateActivity(values: z.infer<typeof formSchema>) {
  //   console.log("my values", values)
  //   setLoader(true);
  //   const userID =typeof window !== "undefined" ?  localStorage.getItem("_id") : null;
  //   try {
  //     const data = {
  //       fbUrl: fbUrl || myActivity?.fbUrl || "",
  //       instaUrl: instaUrl || myActivity?.instaUrl || "",
  //       linkedinUrl: linkedinUrl || myActivity?.linkedinUrl || "",

  //       youtubeUrl: youtubeUrl || myActivity?.youtubeUrl || "",
  //       twitterUrl: twitterUrl || myActivity?.twitterUrl || "",
  //       tiktokUrl: tiktokUrl || myActivity?.tiktokUrl || "",
  //       bio: bio || myActivity?.bio || "",

  //       profilePicture: imageSrc,

  //       userId: userID,
  //     };
  //     dispatch(updateOrganizerProfile(data)).then((res: any) => {
  //       if (res?.payload?.status === 200) {
  //         setLoader(false);
  //         console.log("org Activity res", res?.payload?.data);
  //         SuccessToast("Profile Updated Successfully");
  //         dispatch(getOrganizerByID(userID))
  //       } else {
  //         setLoader(false);
  //         console.log(res?.payload?.message);
  //         ErrorToast(res?.payload?.message);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  async function updateActivity(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        profilePicture: imageSrc,
        profileUpdate: false,
        linkedinUrl: linkedinUrl || myActivity?.linkedinUrl || "",
        telegramUrl: telegramUrl || myActivity?.telegramUrl || "",
        youtubeUrl: youtubeUrl || myActivity?.youtubeUrl || "",
        twitterUrl: twitterUrl || myActivity?.twitterUrl || "",
        fbUrl: fbUrl || myActivity?.fbUrl || "",

        instaUrl: instaUrl || myActivity?.instaUrl || "",

        bio: bio || myActivity?.bio || "",

        tiktokUrl: tiktokUrl || myActivity?.tiktokUrl || "",

        OrganizationUpdate: true,

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
    <div className="w-full md:w-[70%] xl:ps-[172px] md:mx-auto lg:w-full mt-[48px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[auto]">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-bold ms-[52px] lg:ms-[0px] text-[20px] lg:text-[32px]">
        Organiser Profile
      </h2>
      <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[60px] mt-[34px]  lg:mt-[32px] px-[24px]">
        <div className="flex flex-col mx-auto lg:mx-0 gap-[16px] items-center  w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px] flex items-center justify-center">
              <label htmlFor="upload">
                <Image
                  src={imageSrc ? imageSrc : "/person3.jpg"}
                  width={216}
                  height={216}
                  className="size-[216px] w-[156px] h-[156px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="DP"
                />
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="upload"
                onChange={handleSingleFileChange}
              />
            </div>
          </GradientBorder>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            className="w-[100%] py-[8px] px-[12px] md:py-[12px] md:px-[21px] font-bold text-base  text-[#030303] "
          >
            Change Photo Profile
          </Button>
        </div>
        <div className="flex w-full  md:w-full lg:w-[428px] flex-col lg:flex-col gap-6 md:gap-8">
          <Link
            href="/profile-perview"
            className={cn(
              "gradient-slate gradient-border w-full flex justify-between rounded-lg items-center lg:px-[12px] lg:py-[20px] p-[16px] md:py-5 hover:border-[#13FF7A] duration-300 cursor-pointer relative",
              {
                "": pathname.startsWith("/social-profile"),
              }
            )}
          >
            <div className="flex gap-2  items-center ">
              <UserGear size={20} weight="bold" />
              <p className="text-sm  md:text-base font-extrabold mb-0">
                Preview my Organiser Profile
              </p>
            </div>
            <CaretRight size={16} weight="bold" />
          </Link>
          <div className="w-full md:w-full lg:w-[428px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updateActivity)}
                className=" w-full"
              >
                <FormField
                  control={form.control}
                  name="BIO"
                  render={({ field }) => (
                    <FormItem className="relative mb-[24px] md:mb-[20px] space-y-0">
                      <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                        BIO
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Bio"
                          className="pt-[36px] pb-5 h-[136px] text-[#D9D9D9] text-base placeholder:font-normal resize-none"
                          {...field}
                          onChange={(e) => {
                            setBIO(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        FACEBOOK
                      </FormLabel>
                      <FacebookLogo
                        className="absolute right-3 lg:top-[35%] top-[28%] "
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   setFbUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.facebook.com/")) {
                              setFbUrl(e.target.value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="insta"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        INSTAGRAM
                      </FormLabel>
                      <InstagramLogo
                        className="absolute right-3 lg:top-[35%] top-[28%]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   setinstaUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://instagram.com/")) {
                              setinstaUrl(e.target.value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        LINKEDIN
                      </FormLabel>
                      <LinkedinLogo
                        className="absolute right-3 lg:top-[35%] top-[28%]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   setlinkedinUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://linkedin.com/in/")) {
                              setlinkedinUrl(value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        TELEGRAM
                      </FormLabel>
                      <TelegramLogo
                        className="absolute right-3 lg:top-[35%] top-[28%]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   setlinkedinUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://t.me/")) {
                              settelegramUrl(value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tiktok"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        TIKTOK
                      </FormLabel>
                      <TiktokLogo
                        className="absolute right-3 lg:top-[35%] top-[28%]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="username12"
                          className="pt-11 pb-5 text-base  placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   settiktokUrl(e.target.value);
                          //   field.onChange(e);
                          // }}

                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.tiktok.com/@")) {
                              settiktokUrl(e.target.value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        YOUTUBE
                      </FormLabel>
                      <YoutubeLogo
                        className="absolute right-3 lg:top-[35%] top-[28%]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="username12"
                          className="pt-11 pb-5 text-base  placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   setyoutubeUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.youtube.com/")) {
                              setyoutubeUrl(e.target.value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="relative mb-[48px] md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        TWITTER
                      </FormLabel>
                      <TwitterLogo
                        className="absolute right-3 lg:top-[35%] top-[28%]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="username12"
                          className="pt-11 pb-5 text-base  placeholder:font-extrabold"
                          {...field}
                          // onChange={(e) => {
                          //   settwitterUrl(e.target.value);
                          //   field.onChange(e);
                          // }}

                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.x.com/")) {
                              settwitterUrl(e.target.value);
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-start mb-[49px] lg:justify-end">
                  <Button
                    type="submit"
                    className="w-full font-extrabold py-[16px] lg:py-[12px] px-[30.5px] text-sm md:text-base md:w-fit"
                  >
                    Update Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
