"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import user from "@/assets/profile.svg";
import location from "@/assets/new location.svg";
import dob from "@/assets/dob.svg";
import countryIMG from "@/assets/country.svg";
import postalcode from "@/assets/postal code.svg";
import url from "@/assets/global url.svg";
import organization from "@/assets/Buildings.svg";
import "../homepage/sections/viewevents.css";

const formSchema = z.object({
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
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." })
    .regex(/^[^\s+_]+$/, "Invalid email address."),
  address1: z.string().min(1, { message: "Address 1 cannot be empty." }),
  address2: z.string().min(1, { message: "Address 2 cannot be empty." }),
  postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
  dob: z
    .string()
    .min(1, { message: "Date of birth cannot be empty." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be in the format YYYY-MM-DD." }),
  organizationlink: z.string().min(1, { message: "Organization link cannot be empty." }).url({ message: "Invalid URL format." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  country: z.string().min(1, { message: "City cannot be empty." }),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
  pageData?: any;
}

const IndividualInfo = ({ onNextBtnClicked, pageData = {} }: ChildComponentProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastNamr, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDob] = useState("");
  const [orgLink, setOrgLink] = useState("");
  const [add_1, setAdd_1] = useState("");
  const [add_2, setAdd_2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [userID, setUserID] = useState<any>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      address1: "",
      address2: "",
      postalcode: "",
      email: "",
      dob: "",
      organizationlink: "",
      city: "",
      country: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const { isValid } = form.formState;

  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserID(userID);

    if (Object.keys(pageData).length !== 0) {
      console.log("Individual Form Backed value is as==> ", pageData);
      form.reset({
        firstname: pageData?.Individuals[0]?.FirstName,
        lastname: pageData?.Individuals[0]?.LastName,
        address1: pageData?.Individuals[0]?.Address1,
        address2: pageData?.Individuals[0]?.Address2,
        city: pageData?.Individuals[0]?.City,
        country: pageData?.Individuals[0]?.Country,
        dob: pageData?.Individuals[0]?.DOB,
        email: pageData?.Individuals[0]?.Email,
        organizationlink: pageData?.Individuals[0]?.organizationWebsite,
        postalcode: pageData?.Individuals[0]?.postalCode,
      });
    } else {
      console.log("Individual No Backed Code");
    }
  }, []);

  function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("form values are as ====> ", values);
    const individualFormData = {
      userId: userID,
      userType: "Individual",
      Individuals: [
        {
          FirstName: values?.firstname,
          LastName: values?.lastname,
          Email: values?.email,
          DOB: values?.dob,
          Address1: values?.address1,
          Address2: values?.address2,
          organizationWebsite: values?.organizationlink,
          City: values?.city,
          postalCode: values?.postalcode,
          Country: values?.country,
        },
      ],
      approved: false,
    };
    onNextBtnClicked(2, individualFormData);
  }

  return (
    <div>
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">EMAIL</FormLabel>
                      <Envelope className="absolute right-3 top-[30%]" size={20} />
                      <FormControl>
                        <Input
                          placeholder="Enter Email Address"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            field.onChange(e);
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
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">DATE OF BIRTH </FormLabel>
                      <Image src={dob} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="date"
                          aria-label="Date"
                          placeholder="Enter DOB"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
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
                          onKeyDown={(e) => {
                            // Prevent leading space
                            if (e.key === " " && field.value.length === 0) {
                              e.preventDefault();
                            }
                            // Allow only Backspace and Tab since it's a date input
                            if (!["Backspace", "Tab"].includes(e.key)) {
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
                  name="organizationlink"
                  render={({ field }) => (
                    <FormItem className="relative  mb-[16px] md:mb-4 space-y-0">
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">ORGANIZATION WEBSITE</FormLabel>
                      <Image src={url} alt="img" className="absolute right-3 top-[30%]" />
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter URL"
                          className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setOrgLink(e.target.value);
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
                            // Allow only letters and spaces
                            // if (!/^[A-Za-z\s]*$/.test(e.key) && !["Backspace", "Tab"].includes(e.key)) {
                            //   e.preventDefault();
                            // }
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
                            // Allow only letters and spaces
                            // if (!/^[A-Za-z\s]*$/.test(e.key) && !["Backspace", "Tab"].includes(e.key)) {
                            //   e.preventDefault();
                            // }
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
                          type="text"
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
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">COUNTRY </FormLabel>
                      <Image src={countryIMG} alt="img" className="absolute right-3 top-[30%]" />
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
            <div className="flex flex-col gap-3 mt-5 justify-end w-full sm:flex-row sm:mt-0">
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

export default IndividualInfo;
