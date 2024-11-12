"use client";
import Image from "next/image";
import calender from "@/assets/Calender.svg";
import calendercheck from "@/assets/Calender Check.svg";
import calenderX from "@/assets/Calender X.svg";
import calendercheckgreen from "@/assets/Calender Checkgreen.svg";
import calenderXgreen from "@/assets/Calender Xgreen.svg";
import caledndergreen from "@/assets/Calendergreen.svg";
import { Button } from "@/components/ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { updateOrganizerProfile } from "@/lib/middleware/organizer";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import arrowdown from "../../assets/arrow-down-drop.svg";
import location from "@/assets/new location.svg";
import country from "@/assets/country.svg";
import postalcode from "@/assets/postal code.svg";
import url from "@/assets/global url.svg";
import urt from "@/assets/urt.svg";
import organization from "@/assets/Buildings.svg";
import "../homepage/sections/viewevents.css";
import tick from "../../assets/fi-rr-check.svg";

type CateOption = {
  // id: number;
  label: string;
};

const optionscate: CateOption[] = [
  { label: "Business 1" },
  { label: "Business 2" },
  { label: "Business 3" },
  { label: "Business 4" },
  { label: "Business 5" },
  { label: "Other" },
];

const formSchema = z.object({
  eventcatagory: z.object({
    label: z.string().min(1, { message: "Category cannot be empty" }),
  }),
  companyname: z.string().min(1, { message: "Last name cannot be empty." }),
  utr: z.string().min(1, { message: "UTR cannot be empty." }),
  companylink: z.string().min(1, { message: "Organization link cannot be empty." }).url({ message: "Invalid URL format." }),
  address1: z.string().min(1, { message: "Address 1 cannot be empty." }),
  address2: z.string().min(1, { message: "Address 2 cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
  country: z.string().min(1, { message: "City cannot be empty." }),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
}

const Business = ({ onNextBtnClicked }: ChildComponentProps) => {
  const [compName, setCompName] = useState("");
  const [UTR, setUTR] = useState("");
  const [compURL, setCompURL] = useState("");
  const [add_1, setAdd_1] = useState("");
  const [add_2, setAdd_2] = useState("");
  const [CITY, setCity] = useState("");
  const [POSTAL, setPostalCode] = useState("");
  const [COUNTRY, setCountry] = useState("");

  const [categoryTypes, setCategoryTypes] = useState<{ label: string } | null>(null);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [categoryAlert, setCategoryAlert] = useState<any>(false);

  const [isCustomCatgory, setIsCustomCategory] = useState<boolean>(false);
  const [customCategotyInput, setCustomCatgoryInput] = useState<string>("");

  const [userID, setUserID] = useState<any>("");

  const handleCatDropdownToggle = () => {
    setIsCatDropdownOpen((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventcatagory: {
        label: "Some Category",
      },
      companyname: "",
      utr: "",
      companylink: "",
      address1: "",
      address2: "",
      city: "",
      postalcode: "",
      country: "",
    },
  });

  const handleCateOptionToggle = (option: any) => {
    if (option.label === "Other") {
      setIsCustomCategory(true);
      setCategoryTypes(null);
    } else if (option.label === categoryTypes?.label) {
      // setCategoryTypes(null);
      setIsCatDropdownOpen(false);
      return;
    } else {
      setCategoryTypes({ label: option.label });
      setCustomCatgoryInput("");
      setIsCustomCategory(false);
      setCategoryAlert(false);
      setIsCatDropdownOpen(false);
    }
    // Update the form field's value with the selected category
    form.setValue("eventcatagory", option); // Use the form controller to set the value
    form.clearErrors("eventcatagory"); // Clear any errors once a selection is made
  };

  const handleCustomCatgory = (e: any) => {
    const inputValue = e.target.value;
    setCustomCatgoryInput(inputValue);
    setCategoryAlert(false);

    // Update the form field's value with the selected category
    form.setValue("eventcatagory", { label: inputValue }); // Use the form controller to set the value
    form.clearErrors("eventcatagory"); // Clear any errors once a selection is made
  };

  const handleCustomCatBtn = () => {
    if (customCategotyInput === "") {
      setCategoryAlert(true);
    } else {
      setCategoryTypes({ label: customCategotyInput });
      // setCustomCatgoryInput("");
      setIsCustomCategory(false);
      setCategoryAlert(false);
      setIsCatDropdownOpen(false);
    }
  };

  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserID(userID);
  }, []);

  function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("form values are as ====> ", values);
    const businessFormData = {
      userId: userID,
      userType: "Business",
      approved: false,
      Businesses: [
        {
          BusinessType: values?.eventcatagory?.label,
          companyName: values?.companyname,
          UTR: values?.utr,
          companyWebsite: values?.companylink,
          Address1: values?.address1,
          Address2: values?.address2,
          City: values?.city,
          postalCode: values?.postalcode,
          Country: values?.country,
        },
      ],
    };
    onNextBtnClicked(3, businessFormData);
  }

  return (
    <div>
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
            <div className="lg:flex w-full  gap-[24px]">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="eventcatagory"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 w-full rounded-md border border-[#292929] gradient-slate py-[8px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                      <div className="flex items-center justify-between" onClick={handleCatDropdownToggle}>
                        <div className="flex flex-col">
                          <p className="text-[12px] font-bold text-[#8F8F8F] uppercase">BUSINESS TYPE</p>
                          <p>{categoryTypes ? categoryTypes?.label : "Select Business Type"}</p>
                        </div>
                        <Image src={isCatDropdownOpen ? arrowdown : arrowdown} width={11} height={11} alt="arrow" />
                      </div>
                      {isCatDropdownOpen && (
                        <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                          {optionscate?.map((option) => (
                            <div
                              key={option.label}
                              className="flex items-center justify-between pt-[8px] cursor-pointer"
                              onClick={() => handleCateOptionToggle(option)}
                            >
                              <div className="flex items-center gap-[10px]">
                                {/* <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                  {option.label}
                                </p> */}
                                <p
                                  className={`text-[16px] font-normal items-center ${
                                    categoryTypes?.label === option.label ? "text-[#00d059]" : "text-[#FFFFFF]"
                                  }`}
                                >
                                  {option.label}
                                </p>
                              </div>
                              {categoryTypes?.label === option.label && <Image src={tick} width={16} height={16} alt="tick" />}
                            </div>
                          ))}
                          {isCustomCatgory && (
                            <>
                              {categoryAlert == true && <p className="text-[red] text-[16px]">Input is empty!</p>}
                              <div
                                style={{
                                  width: "100%",
                                  marginTop: "10px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "20px",
                                }}
                              >
                                <input
                                  type="text"
                                  placeholder="Enter the Category name"
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomCatgory(e)}
                                  value={customCategotyInput}
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: "6px",
                                  }}
                                />
                                <button
                                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault(); // Prevents default action (optional if button is not inside a form)
                                    handleCustomCatBtn();
                                  }}
                                  style={{
                                    background: "green",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    lineHeight: "10px",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    borderRadius: "5px",
                                    marginRight: "5px",
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="companyname"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">COMPANY Name</FormLabel>
                      <Image src={organization} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          placeholder="Enter Company Name"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setCompName("");
                              field.onChange("");
                            } else {
                              setCompName(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
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
            </div>
            <div className="lg:flex w-full  gap-[24px]">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="utr"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">UNIQUE TAXPAYER REFERENCE NUMBER</FormLabel>
                      <Image src={urt} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          placeholder="Enter UTR"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setUTR(e.target.value);
                            field.onChange(e);
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
                              e.preventDefault();
                            }

                            // Prevent from taking Letters and symbols
                            if (!/^[0-9]*$/.test(e.key) && !["Backspace", "Tab"].includes(e.key)) {
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
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="companylink"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">COMPANY WEBSITE </FormLabel>
                      <Image src={url} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setCompURL("");
                              field.onChange("");
                            } else {
                              setCompURL(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
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
            </div>
            <div className="lg:flex w-full mb-[16px] md:mb-4 gap-[24px]">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">ADDRESS 1 </FormLabel>
                      <Image src={organization} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="address"
                          placeholder="Enter Address 1    "
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setAdd_1(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full ">
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">ADDRESS 2 </FormLabel>
                      <Image src={organization} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="address"
                          placeholder="Enter Address 2"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setAdd_2("");
                              field.onChange("");
                            } else {
                              setAdd_2(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
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
            </div>
            <div className="lg:flex w-full mb-[16px] md:mb-4 gap-[24px]">
              <div className="w-full ">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">Town/City</FormLabel>
                      <Image src={location} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="city"
                          placeholder="Enter Town/City"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setCity("");
                              field.onChange("");
                            } else {
                              setCity(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
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
              <div className="w-full ">
                <FormField
                  control={form.control}
                  name="postalcode"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">POSTAL CODE</FormLabel>
                      <Image src={postalcode} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          placeholder="Enter Postal Code"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setPostalCode("");
                              field.onChange("");
                            } else {
                              setPostalCode(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
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
            </div>
            <div className="lg:flex w-full md:mb-[32px] mb-[60px] gap-[24px]">
              <div className="w-full lg:w-[49%]">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">COUNTRY </FormLabel>
                      <Image src={country} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="country"
                          placeholder="Enter Country"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setCountry(e.target.value);
                            field.onChange(e);
                          }}
                          onKeyDown={(e) => {
                            // Allow only letters and spaces
                            if (!/^[A-Za-z\s]*$/.test(e.key) && !["Backspace", "Tab"].includes(e.key)) {
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
            </div>
            <div className="flex justify-between w-full">
              <Button
                type="button"
                className="w-full sm:w-[200px] font-extrabold py-[12px] text-base"
                onClick={() => {
                  //   e.preventDefault();
                  //   onNextBtnClicked(1);
                }}
              >
                Back
              </Button>
              <Button type="submit" className="w-full sm:w-[200px] font-extrabold py-[12px] text-base">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Business;
