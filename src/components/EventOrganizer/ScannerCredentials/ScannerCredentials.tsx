"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import profile from "@/assets/profile.svg";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { showLiveActivity, updateLiveActivity } from "@/lib/middleware/profile";
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
import { useSearchParams } from "next/navigation";
import { ScannerEmail } from "@/lib/middleware/scanner";

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
  name: z.string().min(2, { message: "Full name cannot be empty." }),

  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." })
    
});
interface ScannerData {
  name: string;
  email: string;
  password: string;
  id:any;
}

const ScannerCredentials = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [scannerData, setScannerData] = useState<ScannerData | undefined>(
    undefined
  );
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const scannerDataParam = searchParams.get("ScannerData");
    if (scannerDataParam) {
      try {
        const decodedData = decodeURIComponent(scannerDataParam);
        const parsedData = JSON.parse(decodedData);
        setScannerData(parsedData);

        console.log("Parsed Event Data:", parsedData);
      } catch (error) {
        console.error("Failed to decode and parse event data", error);
      }
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: scannerData?.name,
      email: scannerData?.email,
      password:scannerData?.password,
    },
  });
  useEffect(() => {
    if (scannerData) {
      form.reset({
        name: scannerData?.name,
        email: scannerData?.email,
        password: scannerData?.password,
      });
    }
  }, [scannerData, form]);
  async function EmailSent() {

    setLoader(true);
    
    try {
     
      dispatch(ScannerEmail(scannerData?.id)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          SuccessToast("Email Sent Successfully");
         
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  return (
    <div className="w-full md:w-[70%] px-[24px] xl:ps-[172px] md:mx-auto lg:w-full mt-[80px] md:mt-[90px] lg:mx-0 lg:h-[auto]">
      {loader && <ScreenLoader />}

      <h2 className="font-bold ms-[24px] md:ms-[0px]  text-[15px] lg:font-extrabold lg:text-[24px]">
        Scanner Credentials
      </h2>
      <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[60px] mt-[34px]  lg:mt-[32px]">
        <div className="w-full md:w-full lg:w-[428px] relative h-[79vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(EmailSent)}
              className=" w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative mb-4 space-y-0">
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
                        readOnly
                        placeholder="Enter Name"
                        className="pt-11 pb-5 text-base text-[white] placeholder:font-extrabold"
                        value={scannerData?.name }
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
                        readOnly
                        value={scannerData?.email}
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 text-base text-[white] placeholder:font-extrabold"
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
                  <FormItem className="relative mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                      PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute right-3 top-[30%] z-[10]"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        readOnly
                        placeholder="Input password"
                        className="pt-11 pb-5 text-base placeholder:font-extrabold"
                        value={scannerData?.password}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start w-full md:relative absolute bottom-[0px] mt-[32px] lg:justify-end">
                <Button
                  type="submit"
                  className="w-full font-extrabold py-[16px] lg:py-[12px] px-[30.5px] text-sm md:text-base"
                >
                  Email me
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ScannerCredentials;
