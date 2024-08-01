"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import ufo from "@/assets/ufo.png";
import metamask from "@/assets/metamask.svg";

import { useRef } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Envelope, GoogleLogo, Lock } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthMode } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

// import ufo from "@/assets/ufo.png";

import "./AccountVerificationModal.css";

const formSchema = z.object({
  textbox: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .max(1, { message: "Only one character or number is allowed." })
    .regex(/^[a-zA-Z0-9]$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox1: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox2: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox3: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
});

const AccountVerificationModal = ({
  setAuthMode,
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textbox: "",
      textbox1: "",
      textbox2: "",
      textbox3: "",
    },
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log("my values" ,values);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      const nextInput = inputRefs[index + 1];
      if (nextInput && nextInput.current) {
        nextInput.current.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevInput = inputRefs[index - 1];
      if (prevInput && prevInput.current) {
        prevInput.current.focus();
      }
    }
    
  }

  return (
    <DialogContent className="sm:max-w-md lg:max-w-[600px] pb-4 pt-0">
      <ScrollArea className="max-h-[90vh]">
        <DialogHeader className="relative overflow-hidden pt-4">
          <DialogTitle className="font-bold text-2xl">
            Account <span className="text-primary">Verification</span>
          </DialogTitle>
          <Image
            src={ufo}
            width={100}
            height={100}
            className="absolute right-0 scale-[2]"
            alt="ufo"
          />
          <Separator className="scale-x-[1.09] bg-[#292929]" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="input-stlying">
              {["textbox", "textbox1", "textbox2", "textbox3"].map(
                (name, index) => (
                  <FormField
                    Key={name}  
                    control={form.control}
                    name={name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem className="relative">

                        <FormControl>
                          <Input
                            placeholder=""
                            className="accnt-verification-input text-center font-bold placeholder:font-normal"
                            {...field}
                            ref={inputRefs[index]}
                            onChange={(e) => {
                              if (e.target.value.length <= 1) {
                                field.onChange(e);
                                 }
                              if (e.target.value.length === 1) {
                                const nextInput = inputRefs[index + 1];
                                if (nextInput && nextInput.current) {
                                  nextInput.current.focus();
                                }
                              }
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                )
              )}
            </div>
          </form>
          <button className="opacity-70 font-bold mb-14 hover:opacity-100 underline translate-y-[-0.4rem]">
            Didn't receive the code? Request again
          </button>
          <DialogFooter className="w-full pt-4 bg-[#101010] border-t border-muted">
            <Button type="submit" className="font-bold w-full">
              Verify
            </Button>
          </DialogFooter>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default AccountVerificationModal;
