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
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import api from "@/lib/apiInterceptor";
import { styled } from "@mui/material/styles";
import { API_URL } from "@/lib/client";
import { usePathname } from "next/navigation";
import profileimg from "@/assets/Wallet/User Gear.svg";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Stack from "@mui/material/Stack";
import { getOrganizerByID } from "@/lib/middleware/organizer";

const formSchema = z.object({
  facebook: z.string().url({ message: "Invalid Facebook URL." }).optional(), // Makes the field optional
  insta: z.string().url({ message: "Invalid Instagram URL." }).optional(),
  youtube: z.string().url({ message: "Invalid YouTube URL." }).optional(),
  tiktok: z.string().url({ message: "Invalid TikTok URL." }).optional(),
  linkedIn: z.string().url({ message: "Invalid LinkedIn URL." }).optional(),
  telegram: z.string().url({ message: "Invalid Telegram URL." }).optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL." }).optional(),

  BIO: z.string().min(1, { message: "Description cannot be empty." }),
});

const OrganizerProfile = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [bio, setBIO] = useState("");
  const [userid, setUserId] = useState<any>("");

  const [fbUrl, setFbUrl] = useState("");
  const [instaUrl, setinstaUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [telegramUrl, settelegramUrl] = useState("");
  const [twitterUrl, settwitterUrl] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState("");
  const [tiktokUrl, settiktokUrl] = useState("");
  const [checked, setChecked] = useState(true);

  const [isFbVerify, setFbVerify] = useState<boolean>(false);
  const [isInstaVerify, setInstaVerify] = useState<boolean>(false);
  const [isTeleVerify, setTeleVerify] = useState<boolean>(false);
  const [isYtVerify, setYtVerify] = useState<boolean>(false);
  const [isTikTokVerify, setTikTokVerify] = useState<boolean>(false);
  const [isLinkedInVerify, setLinkedInVerify] = useState<boolean>(false);
  const [isXVerify, setXVerify] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#000",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#13FF7A" : "#13FF7A",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "",
      insta: "",
      linkedIn: "",
      telegram: "",
      twitter: "",
      youtube: "",
      tiktok: "",
      BIO: "",
    },
  });

  const myActivity = useAppSelector((state) => state?.getOrgByID?.myOrgData?.data?.organizerProfiles[0]);

  console.log("my profile data", myActivity);

  const userLoading = useAppSelector((state) => state?.getOrgByID);

  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", id);

    dispatch(getOrganizerByID(id));
    setUserId(id);

    // Check is there user Social Accounts verifyOrNot
    setFbVerify(true);
    setTikTokVerify(true);
    setXVerify(true);
    setYtVerify(true);
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

  const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected r img is:", file);

    if (file) {
      setLoader(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await api.post(`${API_URL}/upload/uploadimage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
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
        public: checked,
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
    <div className="w-full md:w-[70%] xl:ps-[172px] md:mx-auto lg:w-full mt-[48px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[auto] ">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-bold ms-[52px] lg:ms-[0px] text-[20px] lg:text-[32px]">Organiser Profile</h2>
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
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
                  alt="DP"
                />
              </label>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" id="upload" onChange={handleSingleFileChange} />
            </div>
          </GradientBorder>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            className="w-[100%] py-[8px] px-[12px] md:py-[12px] md:px-[21px] font-bold text-base  text-[#030303] "
          >
            Change Profile Photo
          </Button>
        </div>
        <div className="flex w-full  md:w-full lg:w-[428px] flex-col lg:flex-col gap-6 md:gap-8">
          <div
            className={`flex items-center rounded-lg py-[16px]  px-[12px] sm:py-[20px] sm:px-[12px] justify-between transition-colors duration-300`}
            style={{
              background: checked
                ? "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box"
                : "linear-gradient(#0F0F0F, #1A1A1A) padding-box",
              border: checked ? "2px solid transparent" : "2px solid #BFBFBF",
              borderImage: checked
                ? "linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%)"
                : "none",
              borderImageSlice: checked ? 1 : undefined,
            }}
          >
            <div className="flex items-center gap-[8px]">
              <Image
                src={profileimg}
                width={20}
                height={20}
                className="size-[20px]"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
                alt="DP"
              />
              <p className="mb-0 text-[16px] font-bold">Make my profile public</p>
            </div>

            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "ant design" }} />
            </Stack>
          </div>
          <Link
            href={`/profile-perview/${userid}`}
            className={cn(
              "gradient-slate gradient-border w-full flex justify-between rounded-lg items-center lg:px-[12px] lg:py-[20px] p-[16px] md:py-5 hover:border-[#13FF7A] duration-300 cursor-pointer relative",
              {
                "": pathname.startsWith("/social-profile"),
              }
            )}
          >
            <div className="flex gap-2  items-center ">
              <UserGear size={20} weight="bold" />
              <p className="text-sm  md:text-base font-extrabold mb-0">Preview my Organiser Profile</p>
            </div>
            <CaretRight size={16} weight="bold" />
          </Link>
          <div className="w-full md:w-full lg:w-[428px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateActivity)} className=" w-full">
                <div className="flex justify-start mt-[32] mb-8 lg:justify-end">
                  <Button type="submit" className="w-full font-extrabold py-[16px] lg:py-[12px] px-[30.5px] text-sm md:text-base md:w-fit">
                    Update Changes
                  </Button>
                </div>
                {/* <div className="overflow-y-auto scrollbar-hide lg:h-[300px] xl:h-[310px]"> */}
                <div className="overflow-y-auto scrollbar-hide">
                  <FormField
                    control={form.control}
                    name="BIO"
                    render={({ field }) => (
                      <FormItem className="relative mb-[24px] md:mb-[20px] space-y-0">
                        <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">BIO</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Bio"
                            className="pt-[36px] pb-5 h-[136px] text-[#D9D9D9] text-base placeholder:font-normal resize-none scrollbar-hide"
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
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">FACEBOOKKKK</FormLabel>
                        {/* <FacebookLogo className="absolute right-3 lg:top-[35%] top-[28%] " size={20} /> */}
                        {/* {isFbVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   setFbUrl(e.target.value);
                            //   field.onChange(e);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFbUrl(e.target.value);
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
                    name="insta"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">INSTAGRAM</FormLabel>
                        {/* <InstagramLogo className="absolute right-3 lg:top-[35%] top-[28%]" size={20} /> */}
                        {/* {isInstaVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   setinstaUrl(e.target.value);
                            //   field.onChange(e);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;

                              setinstaUrl(e.target.value);
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
                    name="linkedIn"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">LINKEDIN</FormLabel>
                        {/* <LinkedinLogo className="absolute right-3 lg:top-[35%] top-[28%]" size={20} /> */}
                        {/* {isLinkedInVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   setlinkedinUrl(e.target.value);
                            //   field.onChange(e);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;

                              setlinkedinUrl(value);
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
                    name="telegram"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TELEGRAM</FormLabel>
                        {/* <TelegramLogo className="absolute right-3 lg:top-[35%] top-[28%]" size={20} /> */}
                        {/* {isTeleVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   setlinkedinUrl(e.target.value);
                            //   field.onChange(e);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;

                              settelegramUrl(value);
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
                    name="tiktok"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TIKTOK</FormLabel>
                        {/* <TiktokLogo className="absolute right-3 lg:top-[35%] top-[28%]" size={20} /> */}
                        {/* {isTikTokVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   settiktokUrl(e.target.value);
                            //   field.onChange(e);
                            // }}

                            onChange={(e) => {
                              const value = e.target.value;

                              settiktokUrl(e.target.value);
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
                    name="youtube"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">YOUTUBE</FormLabel>
                        {/* <YoutubeLogo className="absolute right-3 lg:top-[35%] top-[28%]" size={20} /> */}
                        {/* {isYtVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   setyoutubeUrl(e.target.value);
                            //   field.onChange(e);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;

                              setyoutubeUrl(e.target.value);
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
                    name="twitter"
                    render={({ field }) => (
                      <FormItem className="relative mb-[49px]">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TWITTER</FormLabel>
                        {/* <TwitterLogo className="absolute right-3 lg:top-[35%] top-[28%]" size={20} /> */}
                        {/* {isXVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )} */}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   settwitterUrl(e.target.value);
                            //   field.onChange(e);
                            // }}

                            onChange={(e) => {
                              const value = e.target.value;

                              settwitterUrl(e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
