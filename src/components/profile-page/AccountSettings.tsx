"use client";

import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState, useRef } from "react";
import { getUserByID } from "@/lib/middleware/profile";
import { updateProfile } from "@/lib/middleware/profile";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import local from "next/font/local";
import api from "@/lib/apiInterceptor";
import { API_URL } from "@/lib/client";
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
});

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getUserByID(userid));
  }, []);

  const myProfile = useAppSelector(
    (state) => state?.getUserDetail?.userProfile?.data
  );

  console.log("my Profile info is", myProfile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.

  //   console.log(values);
  // }

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
        password: Password,
        fullName: name,
        userId: userID,

        isActive: false,
        profilePicture: imageSrc,
      };
      dispatch(updateProfile(data)).then((res: any) => {
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
  useEffect(() => {
    if (myProfile) {
      form.reset({
        full_name: myProfile?.fullname || "",
        email: myProfile?.email || "",
        password: myProfile?.password || "",
      });
    }
    if (myProfile?.profilePicture) {
      setImageSrc(myProfile?.profilePicture);
    } else {
      setImageSrc("/person3.jpg");
    }
  }, [myProfile, form]);
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px] ps-[12px]">
        Account Settings
      </h2>
      <div className="flex flex-col lg:flex-row gap-8 mt-8  lg:mt-10">
        <div className="flex flex-col mx-auto lg:mx-0 gap-4 items-center justify-center w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px]">
              <label htmlFor="upload">
                <Image
                  src={imageSrc}
                  width={500}
                  height={500}
                  className="size-[216px] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] object-cover object-top rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="DP"
                />
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png image/jpg image/jpeg image/svg"
                // accept="image/*"

                className="hidden"
                id="upload"
                onChange={handleSingleFileChange}
              />
            </div>
          </GradientBorder>
          <Button
           onClick={() => fileInputRef.current?.click()} 
            variant="secondary"
            className="md:w-[250px] w-[100%] py-[8px] text-base px-[12px]"
          >
            Change Photo Profile
          </Button>
        </div>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(profileclick)} className=" w-full">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="relative mb-6">
                    <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3">
                      FULL NAME
                    </FormLabel>
                    <User
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter Fullname"
                        className="pt-11 pb-5 font-bold text-base placeholder:font-normal"
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
                  <FormItem className="relative mb-6">
                    <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 text-base font-bold placeholder:font-normal"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative mb-2">
                    <FormLabel className="text-[12px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                      PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute right-3 translate-y-[0.9rem] z-10"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        placeholder="Input password"
                        className="pt-11 pb-5 base font-bold placeholder:font-normal"
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
              <button className="opacity-70 text-sm pt-2 text-[12px] font-bold hover:opacity-100 underline translate-y-[-0.4rem]">
                Want to change your password?
              </button>
              <div className="flex justify-start lg:justify-end">
                <Button
                  type="submit"
               
                  className="w-full md:mt-[32px] mt-[57px] text-base md:w-fit"
                >
                  Update Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
