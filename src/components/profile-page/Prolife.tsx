"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ScreenLoader from "../loader/Screenloader";
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
    const userid = typeof window !== "undefined" ?  localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(showProfile(userid));
  }, []);

  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );

  console.log("my Profile is", myProfile);
  const userLoading = useAppSelector((state) => state?.getShowProfile);

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

  const imageUrl = myProfile?.profilePicture?.startsWith("http" || "https")
    ? myProfile?.profilePicture
    : "/person3.jpg";
  console.log("image src is", imageUrl);
  return (
    <div className="w-full ps-[0px] xl:ps-[172px] md:px-auto lg:w-full lg:mx-0">
      {userLoading?.loading && <ScreenLoader />}
      <div>
        <div className="flex mt-[45px] flex-col  gap-[30px] md:gap-[36px] justify-center items-start lg:mt-[150px]">
          <div className="flex flex-col justify-center lg:mx-0 md:gap-[32px] gap-[32px] w-fit">
            <h2 className="font-extrabold text-[20px] lg:ms-[0px] ms-[24px] lg:text-[32px]">
              Profile
            </h2>
          </div>
          <div className="lg:w-auto xl:w-auto w-full">
            <div className="flex flex-col lg:flex-row md-flex-row gap-[32px]" >
              <div className="flex justify-center w-full items-center">
                <GradientBorder className="rounded-full p-[3px] w-fit">
                  <div className="bg-black rounded-full p-[6px]">
                    <Image
                      src={
                        myProfile?.profilePicture
                          ? myProfile?.profilePicture
                          : "/person3.jpg"
                      }
                      width={216}
                      height={216}
                      className=" w-[156px] h-[156px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
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
                <h2 className="text-[28px] font-extrabold text-center lg:text-start xl:text-start  leading-[31.36px] mb-[24px] md:mb-[33px]">
                  {myProfile?.fullname}
                </h2>

                <div
                  style={{
                    background:
                      "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                  }}
                  className="flex bg-[#0F0F0F] rounded-[6.89px] gap-[20px] justify-evenly  py-[16px] lg:py-[13.77px] w-[100%] lg:w-[428px] xl:w-[428px] border-[0.86px] border-transparent"
                >
                  <div className="flex flex-col items-center justify-center ">
                    <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
                      {myProfile?.attendees !== null
                        ? myProfile?.attendees
                        : "0"}
                    </h2>
                    <p className="text-[#A6A6A6]  text-[10px] lg:text-[8px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
                      ATTENDEES
                    </p>
                  </div>
                  <div className="h-[58.01px] border-l border-[#292929] mx-2"></div>
                  <div className="flex flex-col items-center justify-center ">
                    <h2 className="font-normal md:text-[20px] text-[24px] mb-0">
                      324
                    </h2>
                    <p className="text-[#A6A6A6] md:text-[8px] text-[10px] mt-[8px] md:mt-[6.89px] font-normal mb-0">
                      FOLLOWING
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
