"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CaretLeft,
  Envelope,
  Phone,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const formSchema = z.object({
  phone: z.number().min(1, {
    message: "Phone Number cannot be empty.",
  }),
});

const CompleteYourProfileModal = ({
  onNext,
  handleNext,
  setProfileInformation,
}: {
  onNext: () => void;
  handleNext: any;
  setProfileInformation: any;
}) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone:undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Combine form values with the name from localStorage
    const profileData = { ...values, full_name: name };
    setProfileInformation(profileData);
    onNext();
    console.log(profileData);
  }

  useEffect(() => {
    const email =
      typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
    const name =
      typeof window !== "undefined" ? localStorage.getItem("name") || "" : "";
    setName(name);
    setEmail(email);
  }, []);

  return (
    <DialogContent className="sm:max-w-[550px] lg:max-w-[650px]">
      <DialogHeader>
        <DialogTitle className="font-bold text-2xl">
          <div className="flex items-center gap-4 pb-4">
            <button
              onClick={() => handleNext("BuyTicket")}
              className="bg-white/10 p-2 w-fit rounded-full cursor-pointer"
            >
              <CaretLeft size={17} weight="bold" />
            </button>
            <p>Complete Your Profile</p>
          </div>
        </DialogTitle>
        <Separator className="scale--[1.12] bg-[#292929]" />
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Removed Full Name input field */}
          <FormItem className="relative w-full">
            <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">
              FULL NAME
            </FormLabel>
            <User className="absolute right-3 translate-y-[0.9rem]" size={20} />
            <FormControl>
              <Input
                disabled
                placeholder={name}
                className="pt-10 pb-5 font-bold placeholder:font-normal"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* <FormItem className="relative w-full">
              <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                EMAIL
              </FormLabel>
              <Envelope
                className="absolute right-3 translate-y-[1.2rem]"
                size={20}
              />
              <FormControl>
                <Input
                  disabled
                  placeholder={email}
                  className="pt-10 pb-5 font-bold placeholder:font-normal"
                />
              </FormControl>

              <FormMessage />
            </FormItem> */}
            <FormItem className="relative w-full">
              <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                EMAIL
              </FormLabel>
              <Envelope
                className="absolute right-3 z-10 translate-y-[1.2rem]"
                size={20}
              />
              <FormControl className="">
                <Input
                  disabled
                  placeholder={email}
                  className="pt-10 pb-5 font-bold placeholder:font-normal overflow-x-auto whitespace-nowrap"
                  style={{ width: "100%", paddingRight: "2.5rem" }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                    PHONE NUMBER
                  </FormLabel>
                  <Phone
                    className="absolute right-3 translate-y-[1.2rem]"
                    size={20}
                  />
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="+00 000-000"
                      className="pt-10 pb-5 font-bold placeholder:font-normal"
                      {...field}
                      onChange={(event) => {
                        const value = event.target.value;
                        field.onChange(value ? +value : undefined);
                      }}
                      // onChange={(event) => field.onChange(+event.target.value)} 
                    
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
            <Button type="submit" className="w-fit px-8">
              Go to Payments
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CompleteYourProfileModal;
