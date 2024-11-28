"use client";

import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CaretLeft, Envelope, Phone, User } from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { API_URL } from "@/lib/client";
import axios from "axios";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";

const formSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?\d*$/, { message: "Phone number may start with '+' and should only contain numeric characters." })
    .optional(),
  CSVadditnals: z.array(
    z.object({
      ans: z.string().min(1, { message: "Title cannot be empty!" }),
    })
  ),
});

const CompleteYourProfileModal = ({
  onNext,
  handleNext,
  setProfileInformation,
  currentTicketType,
  setCurrentModal,
}: {
  onNext: () => void;
  handleNext: any;
  setProfileInformation: any;
  currentTicketType: string;
  setCurrentModal: any;
}) => {
  console.log("this is ticket type in modal", currentTicketType);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rsvpFields, setRsvpFields] = useState<string>("");
  const [ticketDat, setTicketData] = useState<any>([]);
  const [rsvpTicketType, setRsvpType] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [eventID, setEventID] = useState<any>();
  const [userID, setUserID] = useState<any>();
  const [paswrdError, setPaswrdError] = useState<boolean>(false);
  const [pswrdValue, setPswrdValue] = useState<string>("");
  const [isPSWRDticket, setIsPaswordTicket] = useState<string>("");
  const [passTrue, setPasswordTrue] = useState<boolean>(false);

  const checkPswrd = () => {
    console.log("clicked on next");
    if (ticketDat[0]?.passwordFields?.includes(pswrdValue)) {
      setPasswordTrue(true);
    } else {
      setPasswordTrue(false);
      setPswrdValue("");
      setPaswrdError(true);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: currentTicketType === "RSVP Ticketing" ? "+1234567891011" : undefined,
      CSVadditnals: currentTicketType === "RSVP Ticketing" ? [] : [{ ans: "NOT Need" }],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit() {
    const allValues = form.getValues();
    console.log("Form is submitting yaaaar!!");
    let profileData = {};
    if (ticketDat[0]?.selectedEventTicketType === "RSVP Ticketing") {
      const phoneValue = form.getValues("phone");
      // console.log("This is Phone Field valuw====> ", phoneValue);
      // if (phoneValue === "" && ticketDat[0]?.rsvpNumber === false) {
      //   form.setValue("phone", "+12345678910");
      // }
      formSchema.parse(allValues);

      let additionalAns = allValues.CSVadditnals.reduce((acc: Record<string, any>, v: any, index: number) => {
        const key = ticketDat[0]?.rsvpAdditionalFields[index];
        if (key) {
          acc[key] = v.ans; // Add the key-value pair to the accumulator
        }
        return acc;
      }, {});

      if (ticketDat[0]?.rsvpName) {
        additionalAns = {
          ...additionalAns,
          name: name,
        };
      }

      if (ticketDat[0]?.rsvpMail) {
        additionalAns = {
          ...additionalAns,
          email: email,
        };
      }
      if (ticketDat[0]?.rsvpNumber) {
        additionalAns = {
          ...additionalAns,
          phoneNo: phoneValue,
        };
      }

      profileData = { ...allValues, full_name: name, email, ...additionalAns };
      setProfileInformation(profileData);
      setCurrentModal("RSCVsubmissionModel");
      try {
        setLoader(true);

        const data = await axios.post(`${API_URL}/event/createRsvpBatch`, {
          eventId: eventID,
          rsvpData: [additionalAns],
          userId: userID,
        });

        setLoader(false);

        if (data?.data?.url) {
          typeof window !== "undefined" ? (window.location.href = data?.data?.url) : null;
        } else {
          console.error("No URL received");
        }
      } catch (error: any) {
        setLoader(false);
        ErrorToast(error?.response?.data?.error);
        console.log("this is the error", error);
      }
    } else {
      formSchema.parse(allValues);
      profileData = { ...allValues, full_name: name, email };
      setProfileInformation(profileData);
      onNext();
    }
    console.log(profileData);
  }

  useEffect(() => {
    const email = typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
    const name = typeof window !== "undefined" ? localStorage.getItem("name") || "" : "";
    setName(name);
    setEmail(email);
    setRsvpType(currentTicketType);
  }, []);

  const EventDatas = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents);

  useEffect(() => {
    setTicketData(EventDatas?.data?.tickets?.filter((t: any) => t?.selectedEventTicketType === currentTicketType));
    setEventID(EventDatas?.data?.id);
    setUserID(EventDatas?.data?.userId);
  }, [EventDatas]);

  useEffect(() => {
    console.log("my data in Profile page tickets", ticketDat, "\nType is  ", currentTicketType);
    if (ticketDat[0]?.rsvpNumber) {
      form.setValue("phone", "");
    }
    setIsPaswordTicket(ticketDat[0]?.selectedEventTicketType);
  }, [ticketDat]);

  useEffect(() => {
    console.log("sdjhdshjdfjhfdjdhfjdf => ", isPSWRDticket);
  }, [isPSWRDticket]);

  return (
    <DialogContent className="sm:max-w-[550px] lg:max-w-[650px]">
      <DialogHeader>
        <DialogTitle className="font-bold text-2xl">
          <div className="flex items-center gap-4 pb-4">
            <button onClick={() => handleNext("BuyTicket")} className="bg-white/10 p-2 w-fit rounded-full cursor-pointer">
              <CaretLeft size={17} weight="bold" />
            </button>
            <p>Complete Your Profile</p>
          </div>
        </DialogTitle>
        <Separator className="scale--[1.12] bg-[#292929]" />
      </DialogHeader>
      {currentTicketType === "Passworded / Discounted Voucher Event" && passTrue == false ? (
        <>
          <div className="flex flex-col gap-2 w-full max-h-30 overflow-auto">
            <div className="relative w-full">
              <label className="text-[11px] text-[#8F8F8F] absolute w-full flex items-center justify-center top-3">PASSWORD</label>
              <input
                value={pswrdValue}
                onChange={(e) => {
                  setPaswrdError(false);
                  setPswrdValue(e.target.value);
                }}
                placeholder="Enter the password for this event"
                className="pt-10 pb-5 text-center font-bold placeholder:font-normal w-full border border-gray-300 rounded-md"
              />
              <p className="text-red-500 text-sm mt-1">{paswrdError ? "" : "password is wrong"}</p>
            </div>

            <Button onClick={checkPswrd} className="w-fit px-8">
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {ticketDat[0]?.selectedEventTicketType === "RSVP Ticketing" ? (
                <>
                  {/* Removed Full Name input field */}
                  {/* Name */}
                  {ticketDat[0]?.rsvpName && (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">FULL NAME</FormLabel>
                      <User className="absolute right-3 translate-y-[0.9rem]" size={20} />
                      <FormControl>
                        <Input disabled placeholder={name} className="pt-10 pb-5 font-bold placeholder:font-normal" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}

                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Email */}
                    {ticketDat[0]?.rsvpMail && (
                      <FormItem className="relative w-full  ">
                        <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">EMAIL</FormLabel>
                        <Envelope className="absolute right-3 z-10 translate-y-[1.2rem]" size={20} />
                        <FormControl className="">
                          <Input
                            disabled
                            // placeholder={email}
                            value={email}
                            className="pt-10 pb-5 font-bold placeholder:font-normal  whitespace-nowrap w-full overflow-x-auto"
                            style={{ paddingRight: "2.5rem" }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}

                    {/* Number */}
                    {ticketDat[0]?.rsvpNumber && (
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="relative w-full">
                            <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">PHONE NUMBER</FormLabel>
                            <Phone className="absolute right-3 translate-y-[1.2rem]" size={20} />
                            <FormControl>
                              <Input
                                type="tel"
                                inputMode="numeric"
                                pattern="\d*"
                                placeholder="+00 000-000"
                                className="pt-10 pb-5 font-bold placeholder:font-normal"
                                {...field}
                                onChange={(e: any) => {
                                  field.onChange(e);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key.match(/[^0-9]/) && !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-full max-h-30 overflow-auto">
                    {ticketDat[0]?.rsvpAdditionalFields.map((addName: string, index: number) => {
                      return (
                        <FormField
                          control={form.control}
                          name={`CSVadditnals.${index}.ans`}
                          render={({ field }) => (
                            <FormItem className="relative w-full">
                              <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">{addName.toUpperCase()}</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder={`Enter ${addName}`}
                                  className="pt-10 pb-5 font-bold placeholder:font-normal"
                                  {...field}
                                  onChange={(e: any) => {
                                    field.onChange(e);
                                  }}
                                  onKeyDown={(e) => {}}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* Removed Full Name input field */}
                  <FormItem className="relative w-full">
                    <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">FULL NAME</FormLabel>
                    <User className="absolute right-3 translate-y-[0.9rem]" size={20} />
                    <FormControl>
                      <Input disabled placeholder={name} className="pt-10 pb-5 font-bold placeholder:font-normal" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>

                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <FormItem className="relative w-full  ">
                      <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">EMAIL</FormLabel>
                      <Envelope className="absolute right-3 z-10 translate-y-[1.2rem]" size={20} />
                      <FormControl className="">
                        <Input
                          disabled
                          // placeholder={email}
                          value={email}
                          className="pt-10 pb-5 font-bold placeholder:font-normal  whitespace-nowrap w-full overflow-x-auto"
                          style={{ paddingRight: "2.5rem" }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">PHONE NUMBER</FormLabel>
                          <Phone className="absolute right-3 translate-y-[1.2rem]" size={20} />
                          <FormControl>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              pattern="\d*"
                              placeholder="+00 000-000"
                              className="pt-10 pb-5 font-bold placeholder:font-normal"
                              {...field}
                              onChange={(e: any) => {
                                field.onChange(e);
                              }}
                              onKeyDown={(e) => {
                                if (e.key.match(/[^0-9]/) && !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
                <Button onClick={() => onSubmit()} className="w-fit px-8">
                  Go to Payments
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </>
      )}
    </DialogContent>
  );
};

export default CompleteYourProfileModal;
