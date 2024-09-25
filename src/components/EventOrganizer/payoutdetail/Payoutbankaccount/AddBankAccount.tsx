"use client";
import backward from "@/assets/Back - Button.svg";
import Image from "next/image";
import Iconpop from "@/assets/launchprofileicon.svg";
import { Button } from "@/components/ui/button";
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
import building from "@/assets/Buildings.svg";
import adress from "@/assets/Address Book.svg";
import company from "@/assets/fi_2803248.svg";
import { deleteAccount } from "@/lib/middleware/profile";
import { Wall, Wallet } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import close from "@/assets/close12.svg";
import { TelegramLogo, User } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import tick from "@/assets/fi-rr-check.svg";
import EventSubmmitModal from "@/components/EventSubmmitModal/EventSubmmitModal";
import { createevent } from "@/lib/middleware/event";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import bank from "@/assets/Bank.svg";
import ScreenLoader from "@/components/loader/Screenloader";
import { Separator } from "@/components/ui/separator";
import SubmitSucessModal from "../../GetPaidOrganiser/SubmitSuccessModal";
import Addcryptopopup from "../payoutCryptowallet/Addcryptopopup";

type Option = {
  id: number;
  label: string;
};
type BankOption = {
  id: number;
  label: string;
};
const options: Option[] = [
  { id: 1, label: "Individual" },
  { id: 2, label: "Company" },
];

const bankinfo: BankOption[] = [
  { id: 1, label: "Saving" },
  { id: 2, label: "Checking" },
];
const formSchema = z.object({
  walletName: z.string().min(1, { message: "Wallet Name cannot be empty." }),
  walletAddress: z
    .string()
    .min(1, { message: "Wallet Address cannot be empty." }),
});

type LunchModalProps = {
  onClose: () => void; // Function to close the dialog
  open: () => void; // Boolean to control the dialog's visibility
};

