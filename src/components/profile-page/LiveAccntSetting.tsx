// components/LiveAccntSetting.js
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  TelegramLogo,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  Chats,
  UserGear,
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import AccountSidebarLink from "@/components/reusable-components/AccountSidebarLink";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import bgblur from "../../assets/Blur Green.png";
import { showLiveActivity, updateLiveActivity } from "@/lib/middleware/profile";
import ScreenLoader from "../loader/Screenloader";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import { isAction } from "redux";
const formSchema = z.object({
  facebook: z.string().url({ message: "Invalid Facebook URL." }).optional(),
  insta: z.string().url({ message: "Invalid Instagram URL." }).optional(),
  youtube: z.string().url({ message: "Invalid YouTube URL." }).optional(),
  tiktok: z.string().url({ message: "Invalid TikTok URL." }).optional(),
  linkedIn: z.string().url({ message: "Invalid LinkedIn URL." }).optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL." }).optional(),
  telegram: z.string().url({ message: "Invalid Telegram URL." }).optional(),
});

const LiveAccntSetting = ({ className, setPopupOpen }: { className?: string; setPopupOpen?: any }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [useriD, setuserId] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const [fbUrl, setFbUrl] = useState("");
  const [twitterUrl, settwitterUrl] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState("");
  const [instaUrl, setinstaUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [telegramUrl, settelegramUrl] = useState("");
  const [tiktokUrl, settiktokUrl] = useState("");

  const [isFbVerify, setFbVerify] = useState<boolean>(false);
  const [isInstaVerify, setInstaVerify] = useState<boolean>(false);
  const [isTeleVerify, setTeleVerify] = useState<boolean>(false);
  const [isYtVerify, setYtVerify] = useState<boolean>(false);
  const [isTikTokVerify, setTikTokVerify] = useState<boolean>(false);
  const [isLinkedInVerify, setLinkedInVerify] = useState<boolean>(false);
  const [isXVerify, setXVerify] = useState<boolean>(false);

  const myliveActivity = useAppSelector((state) => state?.getProfileLiveActivity?.LiveActivity?.data);

  console.log("my live info is", myliveActivity);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "",
      insta: "",
      linkedIn: "",
      tiktok: "",
      telegram: "",
      twitter: "",
      youtube: "",
    },
  });

  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", id);
    setuserId(id);
    dispatch(showLiveActivity(id));

    // Check is there user Social Accounts verifyOrNot
    // setFbVerify(false);
    // setTikTokVerify(false);
    // setXVerify(false);
    // setYtVerify(false);
  }, []);

  useEffect(() => {
    if (myliveActivity && myliveActivity.length > 0) {
      const currentValues = form.getValues();

      form.reset({
        facebook: myliveActivity[0]?.fbUrl || currentValues.facebook,
        insta: myliveActivity[0]?.instaUrl || currentValues.insta,
        linkedIn: myliveActivity[0]?.linkedinUrl || currentValues.linkedIn,
        tiktok: myliveActivity[0]?.tiktokUrl || currentValues.tiktok,
        telegram: myliveActivity[0]?.telegramUrl || currentValues.telegram,
        twitter: myliveActivity[0]?.twitterUrl || currentValues.twitter,
        youtube: myliveActivity[0]?.youtubeUrl || currentValues.youtube,
      });
      setChecked(myliveActivity[0]?.isActive);
    }
  }, [myliveActivity]);

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
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }
  const pathname = usePathname();

  async function updateActivity(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my val", values);
    try {
      let data;
      if (myliveActivity) {
        data = {
          fbUrl: fbUrl || myliveActivity[0]?.fbUrl || "",
          instaUrl: instaUrl || myliveActivity[0]?.instaUrl || "",
          linkedinUrl: linkedinUrl || myliveActivity[0]?.linkedinUrl || "",
          tiktokUrl: tiktokUrl || myliveActivity[0]?.tiktokUrl || "",
          youtubeUrl: youtubeUrl || myliveActivity[0]?.youtubeUrl || "",
          twitterUrl: twitterUrl || myliveActivity[0]?.twitterUrl || "",
          telegramUrl: telegramUrl || myliveActivity[0]?.telegramUrl || "",
          isActive: checked,
          userID: userID,
        };
      } else {
        data = {
          fbUrl: fbUrl,
          instaUrl: instaUrl,
          linkedinUrl: linkedinUrl,
          tiktokUrl: tiktokUrl,
          youtubeUrl: youtubeUrl,
          twitterUrl: twitterUrl,
          telegramUrl: telegramUrl,
          isActive: checked,
          userID: userID,
        };
      }
      dispatch(updateLiveActivity(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Live Activity res", res?.payload?.data);
          SuccessToast("Live Activity Updated Successfully");
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

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <>
      {/* <Image src={bgblur} className="absolute bottom-[0px]"/> */}
      {loader && <ScreenLoader />}
      <div className="w-full lg:w-[70%] md:ps-[0px] lg:pe-[20px] mt-[48px] lg:mt-[90px] lg:ps-[90px] xl:ps-[172px] md:mx-auto lg:w-full  lg:mx-[0] relative h-[90vh] overflow-y-auto scrollbar-hide">
        <h2 className="font-bold text-[20px] ms-[24px] lg:ms-[0px] lg:text-[32px]">Live Activity Settings</h2>
        <div className="flex w-full md:w-full lg:w-[600px] flex-col lg:flex-col gap-6 md:gap-8 mt-[50px] lg:mt-[32px]">
          <Link
            href={`/social-profile/${useriD}`}
            className={cn(
              "gradient-slate border border-muted w-full flex justify-between rounded-lg items-center  px-4 md:px-3 py-2.5 md:py-5 hover:border-[#13FF7A] duration-300 cursor-pointer relative",
              {
                "border-[#13FF7A]": pathname.startsWith("/social-profile"),
              }
            )}
          >
            <div className="flex gap-2 items-center ">
              <UserGear size={20} weight="bold" />
              <p className="text-sm md:text-base font-extrabold mb-0">Preview my Personal Social Profile</p>
            </div>
            <CaretRight size={16} weight="bold" />
          </Link>
          <div className="w-full md:w-full lg:w-[600px]">
            <div
              className={`flex items-center rounded-lg py-[16px] mb-[16px] sm:mb-[32px] px-[12px] sm:py-[27px] sm:px-[12px] justify-between transition-colors duration-300`}
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
              <p className="mb-0 text-center text-base font-extrabold">Show Name on Live Chat</p>
              <Stack direction="row" spacing={1} alignItems="center">
                <AntSwitch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "ant design" }} />
              </Stack>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateActivity)} className=" w-full mb-[50px]">
                <div className="flex justify-start mb-8 lg:justify-start">
                  <Button type="submit" className="w-full font-extrabold py-[16px] lg:py-[12px] px-[30.5px] text-sm md:text-base md:w-fit">
                    Update Changes
                  </Button>
                </div>
                {/* <div className="overflow-y-auto scrollbar-hide h-[420px] md:h-[365px]"> */}
                <div className="overflow-y-auto">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">FACEBOOK</FormLabel>
                        {/* <FacebookLogo className="absolute right-3 top-[35%]" size={20} /> */}
                        {isFbVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )}
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
                        {/* <InstagramLogo className="absolute right-3 top-[35%]" size={20} /> */}
                        {isInstaVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )}
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
                        {/* <LinkedinLogo className="absolute right-3 top-[35%]" size={20} /> */}
                        {isLinkedInVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )}
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
                              setlinkedinUrl(e.target.value);
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
                      <FormItem className="relative mb-4 md:mb-8 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TELEGRAM</FormLabel>
                        {/* <TelegramLogo className="absolute right-3 top-[35%]" size={20} /> */}
                        {isTeleVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input
                            placeholder="Enter URL"
                            className="pt-11 pb-5 pr-24 text-[13px] leading-[1.2rem] placeholder:font-extrabold"
                            {...field}
                            // onChange={(e) => {
                            //   settelegramUrl(e.target.value);
                            //   field.onChange(e);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;
                              settelegramUrl(e.target.value);
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
                        {/* <YoutubeLogo className="absolute right-3 top-[35%]" size={20} /> */}
                        {isYtVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel
                            onClick={handleGoogleLogin}
                            className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center"
                          >
                            Verify
                          </FormLabel>
                        )}
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
                    name="tiktok"
                    render={({ field }) => (
                      <FormItem className="relative mb-4 md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TIKTOK</FormLabel>
                        {/* <TiktokLogo className="absolute right-3 top-[35%]" size={20} /> */}
                        {isTikTokVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )}
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
                    name="twitter"
                    render={({ field }) => (
                      <FormItem className="relative mb-[48px] md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TWITTER</FormLabel>
                        {/* <TwitterLogo className="absolute right-3 top-[30%]" size={20} /> */}
                        {isXVerify ? (
                          <FormLabel className="text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] flex justify-center items-center">
                            ✔
                          </FormLabel>
                        ) : (
                          <FormLabel className="cursor-pointer text-[#00D059] text-[12px] leading-[18px] font-extrabold absolute right-3 top-5 py-[4px] w-[70px] verify-gradient-border flex justify-center items-center">
                            Verify
                          </FormLabel>
                        )}
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
    </>
  );
};

export default LiveAccntSetting;
