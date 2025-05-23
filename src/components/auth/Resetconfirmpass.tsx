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
import { PasswordInput } from "@/components/ui/password-input";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/hooks";
import logo from "../../assets/N UFO TEXT LOGO.svg";
import Image from "next/image";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";

import { useRouter } from "next/navigation";

import { newPassword } from "@/lib/middleware/signin";
import ScreenLoader from "../loader/Screenloader";
const formSchema = z
  .object({
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

    confirm_password: z
      .string()
      .min(1, { message: "Confirm Password cannot be empty." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

const Resetconfirmpass = () => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();
  const [passcode, setPasscode] = useState<any>();

  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl?.split("/");
    const value = parts[parts.length - 1];
    setPasscode(value);
    console.log("myy", value);
  }, []);

  const [loader, setLoader] = useState(false);
  const [comfirmpass, setComfirmResetpass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handlerResetPass = () => {
    setComfirmResetpass(!comfirmpass);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onNewPassword = (values: z.infer<typeof formSchema>) => {
    setLoader(true);
    const data = {
      password: password,
      verificationCode: passcode,
    };
    dispatch(newPassword(data)).then((res: any) => {
      if (res?.payload?.status === 200) {
        setLoader(false);
        SuccessToast("Password Reset Successfully");
        router.push("/");
        // setModalShow(true);
        // navigate("/New-Password");
      } else {
        ErrorToast(res?.payload?.message);
        setLoader(false);
      }
    });
  };

  return (
    <div className="bg-image">
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)),",
          backgroundPosition: "center",
        }}
        className="min-h-screen w-full py-[8rem] bg-cover bg-no-repeat"
      >
        {loader && <ScreenLoader />}
        <div className="resetpass-stlying-main-div">
          {" "}
          <Image alt="Logo" src={logo} className="logo-stlying" />
          <Separator className="scale-x-[1.09] bg-[#292929]" />
          <div className="font-extrabold text-2xl resetpass-stlying">
            Reset <span className="text-primary">Password</span>
          </div>
          <div className=" pb-[20px] font-bold text-sm opacity-70">
            Enter your new password
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onNewPassword)}
              className=" space-y-4 mb-14 "
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3 z-10">
                      PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute top-[8px] right-3 translate-y-[0.9rem] z-10"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        placeholder="Input password"
                        className="pt-11 pb-5 placeholder:text-[#D9D9D9] placeholder:text-base placeholder:font-normal"
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
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="relative space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3 z-10">
                     CONFIRM PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute top-[8px] right-3 translate-y-[0.9rem] z-10"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        placeholder="Input password again"
                        className="pt-11 pb-5 placeholder:text-[#D9D9D9] placeholder:text-base placeholder:font-normal"
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
              <Button type="submit" className="font-extrabold w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};
export default Resetconfirmpass;