const AddBankAccount = ({ eventData }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
      walletName: "",
    },
  });
  const userLoading = useAppSelector((state) => state?.getShowProfile);
  const [walletaddress, setwalletaddress] = useState("");
  const [walletname, setwalletname] = useState("");
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedbankOption, setSelectedbankOption] =
    useState<BankOption | null>(null);
  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [userid, setUserid] = useState<any>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  console.log("my all event data", eventData);
  const handleOptionToggle = (option: Option) => {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option); // Select the new option
    }
  };
  const handleBankOptionToggle = (bankoption: Option) => {
    if (selectedbankOption?.id === bankoption.id) {
      setSelectedbankOption(null);
    } else {
      setSelectedbankOption(bankoption); // Select the new option
    }
  };

  const WalletModalhandler = () => {
    setisCreateModalOpen(true);
    console.log("clicked");
  };
  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
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
        BankAccountInformation: selectedbankOption?.label || "",
        wallet: walletaddress,
        walletname: walletname,
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

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className="pt-[42px] pb-[59.12px] lg:pb-[26.25px] px-[24px] lg:px-[100px] xl:px-[216px] md:pt-[90px] mx-auto">
      <div className="w-full md:w-[600px]">
        <p className="block ms-[25px] mb-[32px] sm:mb-[0px] sm:hidden text-[24px] font-extrabold">
          Profile Menu
        </p>
        <div
          onClick={() => router.back()}
          className="mb-[32px] gap-[16px] w-full lg:w-[676px] items-center flex lg:w-[903px] w-full "
        >
          <Image
            src={backward}
            alt="back-btn"
            className="w-[40px] h-[40px] md:w-[44px] md:h-[44px]"
            sizes="44px"
          />
          <p className="lg:text-[24px] font-extrabold text-[15px]">
            {" "}
            Add Bank Account{" "}
          </p>
        </div>
        <div>
          <p className="text-[#BFBFBF] text-sm lmd:text-base font-bold mb-[32px]">
            Receive your payout in crypto by entering your wallet address and
            selecting the correct chain. Payouts are processed within 48 hours.
          </p>
          <Form {...form}>
            <form
              className="w-full my-[12px] mt-[5px]"
              onSubmit={(event) => {
                console.log("Form submit triggered");
                form.handleSubmit(EventCreation)(event);
              }}
            >
              <FormField
                control={form.control}
                name="walletName"
                render={({ field }) => (
                  <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      CURRENCY YOU WILL BE PAID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="U.S. Dollars $"
                        className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValidationError("");
                          setwalletname(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      COUNTRY
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="United States"
                        className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
              <div className="pb-[8px] mb-[12px] lg:mb-5 w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold pb-[16px] text-white">
                    Account Holder Information
                  </p>
                </div>
                <Separator className="scale--[1.12] bg-[#292929]" />
                {Dropdown && (
                  <div className="pt-[14px]">
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
                          <Image src={tick} width={10} height={10} alt="tick" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {validationError && (
                  <p className="text-red-500 text-sm mt-2">{validationError}</p>
                )}
              </div>
              {selectedOption?.label === "Company" && (
                <div>
                  <div>
                    <FormField
                      control={form.control}
                      name="walletName"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            COMPANU NAME{" "}
                          </FormLabel>
                          {/* <Wallet className="absolute right-3 top-[30%]" size={20} /> */}
                          <Image
                            src={building}
                            alt="bank-img"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Company Name"
                              className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setValidationError("");
                                setwalletname(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            ADDRESS
                          </FormLabel>
                          <Image
                            src={adress}
                            alt="bank-img"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Address"
                              className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                    <FormField
                      control={form.control}
                      name="walletName"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            ADDRESS 2
                          </FormLabel>
                          <Image
                            src={adress}
                            alt="bank-img"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Address 2"
                              className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setValidationError("");
                                setwalletname(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            CITY
                          </FormLabel>
                          <Image
                            src={company}
                            alt="bank-img"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter City"
                              className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            ZIP CODE
                          </FormLabel>
                          <User
                            className="absolute right-3 top-[30%]"
                            size={20}
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Zip Code"
                              className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                  </div>
                  <div className="pb-[8px] mb-[12px] lg:mb-5 w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold pb-[16px] text-white">
                        Bank Account Information
                      </p>
                    </div>
                    <Separator className="scale--[1.12] bg-[#292929]" />
                    {Dropdown && (
                      <div className="pt-[14px]">
                        {bankinfo.map((bankoption) => (
                          <div
                            key={bankoption.id}
                            className="flex items-center justify-between pt-[2px] cursor-pointer"
                            onClick={() => handleBankOptionToggle(bankoption)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                                {bankoption.label}
                              </p>
                            </div>
                            {selectedbankOption?.id === bankoption.id && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {validationError && (
                      <p className="text-red-500 text-sm mt-2">
                        {validationError}
                      </p>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="walletName"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          BANK NAME
                        </FormLabel>
                        {/* <Wallet className="absolute right-3 top-[30%]" size={20} /> */}
                        <Image
                          src={bank}
                          alt="bank-img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Bank Name"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setwalletname(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Title of Account
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Account Title"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                  <FormField
                    control={form.control}
                    name="walletName"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          IBAN
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter IBAN"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setwalletname(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          SWIFT CODE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Swift Code"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                </div>
              )}
              {selectedOption?.label === "Individual" && (
                <div>
                  <div className="pb-[8px] mb-[12px] lg:mb-5 w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold pb-[16px] text-white">
                        Bank Account Information
                      </p>
                    </div>
                    <Separator className="scale--[1.12] bg-[#292929]" />
                    {Dropdown && (
                      <div className="pt-[14px]">
                        {bankinfo.map((bankoption) => (
                          <div
                            key={bankoption.id}
                            className="flex items-center justify-between pt-[2px] cursor-pointer"
                            onClick={() => handleBankOptionToggle(bankoption)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                                {bankoption.label}
                              </p>
                            </div>
                            {selectedbankOption?.id === bankoption.id && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {validationError && (
                      <p className="text-red-500 text-sm mt-2">
                        {validationError}
                      </p>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="walletName"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          BANK NAME
                        </FormLabel>
                        {/* <Wallet className="absolute right-3 top-[30%]" size={20} /> */}
                        <Image
                          src={bank}
                          alt="bank-img"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Bank Name"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setwalletname(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Title of Account
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Account Title"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                  <FormField
                    control={form.control}
                    name="walletName"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          IBAN
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter IBAN"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setwalletname(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          SWIFT CODE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Swift Code"
                            className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
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
                </div>
              )}
              <div className="w-full " onClick={() => setOpenModal(true)}>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    !selectedOption ||
                    !selectedbankOption ||
                    !form.watch("walletAddress") ||
                    !form.watch("walletName")
                  }
                >
                  Add
                </Button>
              </div>
              {openModal && (
                <Addcryptopopup
                  onClose={() => setOpenModal(false)}
                  open={() => setOpenModal(true)}
                />
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AddBankAccount;
