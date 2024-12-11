"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import user from "@/assets/profile.svg";
import arrowdown from "../../assets/arrow-down-drop.svg";
import location from "@/assets/new location.svg";
import dob from "@/assets/dob.svg";
import countryXXX from "@/assets/country.svg";
import postalcode from "@/assets/postal code.svg";
import organization from "@/assets/Buildings.svg";
import "../homepage/sections/viewevents.css";
import tick from "../../assets/fi-rr-check.svg";

type CateOption = {
  label: string;
};

const optionscate: CateOption[] = [
  { label: "Owner" },
  { label: "CEO" },
  { label: "CTO" },
  { label: "Employee" },
  { label: "Senator" },
  { label: "Other" },
];

const formSchema = z.object({
  eventcatagory: z.object({
    label: z.string().min(1, { message: "Category cannot be empty" }),
  }),
  firstname: z
    .string()
    .min(1, { message: "First name cannot be empty." })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters." })
    .trim(),
  lastname: z
    .string()
    .min(1, { message: "Last name cannot be empty." })
    .regex(/^[A-Za-z][A-Za-z\s]*$/, {
      message: "Last name must contain only letters.",
    })
    .trim(),
  address1: z.string().min(1, { message: "Address 1 cannot be empty." }),
  address2: z.string().min(1, { message: "Address 2 cannot be empty." }),
  postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
  dob: z
    .string()
    .min(1, { message: "Date of birth cannot be empty." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be in the format YYYY-MM-DD." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  country: z.string().min(1, { message: "City cannot be empty." }),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
  PageData?: any;
}

const Representative = ({ onNextBtnClicked, PageData = {} }: ChildComponentProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastNamr, setLastName] = useState("");
  const [DOB, setDob] = useState("");
  const [add_1, setAdd_1] = useState("");
  const [add_2, setAdd_2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

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
        label: "",
      },
      firstname: "",
      lastname: "",
      address1: "",
      address2: "",
      postalcode: "",
      dob: "",
      city: "",
      country: "",
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const handleCateOptionToggle = (option: any) => {
    // if (option.label === "Other") {
    //   setIsCustomCategory(true);
    //   setCategoryTypes(null);
    // } else if (option.label === categoryTypes?.label) {
    //   // setCategoryTypes(null);
    //   setIsCatDropdownOpen(false);
    //   return;
    // } else {
    //   setCategoryTypes({ label: option.label });
    //   setCustomCatgoryInput("");
    //   setIsCustomCategory(false);
    //   setCategoryAlert(false);
    //   setIsCatDropdownOpen(false);
    // }
    setCategoryTypes({ label: option.label });
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

    if (Object.keys(PageData).length !== 0) {
      console.log("Individual Form Backed value is as==> ", PageData);
      form.reset({
        eventcatagory: {
          label: PageData?.Representative[0]?.relationship,
        },
        firstname: PageData?.Representative[0]?.FirstName,
        lastname: PageData?.Representative[0]?.LastName,
        address1: PageData?.Representative[0]?.Address1,
        address2: PageData?.Representative[0]?.Address2,
        postalcode: PageData?.Representative[0]?.postalCode,
        dob: PageData?.Representative[0]?.DOB,
        city: PageData?.Representative[0]?.City,
        country: PageData?.Representative[0]?.Country,
      });
      setCategoryTypes({ label: PageData?.Representative[0]?.relationship.toString() });
    } else {
      console.log("Individual No Backed Code");
    }
  }, []);

  function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("form values are as ====> ", values);
    const representativeData = {
      userId: userID,
      userType: "Representative",
      approved: false,
      Representative: [
        {
          FirstName: values?.firstname,
          LastName: values?.lastname,
          Email: "example@gmail.com",
          DOB: values?.dob,
          Address1: values?.address1,
          Address2: values?.address2,
          City: values?.city,
          postalCode: values?.postalcode,
          Country: values?.country,
          relationship: values?.eventcatagory?.label,
        },
      ],
    };
    onNextBtnClicked(4, representativeData);
  }

  return (
    <div>
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
            <div className="lg:flex w-full mb-[8px] gap-[24px]">
              <div className="w-full lg:w-[49%]">
                <FormField
                  control={form.control}
                  name="eventcatagory"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">RELATIONSHIP WITH COMPANY</FormLabel>
                      <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl className="text-[white]">
                        <Input
                          type="text"
                          placeholder="Select Relationship"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          value={field.value?.label || ""} // Extract the `label` value from the object
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow the input, but prevent leading space
                            if (value.trimStart().length === 0) {
                              handleCateOptionToggle({ label: "" });
                              field.onChange({ label: "" }); // Set label to an empty string
                            } else {
                              handleCateOptionToggle({ label: value });
                              field.onChange({ label: value }); // Update the label property
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value?.label?.length === 0) {
                              e.preventDefault();
                            }
                            // Allow letters and spaces
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
            <div className="lg:flex w-full mb-[8px] gap-[24px]">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">FIRST NAME</FormLabel>
                      <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl className="text-[white]">
                        <Input
                          type="firstname"
                          placeholder="Enter First Name"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow the input, but prevent leading space
                            if (value.trimStart().length === 0) {
                              // If input is only spaces, set to empty
                              setFirstName("");
                              field.onChange("");
                            } else {
                              setFirstName(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
                              e.preventDefault();
                            }
                            // Allow letters and spaces
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
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">LAST NAME</FormLabel>
                      <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="lastname"
                          placeholder="Enter Last Name"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setLastName("");
                              field.onChange("");
                            } else {
                              setLastName(value);
                              field.onChange(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
                              e.preventDefault();
                            }
                            // Allow letters and spaces
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
            <div className="lg:flex w-full mb-[8px] gap-[24px]">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => {
                    // Calculate the maximum date (current time - 1 year)
                    const maxDate = new Date();
                    maxDate.setFullYear(maxDate.getFullYear() - 1);
                    const formattedMaxDate = maxDate.toISOString().split("T")[0]; // Format as yyyy-mm-dd
                    return (
                      <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">DATE OF BIRTH</FormLabel>
                        <Image src={dob} alt="img" className="absolute right-3 top-[30%]" />
                        <FormControl>
                          <Input
                            type="date"
                            aria-label="Date"
                            placeholder="Enter DOB"
                            className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal cursor-pointer"
                            {...field}
                            max={formattedMaxDate}
                            onChange={(e) => {
                              const value = e.target.value;

                              // Format date to yyyy-mm-dd if it is valid
                              if (value) {
                                const formattedDate = new Date(value).toISOString().split("T")[0];
                                setDob(formattedDate);
                                field.onChange(formattedDate);
                              } else {
                                setDob("");
                                field.onChange("");
                              }
                            }}
                            onFocus={(e) => {
                              // Ensure the date picker opens when the field is focused
                              e.target.showPicker?.();
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
                    );
                  }}
                />
              </div>
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
                          placeholder="Enter Address 1"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent leading space
                            if (value.trimStart().length === 0) {
                              setAdd_1("");
                              field.onChange("");
                            } else {
                              setAdd_1(value);
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
            <div className="lg:flex w-full mb-[8px] gap-[24px]">
              <div className="w-full ">
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">ADDRESS 2</FormLabel>
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

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">TOWN/CITY</FormLabel>
                      <Image src={location} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="city"
                          placeholder="Enter Town/City"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setCity(e.target.value);
                            field.onChange(e);
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
            <div className="lg:flex w-full mb-[8px] gap-[24px]">
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

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">COUNTRY</FormLabel>
                      <Image src={countryXXX} alt="img" className="absolute right-3 top-[30%]" />
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
            <div className="flex flex-col gap-3 mt-5 justify-between w-full sm:flex-row sm:mt-0">
              <Button
                type="button"
                className="w-full sm:w-[200px] font-extrabold py-[12px] text-base"
                onClick={() => {
                  //   e.preventDefault();
                  onNextBtnClicked(2, { BusinessData: {} });
                }}
              >
                Back
              </Button>
              <Button type="submit" disabled={!isValid} className="w-full sm:w-[200px] font-extrabold py-[12px] text-base">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Representative;
