"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateLiveActivity } from "@/lib/middleware/profile";
import Switch, { SwitchProps } from "@mui/material/Switch";
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
import add from "@/assets/Plus.svg";
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
import tick from "@/assets/fi-rr-check.svg";
import Link from "next/link";

type Option = {
    id: number;
    label: string;
  };
  const options: Option[] = [
    { id: 1, label: "Naitram Launch Party 2024" },
    { id: 2, label: "Takeovr Party 2024" },
    { id: 3, label: "Women Party" },
    { id: 4, label: "Takeovr Party 2024" },
    { id: 5, label: "Takeovr Party 2024" },
    { id: 6, label: "Takeovr Party 2024" },
  ];
  

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
  BIO: z.string().min(1, { message: "Description be empty." }),
});

const ScannerLogin = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [fbUrl, setFbUrl] = useState("");
  const [instaUrl, setinstaUrl] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
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
      BIO: "",
    },
  });
  const myliveActivity = useAppSelector(
    (state) => state?.getProfileLiveActivity?.LiveActivity?.data
  );

  console.log("my live info is", myliveActivity);
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
  const handleOptionToggle = (option: Option) => {
    if (selectedOptions.some((o) => o.id === option.id)) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([option]);
    }
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
    <div className="w-full lg:w-[600px] xl:ps-[172px] md:mx-auto mt-[44px] px-[24px] lg:px-[0px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[90vh]">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-extrabold ms-[24px] md:ms-[0px] text-[20px] lg:text-[24px]">
        Event Selection
      </h2>
      <div className="pb-[8px] mt-[44px] mb-[30px] lg:mb-[20px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold lg:pb-[12px] pb-[16px] text-white">Choose Event</p>
        </div>
        <Separator className="scale--[1.12] bg-[#292929]" />
        {Dropdown && (
          <div className="pt-[16px] lg:pt-[12px]">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between pt-[2px] cursor-pointer"
                onClick={() => handleOptionToggle(option)}
              >
                <div className="flex items-center gap-[10px]">
                  <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                    {option.label}
                  </p>
                </div>
                {selectedOptions.some((o) => o.id === option.id) && (
                  <Image src={tick} width={10} height={10} alt="tick" />
                )}
              </div>
            ))}
          </div>
        )}
        {validationError && (
          <p className="text-red-500 text-sm mt-2">{validationError}</p>
        )}
      </div>
      <Link href="/organizer-event/add-scanner">
      <div className="flex mb-[24px] lg:mb-[32px] justify-end">
        <Button
          type="submit"
          className="max-w-fit gradient-border-btn rounded-[44px] bg-[black] text-[#00D059] font-extrabold py-[8px] lg:py-[16px] lg:px-[24px] px-[12px] text-sm md:text-base md:w-fit"
        >
          <Image
            src={add}
            alt="add"
            className="me-[8px] w-[12px] h-[12px] lg:w-[20px] lg:h-[20px]"
          />{" "}
          New Scanner
        </Button>
      </div>
      </Link>
      <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[60px] mt-[34px]  lg:mt-[32px]">
        <div className="flex w-full  md:w-full lg:w-[600px] flex-col lg:flex-col gap-6 md:gap-8 mt-[0px] lg:mt-[32px]">
          <div className="w-full md:w-full lg:w-[428px]">
            <h3 className="text-sm font-normal lg:text-[24px] lg:font-extrabold mb-[10px] lg:mb-[16px] ">
              Naitram Launch Event 2024
            </h3>
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
                      <FormLabel className="text-[14px] lg:text-[16px] lg:font-extrabold text-[white] font-bold absolute left-3 top-3">
                        Sohail Hussain
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Admin"
                          className="text-[#8F8F8F] pt-11 pb-5 text-[12px] placeholder:font-bold"
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
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[14px] lg:text-[16px] lg:font-extrabold text-[white] font-bold absolute left-3 top-3">
                        Sohail Hussain
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Admin"
                          className="text-[#8F8F8F] pt-11 pb-5 text-[12px] placeholder:font-bold"
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
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="relative mb-4 md:mb-6 space-y-0">
                      <FormLabel className="text-[14px] lg:text-[16px] lg:font-extrabold text-[white] font-bold absolute left-3 top-3">
                        Sohail Hussain
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Admin"
                          className="text-[#8F8F8F] pt-11 pb-5 text-[12px] placeholder:font-bold"
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerLogin;
