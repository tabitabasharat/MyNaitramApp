"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
} from "@/components/ui/newdialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Iconpop from "@/assets/launchprofileicon.svg";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { deleteAccount } from "@/lib/middleware/profile";
import { Wall, Wallet } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import close from "@/assets/close12.svg";
import { Envelope, TelegramLogo } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import tick from "@/assets/fi-rr-check.svg";
import { EventSubmmitModal } from "@/components/EventSubmmitModal/EventSubmmitModal";
import { createevent } from "@/lib/middleware/event";
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import ScreenLoader from "@/components/loader/Screenloader";
type Option = {
  id: number;
  label: string;
};
const options: Option[] = [
  { id: 1, label: "Ethereum" },
  { id: 2, label: "Binance Smart Chain" },
  { id: 3, label: "Tron" },
  { id: 4, label: "Polygon" },
  { id: 5, label: "Bitcoin" },
  { id: 6, label: "Avalanch" },
  { id: 7, label: "Solana" },
];

const formSchema = z.object({
  walletAddress: z
    .string()
    .min(1, { message: "Email cannot be empty." }) // Ensures the email is not empty
    .email({ message: "Invalid email address." }), // Ensures the string is a valid email format
});

type LunchModalProps = {
  onClose: () => void; // Function to close the dialog
  open: () => void; // Boolean to control the dialog's visibility
};

const StripeAccount = ({ onClose, open, eventData }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  // const [stripemail,setStripeEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
    },
  });
  const userLoading = useAppSelector((state) => state?.getShowProfile);
  const [stripemail, setStripeEmail] = useState("");
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [userid, setUserid] = useState<any>("");

  console.log("my all event data", eventData);
  const handleOptionToggle = (option: Option) => {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option); // Select the new option
    }
  };

  const WalletModalhandler = () => {
    setisCreateModalOpen(true);
    console.log("clicked");
  };
  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  async function EventCreation(values: z.infer<typeof formSchema>) {
    console.log(" Event Creation");

    setLoader(true);

    console.log("my values", values);
    try {
      const data = {
        userId: userid,
        chain: selectedOption?.label || "",
        stripeAccount: stripemail,
        name: eventData?.eventname,
        category: eventData?.eventcategory,
        eventDescription: eventData?.eventdescription,
        location: eventData?.eventlocation,
        ticketStartDate: eventData?.eventstartdate,
        ticketEndDate: eventData?.eventenddate,
        startTime: eventData?.eventstarttime,
        endTime: eventData?.eventendtime,
        // mainEventImage: eventData?.eventmainimg,
        coverEventImage: eventData?.eventcoverimg,
        tickets: eventData?.ticketsdata,
        totalComplemantaryTickets: eventData?.compticketno,
        fbUrl: eventData?.fburl,
        instaUrl: eventData?.instaurl,
        youtubeUrl: eventData?.youtubeurl,
        twitterUrl: eventData?.telegramurl,
        tiktokUrl: eventData?.tiktokurl,
        linkedinUrl: eventData?.linkedinurl,
        eventmedia: eventData?.eventmedia,
      };
      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          localStorage.removeItem("eventData");
          setisCreateModalOpen(true);
          // router.push("/viewallevents");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {loader && <ScreenLoader />}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseIcon={false}
          style={{
            background:
              "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          }}
          className="flex flex-col w-[650px] text-white px-[0px] gap-[24px] pt-[22px] pb-[0px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div className="w-full">
            <DialogHeader className="">
              <DialogTitle className="flex justify-between font-bold px-[24px] text-2xl mb-1">
                <h2 className="font-extrabold text-[24px]">Stripe Account</h2>
                <Image src={close} sizes="28px" alt="close-btn" className="cursor-pointer" onClick={onClose} />
              </DialogTitle>
              <Separator className="scale--[1.12] bg-[#292929]" />
            </DialogHeader>
          </div>
          <div className="px-6">
            <p className="text-[#BFBFBF] pb-[20px] lg:pb-[24px] text-sm font-bold lg:font-normal">
              Enter your registered Stripe account email to set up your payout method. Payments are processed through Stripe for card and bank
              transactions. Payouts are sent 3 days after the successful event
            </p>
            <div>
              <Form {...form}>
                <form
                  className="w-full my-[12px] mt-[5px]"
                  // onSubmit={()=> EventCreation()}
                  onSubmit={(event) => {
                    console.log("Form submit triggered");
                    form.handleSubmit(EventCreation)(event);
                  }}
                >
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem className="relative md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">Email</FormLabel>
                        <Envelope className="absolute right-3 top-[30%]" size={20} />

                        <FormControl>
                          <Input
                            placeholder="Enter Email Address"
                            className="pt-11 pb-5 text-base placeholder:text-base placeholder:text-[white] placeholder:font-extrabold"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setStripeEmail(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="w-full border-t border-muted">
                    <div className="w-full p-[24px]">
                      <Button
                        type="submit" // Change to "button" to prevent form submission
                        className="w-full font-extrabold text-base"
                        disabled={!form.watch("walletAddress")}
                        // onClick={() => {
                        //   if (
                        //     selectedOptions.length &&
                        //     form.watch("walletAddress")
                        //   ) {
                        //     WalletModalhandler(); // Show the popup
                        //   }
                        // }}
                      >
                        Submit
                      </Button>
                      {isCreateModalOpen && <EventSubmmitModal onClose={() => setisCreateModalOpen(false)} open={() => setisCreateModalOpen(true)} />}
                    </div>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
export default StripeAccount;
