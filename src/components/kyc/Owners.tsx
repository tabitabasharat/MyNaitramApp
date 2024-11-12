"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import deleteicon from "@/assets/Wallet/delete-icon.svg";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import user from "@/assets/profile.svg";
import arrowdown from "../../assets/arrow-down-drop.svg";
import "../homepage/sections/viewevents.css";
import add from "@/assets/Plus.svg";
import tick from "../../assets/fi-rr-check.svg";
import percent from "@/assets/percent.svg";

import { v4 as uuidv4 } from "uuid";

type CateOption = {
  label: string;
};

type OwnerForm = {
  id: string;
  eventcatagory: {
    label: string;
  } | null;
  firstname: string;
  lastname: string;
  percentageSchema: string;
  dropDown: boolean;
  categoryalert: boolean;
  iscustomcatgory: boolean;
  customcategotyinput: string;
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
  ownerforms: z.array(
    z.object({
      eventcatagory: z.object({
        label: z.string().min(1, { message: "Category cannot be empty" }),
      }),
      percentageSchema: z
        .string()
        .min(1, { message: "Percentage cannot be empty." })
        .regex(/^(?:\d{1,4}(\.\d+)?%?)$/, {
          message: "Invalid percentage. Enter up to 4 digits with optional decimal and % symbol.",
        })
        .refine(
          (value) => {
            const numericValue = value.endsWith("%") ? value.slice(0, -1) : value;
            return !isNaN(parseFloat(numericValue)) && parseFloat(numericValue) <= 5000;
          },
          { message: "Percentage must be a valid number no greater than 5000." }
        ),
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
    })
  ),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
}

