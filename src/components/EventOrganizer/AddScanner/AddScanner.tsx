"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import tick from "@/assets/fi-rr-check.svg";
import { Button } from "@/components/ui/button";
import profile from "@/assets/profile.svg";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { showLiveActivity, updateLiveActivity } from "@/lib/middleware/profile";
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
import { Mail } from "lucide-react";
import Link from "next/link";
import { CreateScanner } from "@/lib/middleware/scanner";
import { useRouter } from "next/navigation";

type Option = {
  id: number;
  label: string;
  subtitles: any;
};
const options: Option[] = [
  {
    id: 1,
    label: "Admin",
    subtitles: [
      <p key={1} className="flex items-center">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Event attendance list
      </p>,

      <p key={2} className="flex">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Sort ticket scanned by each scanner (in case of <br></br> multiple
        generic scanners)
      </p>,
      <p key={3} className="flex">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Ticket KPI analytics
      </p>,
      <p key={4} className="flex">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Customer information (name, email, ticketing<br></br> details (ticket
        purchase time, ticket category,<br></br> order no, ticket type, activity
        log))
      </p>,
    ],
  },
  {
    id: 2,
    label: "Generic",
    subtitles: [
      <p key={1} className="flex items-center">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Can only signing
      </p>,

      <p key={2} className="flex">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Scan tickets
      </p>,
      <p key={2} className="flex">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        Only that specific scanned ticket logs
      </p>,
      <p key={2} className="flex">
        <p className="me-2 p-0 mb-2 text-extrabold text-[12px]">. </p>
        In the ticket log (the generic scanner can only<br></br> display the
        ticket holders; Name, ticket details and<br></br> Log activities)
      </p>,
    ],
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Full name cannot be empty." }),

  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),
});

const AddScanner = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [Eventid, setEventID] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [scannerData, setScannerData] = useState("");

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedLabel, setSelectedLabel] = useState("");

  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
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
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getUserByID(userid));
  }, []);

  const handleOptionToggle = (option: Option) => {
    if (selectedOptions.some((o) => o.id === option.id)) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([option]);
      const selectedlabel = option.label;
      setSelectedLabel(selectedlabel);
    }
  };

  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl?.split("/");
    const value = parts[parts.length - 1];
    setEventID(value);
    console.log("my event is", value);
  }, []);

  async function updateActivity(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const userID = localStorage.getItem("_id");
    try {
      const data = {
        name: Name,
        email: Email,
        userId: userID,
        typeScanner: selectedLabel,
        eventId: Eventid,
      };
      dispatch(CreateScanner(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Create Scanner", res?.payload?.data);
          SuccessToast("Scanner Created Successfully");
          const encodedEventData = encodeURIComponent(
            JSON.stringify(res?.payload?.data)
          );

          router.push(
            `/organizer-event/scanner-credentials?ScannerData=${encodedEventData}`
          );
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
    <div className="w-full md:w-[70%] px-[24px] xl:ps-[172px] md:mx-auto lg:w-full mt-[48px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[90vh]">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-bold ms-[24px] md:ms-[0px] font-bold lg:font-extrabold text-[20px] lg:text-[24px]">
        Add Scanner
      </h2>
      <div className="flex flex-col lg:flex-row mt-[32px]">
        <div className="w-full md:w-full relative h-[85vh] lg:h-[auto] lg:w-[600px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateActivity)}
              className=" w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] lg:mb-4 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      NAME
                    </FormLabel>
                    <Image
                      src={profile}
                      sizes="28px"
                      alt="img"
                      className="absolute right-3 top-[30%]"
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter Name"
                        className="pt-11 pb-5 text-base placeholder:font-extrabold"
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
                  <FormItem className="relative mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute right-3 top-[30%]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 text-base text-[white] placeholder:font-extrabold"
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

              <div className="pb-[16px] mb-[32px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold lg:pb-[12px] pb-[16px] text-white">
                    Choose Scanner Type
                  </p>
                </div>
                <Separator className="scale--[1.12] bg-[#292929]" />
                {Dropdown && (
                  <div className="pt-[16px] lg:pt-[12px]">
                    {options?.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center justify-between pt-[2px] cursor-pointer"
                        onClick={() => handleOptionToggle(option)}
                      >
                        <div className="flex w-full flex-col">
                          <div className="flex jutify-between w-full">
                            <p className="text-[14px] w-full text-start text-[#FFFFFF] font-normal items-center mt-[12px]">
                              {option.label}
                            </p>
                            {selectedOptions.some(
                              (o) => o.id === option.id
                            ) && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                          {option.subtitles.map(
                            (subtitles: any, index: any) => (
                              <p
                                key={index}
                                className="ps-[2px] font-normal text-[12px] text-[#D9D9D9] mt-[8px] "
                              >
                                {subtitles}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {validationError && (
                  <p className="text-red-500 text-sm mt-2">{validationError}</p>
                )}
              </div>

              <div className="flex justify-start w-full md:relative absolute bottom-[0px] mb-[49px] lg:justify-end">
                <Button
                  type="submit"
                  className="w-full lg:font-bold font-extrabold py-[16px] lg:py-[12px] px-[30.5px] text-sm md:text-base"
                >
                  Add
                </Button>
              </div>

              {/* <Link href="/organizer-event/scanner-credentials">
                <div className="flex justify-start w-full md:relative absolute bottom-[0px] mb-[49px] lg:justify-end">
                  <Button
                    type="submit"
                    className="w-full lg:font-bold font-extrabold py-[16px] lg:py-[12px] px-[30.5px] text-sm md:text-base"
                  >
                    Add
                  </Button>
                </div>
              </Link> */}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddScanner;
