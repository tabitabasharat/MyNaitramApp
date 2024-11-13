"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import user from "@/assets/profile.svg";
import arrowdown from "../../assets/arrow-down-drop.svg";
import "../homepage/sections/viewevents.css";
import add from "@/assets/Plus.svg";
import tick from "../../assets/fi-rr-check.svg";

import deleteicon from "@/assets/Wallet/delete-icon.svg";

import { v4 as uuidv4 } from "uuid";

type CateOption = {
  label: string;
};

type ExecutiveForm = {
  id: string;
  eventcatagory: {
    label: string;
  } | null;
  firstname: string;
  lastname: string;
  dropDown: boolean;
  categoryalert: boolean;
  iscustomcatgory: boolean;
  customcategotyinput: string;
};

const optionscate: CateOption[] = [
  { label: "Executive_1" },
  { label: "Executive_2" },
  { label: "Executive_3" },
  { label: "Executive_4" },
  { label: "Executive_5" },
  { label: "Other" },
];

const formSchema = z.object({
  executiveforms: z.array(
    z.object({
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
    })
  ),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
}

const Executive = ({ onNextBtnClicked }: ChildComponentProps) => {
  const [userID, setUserID] = useState<any>("");
  const [executivForm, setExecutiveForm] = useState<ExecutiveForm[]>([
    {
      id: uuidv4(),
      eventcatagory: null,
      firstname: "",
      lastname: "",
      dropDown: false,
      categoryalert: false,
      iscustomcatgory: false,
      customcategotyinput: "",
    },
  ]);

  useEffect(() => {
    console.log("Initial form data is as ===> ", executivForm);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserID(userID);
  }, []);
  useEffect(() => {
    console.log("Data is as now ===> ", executivForm);
  }, [executivForm]);

  const handleCatDropdownToggle = (index: number) => {
    setExecutiveForm((prevTickets) =>
      prevTickets.map((formObject, i) => (i === index ? { ...formObject, dropDown: !formObject.dropDown } : formObject))
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      executiveforms: [],
    },
  });

  const handleCateOptionToggle = (option: any, index: number) => {
    setExecutiveForm((prevForm) =>
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

    form.setValue(`executiveforms.${index}.eventcatagory`, option);
    form.clearErrors(`executiveforms.${index}.eventcatagory`);
  };

  const handleCustomCatgory = (e: any, index: number) => {
    const inputValue = e.target.value;

    setExecutiveForm((prevForm) =>
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

    form.setValue(`executiveforms.${index}.eventcatagory`, { label: inputValue });
    form.clearErrors(`executiveforms.${index}.eventcatagory`);
  };

  const handleCustomCatBtn = (index: number, inputValue: string) => {
    setExecutiveForm((prevForm) =>
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

  const addMoreExecuters = (e: any) => {
    e.preventDefault();
    setExecutiveForm((prevTickets) => [
      ...prevTickets,
      {
        id: uuidv4(),
        eventcatagory: null,
        firstname: "",
        lastname: "",
        dropDown: false,
        categoryalert: false,
        iscustomcatgory: false,
        customcategotyinput: "",
      },
    ]);
  };

  const handleRemoveExecutive = (e: any, fieldID: string) => {
    e.preventDefault();

    const updatedFormFields = executivForm
      .filter((field) => field.id !== fieldID)
      .map((field) => ({
        eventcatagory: field.eventcatagory ?? { label: "" }, // Default if eventcatagory is null
        firstname: field.firstname || "", // Default if firstname is empty
        lastname: field.lastname || "",
      }));
    console.log("Remaining values of frms are as==> ", updatedFormFields);
    form.setValue("executiveforms", updatedFormFields);

    setExecutiveForm((prevTickets) => prevTickets.filter((_, i) => _.id !== fieldID));
  };

  function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("form values are as ====> ", values);
    const executiveDataArrayObject = values?.executiveforms?.map((value) => {
      return {
        FirstName: value?.firstname,
        LastName: value?.lastname,
        Email: "",
        relationship: value?.eventcatagory?.label,
      };
    });
    const exectiveData = {
      userId: userID,
      userType: "Executive",
      approved: false,
      Executive: executiveDataArrayObject,
    };
    onNextBtnClicked(5, exectiveData);
  }

  return (
    <div>
      <div className="flex mb-[24px] lg:mb-[32px] justify-start">
        <Button
          onClick={addMoreExecuters}
          className="max-w-fit h-[36px] gradient-border-btn rounded-[44px] bg-[black] text-[#00D059] font-extrabold 
            py-[12px] px-[12px] text-sm md:text-base md:w-fit
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image src={add} alt="add" className="me-[8px] w-[14px] h-[14px]" /> <p className="text-[11px] font-extrabold"></p>
          Add Executive{" "}
        </Button>
      </div>
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
            {executivForm?.length > 0 &&
              executivForm.map((ticketform, index) => (
                <div key={index}>
                  <div className="lg:flex w-full  gap-[24px]">
                    <div className="lg:w-[49%]">
                      <FormField
                        control={form.control}
                        name={`executiveforms.${index}.eventcatagory`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 w-full rounded-md border border-[#292929] gradient-slate py-[8px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <div key={index} className="flex items-center justify-between" onClick={() => handleCatDropdownToggle(index)}>
                              <div className="flex flex-col">
                                <p className="text-[12px] font-bold text-[#8F8F8F] uppercase">RELATIONSHIP WITH COMPANY </p>
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
                                        className={`text-[16px] font-normal items-center ${ticketform?.eventcatagory?.label === option.label ? "text-[#00d059]" : "text-[#FFFFFF]"
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
                  </div>
                  <div className="lg:flex w-full  gap-[24px]">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`executiveforms.${index}.firstname`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">FISRT NAME </FormLabel>
                            <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                            <FormControl>
                              <Input
                                key={index}
                                // type="firstname"
                                placeholder="Enter First Name"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Prevent leading space
                                  if (value.trimStart().length === 0) {
                                    setExecutiveForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, firstname: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setExecutiveForm((prevTickets) =>
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
                    <div className="w-full md:mb-[30px]">
                      <FormField
                        control={form.control}
                        name={`executiveforms.${index}.lastname`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">LAST NAME</FormLabel>
                            <Image src={user} alt="img" className="absolute right-3 top-[30%]" />
                            <FormControl className="text-[white]">
                              <Input
                                key={index}
                                // type="lastname"
                                placeholder="Enter Last Name"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Allow the input, but prevent leading space
                                  if (value.trimStart().length === 0) {
                                    // If input is only spaces, set to empty
                                    setExecutiveForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, lastname: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setExecutiveForm((prevTickets) =>
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
                  </div>
                  {executivForm?.length > 1 ? (
                    <Button
                      className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] mt-[-30px] mb-[35px]"
                      onClick={(e) => handleRemoveExecutive(e, ticketform?.id)}
                    >
                      <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                      Delete Executive                    </Button>
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
                  // onNextBtnClicked(4);
                }}
              >
                Back
              </Button>
              <Button type="submit" className="w-full sm:w-[200px] font-extrabold py-[12px] text-base">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Executive;
