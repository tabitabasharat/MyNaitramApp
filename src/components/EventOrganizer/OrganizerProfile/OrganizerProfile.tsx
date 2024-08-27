"use client";

import Image from "next/image";
import GradientBorder from "@/components/ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { showLiveActivity, updateLiveActivity } from "@/lib/middleware/profile";
import Link from "next/link";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect, useRef } from "react";
import { getUserByID, updateProfile } from "@/lib/middleware/profile";
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

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Full name cannot be empty." }),

  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
  facebook: z
    .string()
    .min(2, { message: "Facebook Url name cannot be empty." }),
  linkedIn: z.string().min(2, { message: "linkedIn Url cannot be empty." }),
  insta: z.string().min(2, { message: "Instagram Url cannot be empty." }),
  telegram: z.string().min(1, { message: "Telegram Url cannot be empty." }),
});

const OrganizerProfile = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [fbUrl, setFbUrl] = useState("");
  const [instaUrl, setinstaUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [telegramUrl, settelegramUrl] = useState("");
  const myProfile = useAppSelector(
    (state) => state?.getUserDetail?.userProfile?.data
  );

  console.log("my Profile info is", myProfile);
  const [checked, setChecked] = useState(true);
  const userLoading = useAppSelector((state) => state?.getUserDetail);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      facebook: "",
      insta: "",
      linkedIn: "",
      telegram: "",
    },
  });
  const myliveActivity = useAppSelector(
    (state) => state?.getProfileLiveActivity?.LiveActivity?.data
  );

  console.log("my live info is", myliveActivity);

  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       facebook: "",
  //       insta: "",
  //       linkedIn: "",
  //       telegram: "",
  //     },
  //   });

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

  async function profileclick(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const userID = localStorage.getItem("_id");
    try {
      const data = {
        password: Password || myProfile?.password || "",
        fullName: Name || myProfile?.fullname || "",
        userId: userID,

        isActive: false,
        profilePicture: imageSrc,
      };
      dispatch(updateProfile(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Profile res", res?.payload?.data);
          SuccessToast("Profile Updated Successfully");
          dispatch(getUserByID(userID));
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
  const pathname = usePathname();

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getUserByID(userid));
  }, []);

  useEffect(() => {
    if (myliveActivity && myliveActivity.length > 0) {
      const currentValues = form.getValues();

      form.reset({
        facebook: myliveActivity[0]?.fbUrl || currentValues.facebook,
        insta: myliveActivity[0]?.instaUrl || currentValues.insta,
        linkedIn: myliveActivity[0]?.linkedinUrl || currentValues.linkedIn,
        telegram: myliveActivity[0]?.telegramUrl || currentValues.telegram,
      });
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
          backgroundColor:
            theme.palette.mode === "dark" ? "#13FF7A" : "#13FF7A",
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
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (myProfile) {
      form.reset({
        full_name: myProfile?.fullname || form.getValues("full_name"),
        email: myProfile?.email || form.getValues("email"),
        password: myProfile?.password || form.getValues("password"),
      });
    }
    if (myProfile?.profilePicture) {
      setImageSrc(myProfile.profilePicture);
    } else {
      setImageSrc("/person3.jpg");
    }
  }, [myProfile]);

  async function updateActivity(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const userID = localStorage.getItem("_id");
    try {
      const data = {
        fbUrl: fbUrl || myliveActivity[0]?.fbUrl || "",
        instaUrl: instaUrl || myliveActivity[0]?.instaUrl || "",
        linkedinUrl: linkedinUrl || myliveActivity[0]?.linkedinUrl || "",
        telegramUrl: telegramUrl || myliveActivity[0]?.telegramUrl || "",
        isActive: checked,
        userID: userID,
      };
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

  return (
    <div className="w-full md:w-[70%] ps-[0px] xl:ps-[182px] md:mx-auto lg:w-full mt-[48px] md:mt-[150px] lg:mx-0 relative h-[90vh]">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-bold ms-[24px] md:ms-[0px] text-[20px] lg:text-[32px]">
        Organizer Profile
      </h2>
      <div className="flex flex-col lg:flex-row gap-8 mt-[34px]  lg:mt-[32px]">
        <div className="flex flex-col mx-auto lg:mx-0 gap-[16px] items-center  w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px] flex items-center justify-center">
              <label htmlFor="upload">
                <Image
                  src={imageSrc}
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
                accept="image/png, image/jpg, image/jpeg, image/svg+xml"
                className="hidden"
                id="upload"
                onChange={handleSingleFileChange}
              />
            </div>
          </GradientBorder>
          <Button
            onClick={() => fileInputRef.current?.click()} // Trigger file input click
            variant="secondary"
            className="w-[100%] py-[8px] px-[12px] md:py-[12px] md:px-[21px] font-bold text-base  text-[#030303] "
          >
            Change Photo Profile
          </Button>
        </div>
        {/* <div className="w-full lg:w-[428px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(profileclick)}
              className=" w-full"
            >
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="relative mb-6 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      FULL NAME
                    </FormLabel>
                    <User className="absolute right-3  top-[35%]" size={20} />
                    <FormControl>
                      <Input
                        placeholder="Enter Fullname"
                        className="pt-11 pb-5 font-bold text-base placeholder:font-extrabold "
                        {...field}
                        onChange={(e) => {
                          setName(e.target.value);
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
                name="email"
                render={({ field }) => (
                  <FormItem className="relative mb-6 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute right-3  top-[35%]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        readOnly
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 text-base placeholder:font-extrabold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative space-y-0 mb-2">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3 z-10">
                      PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute right-3   top-[35%] z-10"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        readOnly
                        placeholder="Input password"
                        className="pt-11 pb-5 text-base placeholder:font-extrabold"
                        {...field}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="opacity-70 text-sm pt-2 text-[12px] font-bold hover:opacity-100 underline translate-y-[-0.4rem]">
                <Link href="/auth/resetpasspage">
                  Want to change your password?
                </Link>
              </p>
              <div className="flex justify-start lg:justify-end  absolute bottom-[0px] mb-[32px] md:mt-[32px]  sm:relative mt-[57px] w-full">
                <Button
                  type="submit"
                  className="w-full  px-[30.5px] py-[12px]  md:mb-[0px] font-extrabold text-base md:w-fit"
                >
                  Update Changes
                </Button>
              </div>
            </form>
          </Form>
        </div> */}
        <div className="flex w-full md:w-full lg:w-[600px] flex-col lg:flex-col gap-6 md:gap-8 mt-[50px] lg:mt-[32px]">
          <Link
            href="/social-profile"
            className={cn(
              "gradient-slate border border-muted w-full flex justify-between rounded-lg items-center  px-4 md:px-3 py-2.5 md:py-5 hover:border-[#13FF7A] duration-300 cursor-pointer relative",
              {
                "border-[#13FF7A]": pathname.startsWith("/social-profile"),
              }
            )}
          >
            <div className="flex gap-2 items-center ">
              <UserGear size={20} weight="bold" />
              <p className="text-sm md:text-base font-extrabold mb-0">
                Preview my Personal Social Profile
              </p>
            </div>
            <CaretRight size={16} weight="bold" />
          </Link>
          <div className="w-full md:w-full lg:w-[600px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updateActivity)}
                className=" w-full"
              >
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        FACEBOOK
                      </FormLabel>
                      <FacebookLogo
                        className="absolute right-3 top-[30%]"
                        size={28}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          onChange={(e) => {
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
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        INSTAGRAM
                      </FormLabel>
                      <InstagramLogo
                        className="absolute right-3 top-[30%]"
                        size={28}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          onChange={(e) => {
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
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        LINKEDIN
                      </FormLabel>
                      <LinkedinLogo
                        className="absolute right-3 top-[30%]"
                        size={28}
                      />
                      <FormControl>
                        <Input
                          placeholder="Enter Fullname"
                          className="pt-11 pb-5 text-base placeholder:font-extrabold"
                          {...field}
                          onChange={(e) => {
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
                    <FormItem className="relative mb-[44px] md:mb-8 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        TELEGRAM
                      </FormLabel>
                      <TelegramLogo
                        className="absolute right-3 top-[30%]"
                        size={28}
                      />
                      <FormControl>
                        <Input
                          placeholder="youremail@example.com"
                          className="pt-11 pb-5 text-base  placeholder:font-extrabold"
                          {...field}
                          onChange={(e) => {
                            settelegramUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-start lg:justify-start">
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
