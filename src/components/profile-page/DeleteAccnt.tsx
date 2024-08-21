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

const DeleteAccnt = () => {
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
  return (
    <div className="w-full md:w-[70%] md:mx-auto flex flex-col justify-start lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px] ps-[12px]">
        Delete Account
      </h2>
      <div className="flex flex-col justify-start lg:flex-row gap-8 mt-8 items-center lg:mt-10">
        <div className="flex flex-col lg:mx-0 gap-4 w-fit">
          <GradientBorder className="rounded-full p-[3px] w-fit">
            <div className="bg-black rounded-full p-[6px]">
              <Image
                src={"/person3.jpg"}
                width={500}
                height={500}
                className="size-[216px] w-[156px] h-[156px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1200, 1800)
                )}`}
                alt="DP"
              />
            </div>
          </GradientBorder>
        </div>
        <div>
          <h2 className="text-[#BFBFBF] text-sm font-bold">
            Are you sure you want to delete your account?
            <br className="hidden sm:inline" />
            You will lose all your data by deleting your account.
          </h2>
          <div className="flex flex-col absolute bottom-[68px] w-[85%] items-center justify-center sm:relative sm:w-auto sm:bottom-auto">
            <button className="my-[32px] bg-[#FF1717] text-white w-full sm:w-[428px] p-[12px] rounded-[200px] text-base font-bold">
              Delete Account
            </button>
            <button className="bg-[#00A849] text-black w-full sm:w-[428px] p-[12px] rounded-[200px] text-base font-bold">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccnt;
