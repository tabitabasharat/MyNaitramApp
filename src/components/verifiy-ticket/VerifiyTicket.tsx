"use client";
import React from "react";
import backward from "@/assets/Back - Button.svg";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import { useEffect } from "react";
import { z } from "zod";
// import { Image } from "next/image";
import Image from "next/image";
import ticket from "@/assets/Ticket2.svg";
import arrow from "@/assets/Arrow Right.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

// const formSchema = z.object({
//   subject: z.string().min(1, { message: "Subject cannot be empty." }),
// });

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject cannot be empty." }),
});

function VerifiyTicket() {
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       subject: "",
  //     },
  //   });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userid = localStorage.getItem("_id");
      console.log("user id ", userid);
      dispatch(getUserSocialProfile(userid));
    }
  }, []);
  const myProfile = useAppSelector(
    (state) => state?.getUserSocialProfile?.myProfile?.data
  );

  console.log("my Social Profile info is", myProfile);
  return (
    <div>
      <section className="min-h-screen bg-cover bg-no-repeat bg-reward">
        <div className="lg:pt-[134px] lg:pb-[116px] w-full pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
          <div className="flex gap-[16px] mb-[25px] md:mb-[32px] items-center ">
            <button onClick={() => router.back()}>
              <Image
                src={backward}
                alt="backward-btn"
                className="md:w-[44px] md:h-[44px] h-[28px] w-[28px]"
              />
            </button>
            <h3 className="font-extrabold text-[20px] lg:text-[24px] ">
              Verify Ticket
            </h3>
          </div>
          <h2 className="text-sm lg:text-base text-[#BFBFBF] font-bold mb-[31px] lg:mb-[32px]">
            Ensure the authenticity of your event ticket by verifying it on the
            blockchain.
            <br className="hide-text" /> Each ticket is securely minted and
            recorded on the blockchain, guaranteeing
            <br className="hide-text" /> its legitimate and tamper-proof.{" "}
          </h2>
          <p className="text-sm lg:text-base text-[#BFBFBF] font-bold mb-[31px] lg:mb-[32px]">
            {" "}
            Simply click the button below to confirm the
             ownership and details of your<br className="hide-text" /> ticket
            directly on the blockchain.
          </p>

          <Form {...form}>
            <form
              //   onSubmit={form.handleSubmit(createCenter)}
              className=" w-full md:w-[600px]"
            >
              <FormField
                // control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] ms-[35px] text-[#8F8F8F] font-extrabold md:font-bold absolute left-3 top-3">
                      TICKET ID
                    </FormLabel>
                    <Image
                      src={arrow}
                      alt="arrow"
                      className="absolute right-3 top-[33%]"
                    />
                    <Image
                      src={ticket}
                      alt="ticket"
                      className="absolute left-3 top-[30%]"
                    />
                    <FormControl>
                      <Input
                        placeholder="1234567890"
                        className="pt-11 pb-5 ps-[45px] placeholder:text-white placeholder:text-base placeholder:font-normal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <p className="text-[18px] py-[31px] md:py-8 md:text-[20px] font-extrabold">
            TERMS & CONDITIONS
          </p>
          <p className="text-sm lg:text-base text-[#BFBFBF] font-bold">
            By using the "Verify Your Ticket on the Blockchain" service, you
            agree to these<br className="hide-text" /> terms. This feature ensures the authenticity of your
            ticket by confirming its<br className="hide-text" /> validity and ownership directly on the
            blockchain. It applies only to tickets<br className="hide-text" /> purchased through our
            platform or authorized channels, and does not allow for <br className="hide-text" />ticket
            transfer or resale.
          </p>
          <p className="md:mt-[32px] text-sm lg:text-base text-[#BFBFBF] font-bold mt-[24px]">
            This service is provided as-is and may experience interruptions or
            downtime due <br className="hide-text" />to maintenance or network issues; while we aim for
            accurate and reliable<br className="hide-text" /> verification, we are not liable for any issues
            related to technical delays,<br className="hide-text" /> unauthorized ticket purchases, or
            disputes.
          </p>
        </div>
      </section>
    </div>
  );
}

export default VerifiyTicket;