const Owners = ({ onNextBtnClicked }: ChildComponentProps) => {
  const [userID, setUserID] = useState<any>("");
  const [ownerForm, setOwnerForm] = useState<OwnerForm[]>([
    {
      id: uuidv4(),
      eventcatagory: null,
      firstname: "",
      lastname: "",
      percentageSchema: "",
      dropDown: false,
      categoryalert: false,
      iscustomcatgory: false,
      customcategotyinput: "",
    },
  ]);

  useEffect(() => {
    console.log("Initial form data is as ===> ", ownerForm);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserID(userID);
  }, []);
  //   useEffect(() => {
  //     console.log("Data is as now ===> ", ownerForm);
  //   }, [ownerForm]);

  const handleCatDropdownToggle = (index: number) => {
    setOwnerForm((prevTickets) => prevTickets.map((formObject, i) => (i === index ? { ...formObject, dropDown: !formObject.dropDown } : formObject)));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerforms: [],
    },
  });

  const handleCateOptionToggle = (option: any, index: number) => {
    setOwnerForm((prevForm) =>
      prevForm.map((currentForm, i) => {
        if (i === index) {
          if (option.label === "Other") {
            return {
              ...currentForm,
              iscustomcatgory: true,
              eventcatagory: null,
            };
          } else if (option.label === currentForm?.eventcatagory?.label) {
            return {
              ...currentForm,
              dropDown: false,
            };
          } else {
            return {
              ...currentForm,
              eventcatagory: { label: option.label },
              customcategoryinput: "",
              iscustomcatgory: false,
              dropDown: false,
            };
          }
        }
        return currentForm;
      })
    );

    form.setValue(`ownerforms.${index}.eventcatagory`, option);
    form.clearErrors(`ownerforms.${index}.eventcatagory`);
  };

  const handleCustomCatgory = (e: any, index: number) => {
    const inputValue = e.target.value;

    setOwnerForm((prevForm) =>
      prevForm.map((currentForm, i) => {
        if (i === index) {
          return {
            ...currentForm,
            customcategotyinput: inputValue,
            categoryalert: false,
          };
        }
        return currentForm;
      })
    );

    form.setValue(`ownerforms.${index}.eventcatagory`, { label: inputValue });
    form.clearErrors(`ownerforms.${index}.eventcatagory`);
  };

  const handleCustomCatBtn = (index: number, inputValue: string) => {
    setOwnerForm((prevForm) =>
      prevForm.map((currentForm, i) => {
        if (i === index) {
          if (inputValue === "") {
            return {
              ...currentForm,
              categoryalert: true,
            };
          } else {
            return {
              ...currentForm,
              eventcatagory: { label: inputValue },
              customcategotyinput: "",
              iscustomcatgory: false,
              categoryalert: false,
              dropDown: false,
            };
          }
        }
        return currentForm;
      })
    );
  };

  const addMoreOwner = (e: any) => {
    e.preventDefault();
    setOwnerForm((prevTickets) => [
      ...prevTickets,
      {
        id: uuidv4(),
        eventcatagory: null,
        firstname: "",
        lastname: "",
        percentageSchema: "",
        dropDown: false,
        categoryalert: false,
        iscustomcatgory: false,
        customcategotyinput: "",
      },
    ]);
  };

  const handleRemoveOwner = (e: any, fieldID: string) => {
    e.preventDefault();

    const updatedFormFields = ownerForm
      .filter((field) => field.id !== fieldID)
      .map((field) => ({
        eventcatagory: field.eventcatagory ?? { label: "" }, // Default if eventcatagory is null
        percentageSchema: field.percentageSchema || "",
        firstname: field.firstname || "", // Default if firstname is empty
        lastname: field.lastname || "",
      }));
    console.log("Remaining values of frms are as==> ", updatedFormFields);
    form.setValue("ownerforms", updatedFormFields);

    setOwnerForm((prevTickets) => prevTickets.filter((_) => _.id !== fieldID));
  };

  function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("form values are as ====> ", values);
    const ownerDataArrayObject = values?.ownerforms?.map((value) => {
      return {
        FirstName: value?.firstname,
        LastName: value?.lastname,
        Email: "",
        relationship: value?.eventcatagory?.label,
        percentage: value?.percentageSchema,
      };
    });
    const ownersData = {
      userId: userID,
      userType: "Owner",
      approved: false,
      Owner: ownerDataArrayObject,
    };
    onNextBtnClicked(5, ownersData);
  }

  return (
    <div>
      <div className="flex mb-[24px] lg:mb-[32px] justify-start">
        <Button
          onClick={addMoreOwner}
          className="max-w-fit h-[36px] gradient-border-btn rounded-[44px] bg-[black] text-[#00D059] font-extrabold 
            py-[12px] px-[12px] text-sm md:text-base md:w-fit
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image src={add} alt="add" className="me-[8px] w-[14px] h-[14px]" />
          Add Owners
        </Button>
      </div>
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
            {ownerForm?.length > 0 &&
              ownerForm.map((ticketform, index) => (
                <div key={index}>
                  {/* First inputs */}
                  <div key={index} className="lg:flex w-full  gap-[24px]">
                    {/* Owner types are here */}
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`ownerforms.${index}.eventcatagory`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 w-full rounded-md border border-[#292929] gradient-slate py-[8px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <div key={index} className="flex items-center justify-between" onClick={() => handleCatDropdownToggle(index)}>
                              <div className="flex flex-col">
                                <p className="text-[12px] font-bold text-[#8F8F8F] uppercase">RELATIONSHIP WITH COMPANY</p>
                                <p>{ticketform?.eventcatagory ? ticketform?.eventcatagory?.label : "Select Relationship"}</p>
                              </div>
                              <Image src={ticketform?.dropDown ? arrowdown : arrowdown} width={11} height={11} alt="arrow" />
                            </div>
                            {ticketform?.dropDown && (
                              <div
                                key={index}
                                className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]"
                              >
                                {optionscate?.map((option) => (
                                  <div
                                    key={option.label}
                                    className="flex items-center justify-between pt-[8px] cursor-pointer"
                                    onClick={() => handleCateOptionToggle(option, index)}
                                  >
                                    <div className="flex items-center gap-[10px]">
                                      <p
                                        className={`text-[16px] font-normal items-center ${
                                          ticketform?.eventcatagory?.label === option.label ? "text-[#00d059]" : "text-[#FFFFFF]"
                                        }`}
                                      >
                                        {option.label}
                                      </p>
                                    </div>
                                    {ticketform?.eventcatagory?.label === option.label && <Image src={tick} width={10} height={10} alt="tick" />}
                                  </div>
                                ))}
                                {ticketform?.iscustomcatgory && (
                                  <>
                                    {ticketform?.categoryalert === true && <p className="text-[red] text-[16px]">Input is empty!</p>}
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomCatgory(e, index)}
                                        value={ticketform?.customcategotyinput}
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
                                          handleCustomCatBtn(index, ticketform?.customcategotyinput);
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
                    {/* First name is here */}
                    <div key={index} className="w-full">
                      <FormField
                        control={form.control}
                        name={`ownerforms.${index}.firstname`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">FISRT NAME </FormLabel>
                            <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                            <FormControl>
                              <Input
                                key={ticketform?.id}
                                type="firstname"
                                placeholder="Enter First Name"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Prevent leading space
                                  if (value.trimStart().length === 0) {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, firstname: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, firstname: value } : formObject))
                                    );
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

                  {/* Second Inputs */}
                  <div key={index} className="lg:flex w-full  gap-[24px]">
                    {/* Last name is here */}
                    <div className="w-full md:mb-[30px]">
                      <FormField
                        control={form.control}
                        name={`ownerforms.${index}.lastname`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">LAST NAME</FormLabel>
                            <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                            <FormControl className="text-[white]">
                              <Input
                                key={ticketform?.id}
                                type="lastname"
                                placeholder="Enter Last Name"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Allow the input, but prevent leading space
                                  if (value.trimStart().length === 0) {
                                    // If input is only spaces, set to empty
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, lastname: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, lastname: value } : formObject))
                                    );
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
                    {/* Percentage is here */}
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`ownerforms.${index}.percentageSchema`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">PERCENTAGE</FormLabel>
                            <Image src={percent} alt="img" className="absolute right-3 top-[30%]" />
                            <FormControl>
                              <Input
                                key={ticketform?.id}
                                placeholder="Enter %"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Prevent leading space
                                  if (value.trimStart().length === 0) {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, percentageSchema: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, percentageSchema: value } : formObject))
                                    );
                                    field.onChange(value);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  const { key } = e;

                                  // Prevent leading space
                                  if (key === " " && target.value.length === 0) {
                                    e.preventDefault();
                                    return;
                                  }

                                  // Prevent starting with '%'
                                  if (key === "%" && target.value.length === 0) {
                                    e.preventDefault();
                                    return;
                                  }

                                  // Allow only one '.' and '%' in the input
                                  if ((key === "." && target.value.includes(".")) || (key === "%" && target.value.includes("%"))) {
                                    e.preventDefault();
                                    return;
                                  }

                                  // Allow digits (0-9), '.' and '%' symbols only
                                  if (!/[0-9.%]/.test(key) && !["Backspace", "Tab"].includes(key)) {
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

                  {ownerForm?.length > 1 ? (
                    <Button
                      className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] mt-[-30px] mb-[35px]"
                      onClick={(e) => handleRemoveOwner(e, ticketform?.id)}
                    >
                      <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                      Remove Owner
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            <div className="flex justify-between w-full">
              <Button
                type="button"
                className="w-full sm:w-[200px] font-extrabold py-[12px] text-base"
                onClick={() => {
                  //   e.preventDefault();
                  //   onNextBtnClicked(3);
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

export default Owners;
