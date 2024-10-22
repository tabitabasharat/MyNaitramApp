"use client";
import { createPayoutBank } from "@/lib/middleware/payout";
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
  { id: 2, label: "Current" },
];
const formSchema = z.object({
  currencypaid: z.string().min(1, { message: "Currency cannot be empty." }),
  // currencypaid: z.coerce
  //   .number()
  //   .min(1, { message: "Currency cannot be empty." }),
  country: z.string().min(1, { message: "Country cannot be empty." }),
  companyname: z.string().optional(),
  companyaddress: z.string().optional(),
  companyanotheraddress: z.string().optional(),
  city: z.string().optional(),
  // zipcode: z
  // .number()
  // .optional()
  // .refine((val) => {
  //   // Ensure that the value is 5 or 9 digits long
  //   return val === undefined || val.toString().length === 5 || val.toString().length === 9;
  // }, {
  //   message: "Invalid zip code format. Expected format: 5 or 9 digits.",
  // }),
  zipcode: z.coerce
    .string()
    .optional()
    .refine(
      (val) => {
        // Allow undefined or empty string as valid optional values
        return (
          val === undefined ||
          val === "" || 
          /^\d{5}$/.test(val) || // 5-digit ZIP code
          /^\d{5}-\d{4}$/.test(val) // 9-digit ZIP code
        );
      },
      {
        message:
          "Invalid zip code format. Expected format: 12345 or 12345-6789.",
      }
    ),

  bankname: z.string().min(1, { message: "Bank Name cannot be empty." }),
  banktitle: z.string().min(1, { message: "Bank Title cannot be empty." }),
  bankiban: z
    .string()
    .min(1, { message: "IBAN cannot be empty." })
    .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, {
      message:
        "Invalid IBAN format. Expected format: e.g., 'GB29NWBK60161331926819'.",
    }),
  bankswiftcode: z
    .string()
    .min(1, { message: "Swift Code cannot be empty." })
    .regex(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/, {
      message:
        "Invalid SWIFT Code format. Expected format: 8 or 11 characters, e.g., 'XXXXYY12' or 'XXXXYY12345'.",
    }),
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
      currencypaid:"",
      country: "",
      companyname: "",
      companyaddress: "",
      companyanotheraddress: "",
      city: "",
      zipcode: undefined,
      bankname: "",
      banktitle: "",
      bankiban: "",
      bankswiftcode: "",
    },
  });
  const userLoading = useAppSelector((state) => state?.getShowProfile);
  const [walletAddress, setwalletaddress] = useState("");
  const [walletname, setwalletname] = useState("");

  const [Paid, setPaidCurrency] = useState("");
  const [Country, setCountry] = useState("");
  const [Companyname, setCompanyname] = useState("");
  const [CompanyAddress, setCompanyAddress] = useState("");
  const [CompanyAddress2, setCompanyAddress2] = useState("");
  const [City, setCity] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [bankname, setbankname] = useState("");
  const [bankTitle, setbankTitle] = useState("");
  const [bankIBAN, setbankIBAN] = useState("");
  const [bankSwiftCode, setbankSwiftCode] = useState("");

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

  // async function AddBankAccount(values: z.infer<typeof formSchema>) {
  //   console.log(" Event Creation");

  //   setLoader(true);

  //   console.log("my values", values);
  //   try {
  //     const data = {
  //       userId: userid,
  //       country: Country,
  //       accountHolderType: selectedOption?.label || "",
  //       companyName: Companyname,
  //       address1: CompanyAddress,
  //       address2: CompanyAddress2,
  //       city: City,
  //       zipCode: Zipcode,
  //       bankAccountType: selectedbankOption?.label || "",
  //       bankName: bankname,
  //       accountTitle: bankTitle,
  //       IBAN: bankIBAN,
  //       swiftCode: bankSwiftCode,
  //     };
  //     dispatch(createPayoutBank(data)).then((res: any) => {
  //       if (res?.payload?.status === 200) {
  //         setLoader(false);

  //         // setisCreateModalOpen(true);
  //         setOpenModal(true);
  //         // router.push("/viewallevents");
  //       } else {
  //         setLoader(false);
  //         ErrorToast(res?.payload?.message);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     ErrorToast(error);
  //   }
  // }

  async function AddBankAccount(values: z.infer<typeof formSchema>) {
    console.log("Event Creation");

    setLoader(true);
    console.log("my values", values);

    // Determine required fields based on account holder type
    const isCompany = selectedOption?.label === "Company";
    const requiredFields = isCompany
      ? [
          selectedOption?.label,
          Companyname,
          CompanyAddress,
          CompanyAddress2,
          City,
          Zipcode,
          selectedbankOption?.label,
          bankname,
          bankTitle,
          bankIBAN,
          bankSwiftCode,
        ]
      : [
          selectedbankOption?.label,
          bankname,
          bankTitle,
          bankIBAN,
          bankSwiftCode,
        ];

    // Check for empty required fields
    const emptyFields = requiredFields.some((field) => !field);
    if (emptyFields) {
      setLoader(false);
      return ErrorToast("Please fill in all required fields.");
    }

    try {
      const data = {
        userId: userid,
        currency: Paid,
        country: Country,

        accountHolderType: selectedOption?.label || "",
        companyName: isCompany ? Companyname : undefined,
        address1: isCompany ? CompanyAddress : "",
        address2: isCompany ? CompanyAddress2 : "",
        city: isCompany ? City : "undefined",
        zipCode: isCompany ? Zipcode : "",
        bankAccountType: selectedbankOption?.label || "",
        bankName: bankname,
        accountTitle: bankTitle,
        IBAN: bankIBAN,
        swiftCode: bankSwiftCode,
      };

      const res: any = await dispatch(createPayoutBank(data));
      if (res?.payload?.status === 200) {
        setLoader(false);

        setOpenModal(true);
        router.push("/organizer-event/payout-detail/bankaccount")
      } else {
        setLoader(false);
        ErrorToast(res?.payload?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      ErrorToast(error);
    }
  }

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };
  console.log("Form errors:", form.formState.errors);

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
                form.handleSubmit(AddBankAccount)(event);
              }}
            >
              <FormField
                control={form.control}
                name="currencypaid"
                render={({ field }) => (
                  <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      CURRENCY YOU WILL BE PAID
                    </FormLabel>
                    <FormControl>
                      <Input
                        // type="number"
                        placeholder="U.S. Dollars $"
                        className="pt-11 pb-5 palceholder:text-base placeholder:text-[white] placeholder:font-normal"
                        {...field}
                      
                        onChange={(e) => {
                          const trimmedValue = e.target.value.trimStart(); 
                          field.onChange(trimmedValue);
                          setValidationError("");
                          setPaidCurrency(trimmedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
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
                          setCountry(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          // Prevent leading space
                          if (e.key === " " && field.value.length === 0) {
                            e.preventDefault();
                          }
                          // Allow letters and spaces
                          if (
                            !/^[A-Za-z\s]*$/.test(e.key) &&
                            !["Backspace", "Tab"].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
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
                      name="companyname"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            COMPANY NAME
                          </FormLabel>
                          <Image
                            src={building}
                            alt="company-building"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Company Name"
                              className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trimStart(); 
                                field.onChange(trimmedValue);
                                setValidationError("");
                                setCompanyname(trimmedValue);
                              }}


                            />
                            
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyaddress"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            ADDRESS
                          </FormLabel>
                          <Image
                            src={adress}
                            alt="address-icon"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Address"
                              className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                            

                              onChange={(e) => {
                                const trimmedValue = e.target.value.trimStart(); 
                                field.onChange(trimmedValue);
                                setValidationError("");
                                setCompanyAddress(trimmedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyanotheraddress"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            ADDRESS 2
                          </FormLabel>
                          <Image
                            src={adress}
                            alt="address-icon"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter Address 2"
                              className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                             
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trimStart(); 
                                field.onChange(trimmedValue);
                                setValidationError("");
                                setCompanyAddress2(trimmedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                          <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                            CITY
                          </FormLabel>
                          <Image
                            src={company}
                            alt="company-icon"
                            className="absolute right-3 top-[30%]"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter City"
                              className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trimStart(); 
                                field.onChange(trimmedValue);
                                setValidationError("");
                                setCity(trimmedValue);
                              }}
                              
                           
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipcode"
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
                              className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                              {...field}
                              onChange={(e) => {
                               
                                const trimmedValue = e.target.value.trimStart(); 
                                field.onChange(trimmedValue);
                                setValidationError("");
                                setZipcode(trimmedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              {(selectedOption?.label === "Individual" ||
                selectedOption?.label === "Company") && (
                <>
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
                    name="bankname"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          BANK NAME
                        </FormLabel>
                        <Image
                          src={bank}
                          alt="bank-icon"
                          className="absolute right-3 top-[30%]"
                        />
                        <FormControl>
                          <Input
                            placeholder="Enter Bank Name"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            // onChange={(e) => {
                            //   field.onChange(e);
                            //   setValidationError("");
                            //   setbankname(e.target.value);
                            // }}
                            onChange={(e) => {
                              const trimmedValue = e.target.value.trimStart(); 
                              field.onChange(trimmedValue);
                              setValidationError("");
                              setbankname(trimmedValue);
                            }}
                           

                            onKeyDown={(e) => {
                              // Prevent leading space
                              if (e.key === " " && field.value.length === 0) {
                                e.preventDefault();
                              }
                              // Allow letters, numbers, and spaces
                              if (
                                !/^[A-Za-z0-9\s]*$/.test(e.key) &&
                                !["Backspace", "Tab"].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="banktitle"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Title of Account
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Account Title"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setbankTitle(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              // Prevent leading space
                              if (e.key === " " && field.value.length === 0) {
                                e.preventDefault();
                              }
                              // Allow letters, numbers, and spaces
                              if (
                                !/^[A-Za-z0-9\s]*$/.test(e.key) &&
                                !["Backspace", "Tab"].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankiban"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          IBAN
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter IBAN"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                              setbankIBAN(e.target.value);
                            }}

                            onKeyDown={(e) => {
                              // Prevent leading space
                              if (e.key === " " && field.value.length === 0) {
                                e.preventDefault();
                              }
                              
                              if (
                                !/^[A-Za-z0-9\s]*$/.test(e.key) &&
                                !["Backspace", "Tab"].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankswiftcode"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          SWIFT CODE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Swift Code"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                            {...field}
                          

                            onChange={(e) => {
                              const trimmedValue = e.target.value.trimStart(); 
                              field.onChange(trimmedValue);
                              setValidationError("");
                              setbankSwiftCode(trimmedValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* {selectedOption?.label === "Individual" && (
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
                    name="bankname"
                    render={({ field }) => (
                      <FormItem className="mb-[12px] relative md:mb-5 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          BANK NAME
                        </FormLabel>
                       
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
                    name="banktitle"
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
                              setbankTitle(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankiban"
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
                              setbankIBAN(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankswiftcode"
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
                              setbankSwiftCode(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )} */}
              <div className="w-full ">
                <Button
                  type="submit"
                  className="w-full"
                  // disabled={!selectedOption || !selectedbankOption}
                  // !form.watch("walletAddress") ||
                  // !form.watch("walletName")

                  disabled={
                    !selectedOption ||
                    !selectedbankOption ||
                    (selectedOption?.label === "Company" &&
                      (!Country ||
                        !Paid ||
                        !Companyname ||
                        !CompanyAddress ||
                        !CompanyAddress2 ||
                        !City ||
                        !Zipcode ||
                        !bankname ||
                        !bankTitle ||
                        !bankIBAN ||
                        !bankSwiftCode)) ||
                    (selectedOption.label === "Individual" &&
                      (!bankname ||
                        !Paid ||
                        !Country ||
                        !bankTitle ||
                        !bankIBAN ||
                        !bankSwiftCode ||
                        !selectedbankOption))
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
