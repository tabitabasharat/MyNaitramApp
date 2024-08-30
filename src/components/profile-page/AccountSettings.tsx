"use client";

import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import { useState, useEffect, useRef } from "react";
import { getUserByID, updateProfile } from "@/lib/middleware/profile";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
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
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const myProfile = useAppSelector(
    (state) => state?.getUserDetail?.userProfile?.data
  );

  console.log("my Profile info is", myProfile);

  const userLoading = useAppSelector((state) => state?.getUserDetail);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

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

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getUserByID(userid));
  }, []);

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
  return (
    <div className="w-full lg:w-[70%] ps-[0px] xl:ps-[182px] md:mx-auto lg:w-full mt-[48px] lg:mt-[150px] lg:mx-0 relative h-[90vh]">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-bold ms-[24px] md:ms-[24px] lg:ms-[0px] text-[20px] lg:text-[32px]">
        Account Settings
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
        <div className="w-full lg:w-[428px]">
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
                    <User
                      className="absolute right-3  top-[35%]"
                      size={20}
                    />
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
              {/* <div className="flex justify-start lg:justify-end md:mt-[32px] mt-[57px]">
                <Button
                  type="submit"
                  className="w-full  px-[30.5px] py-[12px] mb-[77px] md:mb-[0px] font-extrabold text-base md:w-fit"
                >
                  Update Changes
                </Button>
              </div> */}

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
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
