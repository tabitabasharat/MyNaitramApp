"use client";
import React from "react";
import "./AccountVerificationModal.css";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import ufo from "@/assets/ufo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthMode } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Envelope, GoogleLogo, Lock } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import logo from "../../assets/N UFO TEXT LOGO.svg";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { forgetPassword } from "@/lib/middleware/signin";
import { useRouter } from "next/navigation";
import ScreenLoader from "../loader/Screenloader";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),
});
const ResetPassPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<any>();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // :white_tick: This will be type-safe and validated.
  //   console.log(values);
  // }

  const onForgotPassword = (values: z.infer<typeof formSchema>) => {
    setLoader(true);
    const data = {
      email: email,
    };
    try {
      dispatch(forgetPassword(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          SuccessToast("Email Sent Successfully");
          console.log("Email Sent Successfully");

          
        } else {
          console.log(res?.payload?.message);
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
      ErrorToast(error);
    }
  };
  return (
    <div className="bg-image">
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)),",
          backgroundPosition: "center",
        }}
        className="min-h-screen py-[8rem] bg-cover bg-no-repeat"
      >
        {loader && <ScreenLoader />}
        <div className="resetpass-stlying-main-div">
          <Image alt="logo" src={logo} className="logo-stlying" />
          <Separator className="scale-x-[1.09] bg-[#292929]" />
          <div className="font-extrabold text-2xl resetpass-stlying">
            Reset <span className="text-primary">Password</span>
          </div>
          <div className=" pb-[20px] font-bold text-sm opacity-70">
            Please enter the email address associated with<br className="hidden lg:block"/> your account.
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onForgotPassword)}
              className=" space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative mt-0 space-y-0 mb-[50px]">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute top-[8px] right-3 translate-y-[0.9rem] z-10"

                     
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 placeholder:text-[#D9D9D9] placeholder:text-sm placeholder:font-normal"
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
              <Button type="submit" className="lg:text-base text-sm font-extrabold w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};
export default ResetPassPage;
