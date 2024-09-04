// components/LiveAccntSetting.js
"use client";
import Image from "next/image";
import GradientBorder from "@/components/ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import upload from "@/assets/material-symbols_upload.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "@/components/loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { createHelpCenter } from "@/lib/middleware/profile";
import { API_URL } from "@/lib/client";
import api from "@/lib/apiInterceptor";

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject cannot be empty." }),
  description: z.string().min(1, { message: "Description be empty." }),
});

const OrganizerHelpcenter = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [Subject, setSubject] = useState("");
  const [Description, setDescription] = useState("");
  const [imgSrc, setImageSrc] = useState<any>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {


    console.log(values);
  }
  const pathname = usePathname();
  const [activeDiv, setActiveDiv] = useState(0);

  const handleClick = (index: any) => {
    setActiveDiv(index);
  };

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
        const filename = file?.name;
        console.log("file name", filename);
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

          console.log("File uploaded", res);
          setImageSrc(res?.data?.data);
          console.log(res?.data?.data, "this is the file url");
          SuccessToast("File Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function createCenter(values: z.infer<typeof formSchema>) {
    console.log("my val", values);
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        userId: userID,
        subject: Subject,
        description: Description,
        Attachments: imgSrc,
      };
      dispatch(createHelpCenter(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Profile res", res?.payload?.data);
          SuccessToast("Profile Updated Successfully");
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
    <div className="w-full lg:w-[604px] px-[24px] lg:ps-[170px]  mt-[45px] md:mx-auto  lg:mt-[92px] lg:mx-0 relative lg:h-[auto] h-[90vh] ">
      <h2 className="font-bold ms-[24px] lg:ms-[0px] text-[24px] lg:text-[32px] mb-[24px] sm:mb-[53px] lg:text-[16px]">
        Help Center
      </h2>
      <div className="flex gap-[8px] hidden">
        {["General", "Account", "Login"].map((text, index) => (
          <div
            key={index}
            style={{
              background:
                activeDiv === index
                  ? "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box"
                  : "linear-gradient(#0F0F0F, #1A1A1A) padding-box",
              borderImage:
                activeDiv === index
                  ? "linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%)"
                  : "none",
              borderImageSlice: activeDiv === index ? 1 : undefined,
            }}
            className={`text-sm font-bold p-[12px] rounded-[44px] border w-[92px] text-center cursor-pointer ${
              activeDiv === index
                ? "text-green-500 border-[0.86px] rounded-[44px] bg-[#1A1A1A]"
                : "text-[#E6E6E6] border-[#FFFFFF0F] gradient-slate"
            }`}
            onClick={() => handleClick(index)}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-col gap-6 md:gap-8 mt-[12px] lg:mt-[30]">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(createCenter)}
              className=" w-full"
            >
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-extrabold md:font-bold absolute left-3 top-3">
                      SUBJECT
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Subject"
                        className="pt-11 pb-5 text-[#D9D9D9] text-base placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setSubject(e.target.value);
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
                name="description"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Vorem ipsum dolor sit amet consectetur"
                        className="pt-[36px] pb-5 h-[136px] text-[#D9D9D9] text-base placeholder:font-normal resize-none"
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
              />
              <div
                className={cn(
                  "gradient-slate border border-muted cursor-pointer w-full flex justify-between rounded-lg items-center  px-[12px] md:px-3 py-[16px] md:py-5 hover:border-[#13FF7A] duration-300"
                )}
              >
                <label
                  htmlFor="upload"
                  className="flex gap-2 items-center justify-between w-full cursor-pointer"
                >
                  <p className="text-base font-extrabold mb-0 ">Attachments</p>
                  <Image
                    src={upload}
                    alt="upload"
                    className="md:w-[28px] md:h-[28px] w-[16px] h-[16px]"
                  />
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  id="upload"
                  onChange={handleSingleFileChange}
                />
              </div>
              <div className="flex justify-start md:relative absolute bottom-[0px] mb-[32px] w-[90%] sm:w-[200px] mt-[50px]">
                <Button
                  type="submit"
                  className="w-full p-[12px] font-extrabold py-[12px] text-sm md:text-base "
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OrganizerHelpcenter;
