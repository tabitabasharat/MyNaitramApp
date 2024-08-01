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
import Resetconfirmpass from "./Resetconfirmpass";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),
});

const ResetPassPage = ({
  setAuthMode,
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }

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
        <div className="resetpass-stlying-main-div">
          {" "}
          <Image src={logo} className="logo-stlying" />
          <Separator className="scale-x-[1.09] bg-[#292929]" />
          <div className="font-bold text-2xl resetpass-stlying">
            Reset <span className="text-primary">Password</span>
          </div>
          <div className=" pb-4 font-bold opacity-70">
            Please enter the email address associated with your account.
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative mt-0 mb-14">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="font-bold w-full">
                <Link href="/auth/resetcomfirmpass">Submit</Link>
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default ResetPassPage;
