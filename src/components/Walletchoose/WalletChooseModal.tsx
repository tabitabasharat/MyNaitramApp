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
import arrowdown from "@/assets/arrow-down-drop.svg";

import { Separator } from "../ui/separator";
import Image from "next/image";
import Iconpop from "@/assets/launchprofileicon.svg";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { deleteAccount } from "@/lib/middleware/profile";
import { Wall, Wallet } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import close from "@/assets/close12.svg";
import { TelegramLogo } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import tick from "@/assets/fi-rr-check.svg";
import EventSubmmitModal from "../EventSubmmitModal/EventSubmmitModal";
import { createevent } from "@/lib/middleware/event";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import ScreenLoader from "../loader/Screenloader";
import WAValidator from "multicoin-address-validator";

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

// const formSchema = z.object({
//   walletAddress: z
//     .string()
//     .min(1, { message: "Wallet Address cannot be empty." }),
// });
const formSchema = z.object({
  walletAddress: z
    .string()
    .min(1, { message: "Wallet Address cannot be empty." })
    .refine((value) => value !== "null" && value !== "Null", {
      message: "Wallet Address cannot be 'null'.",
    }),
});


type LunchModalProps = {
  onClose: () => void; // Function to close the dialog
  open: () => void; // Boolean to control the dialog's visibility
};

const LunchModal = ({ onClose, open, eventData }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
    },
  });
  const userLoading = useAppSelector((state) => state?.getShowProfile);
  const [walletaddress, setwalletaddress] = useState("");
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [userid, setUserid] = useState<any>("");
  const validate = WAValidator.validate;

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

  const addressFormats: any = {
    Ethereum: {
      length: 42,
      pattern: /^0x[a-fA-F0-9]{40}$/,
      example: "0x1234567890abcdef1234567890abcdef12345678",
    },
    "Binance Smart Chain": {
      length: 42,
      pattern: /^0x[a-fA-F0-9]{40}$/,
      example: "0x1234567890abcdef1234567890abcdef12345678",
    },
    Tron: {
      length: 34,
      pattern: /^[T][a-zA-Z0-9]{33}$/,
      example: "T12345678901234567890",
    },
    Polygon: {
      length: 42,
      pattern: /^0x[a-fA-F0-9]{40}$/,
      example: "0x1234567890abcdef1234567890abcdef12345678",
    },
    Bitcoin: {
      length: 34,
      pattern: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      example: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    },
    Avalanche: {
      length: 42,
      pattern: /^0x[a-fA-F0-9]{40}$/,
      example: "0x1234567890abcdef1234567890abcdef12345678",
    },
    Solana: {
      length: 44,
      pattern: /^[A-Za-z0-9]{44}$/,
      example: "3N1JcJv2nXpB7o7dH1mN3kStZUt9T3tucX2kLgqTY2so",
    },
  };

  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in ", userID);
  }, []);

  async function EventCreation(values: z.infer<typeof formSchema>) {
    console.log(" Event Creation");

    setLoader(true);

 if (!selectedOption) {
      setValidationError("Please select a chain.");
      setLoader(false);
      return;
    }

    const selectedChain = selectedOption?.label.split(" ")[0];
    const isValid = validate(walletaddress, selectedChain);
    // const isValid = validate(walletaddress, selectedOption.label);
    const format = addressFormats[selectedOption.label];

    if (!format) {
      setValidationError("Invalid chain selected.");
      setLoader(false);
      return;
    }

    const { length, pattern, example } = format;

    let errorMessages = [];

    if (!isValid) {
      errorMessages.push(
        `Invalid wallet address for the selected chain. eg:${example}`
      );
    }
    if (errorMessages.length > 0) {
      setValidationError(errorMessages.join(" "));
      setLoader(false);
      return;
    }
    console.log("my values", values);
    try {
      const data = {
        userId: userid,
        chain: selectedOption?.label || "",
        wallet: walletaddress,
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
        twitterUrl: eventData?.twitterurl,
        telegramUrl: eventData?.telegramurl,
        tiktokUrl: eventData?.tiktokurl,
        linkedinUrl: eventData?.linkedinurl,
        eventmedia: eventData?.eventmedia,
      };
      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          setisCreateModalOpen(true);
          localStorage.removeItem("eventData");

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
            <DialogHeader>
              <DialogTitle className="flex justify-between font-bold px-[24px] text-2xl mb-1">
                <h2 className="font-extrabold text-[24px]">Crypto Wallet</h2>
                <Image
                  src={close}
                  sizes="28px"
                  alt="close-btn"
                  className="cursor-pointer"
                  onClick={onClose}
                />
              </DialogTitle>
              <Separator className="scale--[1.12] bg-[#292929]" />
            </DialogHeader>
          </div>
          <div className="px-6">
            <p className="text-[#BFBFBF] pb-[20px] lg:pb-[24px] text-sm font-bold lg:font-normal">
              Gosssem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis.
            </p>
            <div>
              <h2 className="text-[20px] font-bold text-[#BFBFBF] lg:text-[14px] font-bold">
                Please Choose Your Wallet
              </h2>
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
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Wallet
                        </FormLabel>
                        <Wallet
                          className="absolute right-3 top-[30%]"
                          size={28}
                        />

                        <FormControl>
                          <Input
                            placeholder="Enter Wallet Address"
                            className="pt-11 pb-5 text-base placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setwalletaddress(e.target.value);
                            }}
                          />
                        </FormControl>
                      
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pb-[8px] mt-[12px] mb-[30px] lg:mb-[42px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold pb-[16px] text-white flex items-center justify-between w-full">
                        Chain
                        <Image
                          src={arrowdown}
                          width={11}
                          height={11}
                          alt="arrow"
                        />
                      </p>
                    </div>
                    <Separator className="scale--[1.12] bg-[#292929]" />
                    {Dropdown && (
                      <div className="pt-[14px]">
                        {/* {options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between pt-[2px] cursor-pointer"
                            onClick={() => handleOptionToggle(option)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                                {option.label}
                              </p>
                            </div>
                            {selectedOptions.some(
                              (o) => o.id === option.id
                            ) && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))} */}

                        {options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between pt-[2px] cursor-pointer"
                            onClick={() => handleOptionToggle(option)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                                {option.label}
                              </p>
                            </div>
                            {selectedOption?.id === option.id && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))}
                        {/* To use the selected options elsewhere  */}
                        {/* <div>
                          Selected Options:{" "}
                          {selectedOptions.map((o) => o.label).join(", ")}
                        </div> */}
                      </div>
                    )}
                    {validationError && (
                      <p className="text-red-500 text-sm mt-2">
                        {validationError}
                      </p>
                    )}
                  </div>

                  <DialogFooter className="w-full border-t border-muted">
                    <div className="w-full p-[24px]">
                      <Button
                        type="submit" // Change to "button" to prevent form submission
                        className="w-full"
                        disabled={
                          !selectedOption || !form.watch("walletAddress")
                        }
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
                      {isCreateModalOpen && (
                        <EventSubmmitModal
                          onClose={() => setisCreateModalOpen(false)}
                          open={() => setisCreateModalOpen(true)}
                        />
                      )}
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

export default LunchModal;
