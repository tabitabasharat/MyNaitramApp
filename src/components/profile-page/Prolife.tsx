"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";
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

const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(showProfile(userid));
  }, []);

  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );

  console.log("my Profile is", myProfile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "Sohail Hussain",
      email: "sohailhussain@gmail.com",
      password: "Sohail435%*$",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }

  const imageUrl = myProfile?.profilePicture.startsWith("http" || "https")
    ? myProfile?.profilePicture
    : "/person3.jpg";
  console.log("image src is", imageUrl);
  return (
    <div className="w-full md:w-[70%] md:px-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] ps-[12px] sm:ps-[0px] lg:text-[32px]">
        Profile
      </h2>
      <div className="flex flex-col lg:flex-row gap-[24px] mt-8 justify-start items-center lg:mt-10">
        <div className="flex flex-col items-center justify-center lg:mx-0 gap-[32px] w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px]">
              <Image
                src={
                  myProfile?.profilePicture
                    ? myProfile?.profilePicture
                    : "/person3.jpg "
                }
                width={200}
                height={200}
                className="size-[216px] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] object-cover object-top rounded-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1200, 1800)
                )}`}
                alt="DP"
              />
            </div>
          </GradientBorder>
          {myProfile?.isTopUser === true && (
            <Button
              variant="secondary"
              className="text-[#13FF7A] rounded-[200px] px-[10] py-[25px] md:p-[12px] bg-[#FFFFFF0F] text-base font-bold w-[100%] md:w-[250px]"
            >
              Top User
            </Button>
          )}
        </div>
        <div>
          <h2 className="text-[28px] font-bold text-center sm:text-start leading-[31.36px] mb-[24px] md:mb-[33px] capitalize">
            {myProfile?.fullname}
          </h2>
          <div className="flex divide-x divide-[#292929] bg-[#0F0F0F] rounded-[6.89px] justify-center py-[13.77px] md:px-[76.89px] px-[82.5px] w-[100%] xl:w-[428px] border border-[#0FFF7752]">
            <div className="flex flex-col items-center pe-[10px] sm:pe-[73px]">
              <h2 className="font-normal text-[20px] mb-0">
                {myProfile?.attendees !== null ? myProfile?.attendees : "0"}
              </h2>
              <p className="text-[#A6A6A6] text-[8px] font-normal mb-0">
                ATTENDEES
              </p>
            </div>
            {/* <p className='h-[100px] border border:solid divide-x #292929'></p> */}
            <div className="flex flex-col items-center ps-[10px] sm:ps-[73px]">
              <h2 className="font-normal text-[20px] mb-0">324</h2>
              <p className="text-[#A6A6A6] text-[8px] font-normal mb-0">
                Following
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
