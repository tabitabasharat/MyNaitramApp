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
import { Label } from "recharts";

type CateOption = {
  label: string;
};

type OwnerForm = {
  id: string;
  relation: string;
  firstname: string;
  lastname: string;
  percentageSchema: string;
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
      relation: z.string().optional(), // Optional field
      percentageSchema: z.string().optional(), // Optional field
      firstname: z.string().optional(), // Optional field
      lastname: z.string().optional(), // Optional field
    })
  ),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
  PageData?: any;
}

const Owners = ({ onNextBtnClicked, PageData = {} }: ChildComponentProps) => {
  const [userID, setUserID] = useState<any>("");
  const [ownerForm, setOwnerForm] = useState<OwnerForm[]>([
    {
      id: uuidv4(),
      relation: "",
      firstname: "",
      lastname: "",
      percentageSchema: "",
    },
  ]);

  useEffect(() => {
    console.log("Initial form data is as ===> ", ownerForm);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserID(userID);

    if (Object.keys(PageData).length !== 0) {
      console.log("Individual Form Backed value is as==> ", PageData);
      form.reset({
        ownerforms: PageData?.Owner?.map((_: any, index: number) => {
          return {
            relation: _.relationship,
            percentageSchema: _.percentage,
            firstname: _.FirstName,
            lastname: _.LastName,
          };
        }),
      });
      ///////////////////////////////
      const oldDateisAs = PageData?.Owner?.map((_: any, index: number) => {
        return {
          id: uuidv4(),
          relation: _.relationship,
          firstname: _.FirstName,
          lastname: _.LastName,
          percentageSchema: _.percentage,
        };
      });
      setOwnerForm(oldDateisAs);
    } else {
      console.log("Individual No Backed Code");
    }
  }, []);
  //   useEffect(() => {
  //     console.log("Data is as now ===> ", ownerForm);
  //   }, [ownerForm]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerforms: [],
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const addMoreOwner = (e: any) => {
    e.preventDefault();
    setOwnerForm((prevTickets) => [
      ...prevTickets,
      {
        id: uuidv4(),
        relation: "",
        firstname: "",
        lastname: "",
        percentageSchema: "",
      },
    ]);
  };

  const handleRemoveOwner = (e: any, fieldID: string) => {
    e.preventDefault();

    const updatedFormFields = ownerForm
      .filter((field) => field.id !== fieldID)
      .map((field) => ({
        relation: field.relation || "", // Default if relation is empty
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
        Email: "example@gmail.com",
        relationship: value?.relation,
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
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
            {ownerForm?.length > 0 &&
              ownerForm.map((ticketform, index) => (
                <div key={index}>
                  {index === ownerForm.length - 1 ? (
                    <Button
                      onClick={addMoreOwner}
                      className={`max-w-fit h-[36px] gradient-border-btn rounded-[44px] bg-[black] text-[#00D059] font-extrabold py-[12px] px-[12px] text-sm md:text-base md:w-fit disabled:cursor-not-allowed disabled:opacity-50 mb-[32px] ${
                        index !== 0 ? "mt-[50px]" : ""
                      }`}
                    >
                      <Image src={add} alt="add" className="me-[8px] w-[14px] h-[14px]" /> <p className="text-[11px] font-extrabold"></p>
                      Add Owners{" "}
                    </Button>
                  ) : (
                    <Button
                      className={`bg-[#FF1717B2] text-white max-w-fit h-[36px] rounded-[44px] text-[11px] font-extrabold leading-[15.95px] text-left md:text-base md:w-fit disabled:cursor-not-allowed disabled:opacity-50 mb-[32px] flex gap-[8px] ${
                        index !== 0 ? "mt-[50px]" : ""
                      }`}
                      onClick={(e) => handleRemoveOwner(e, ticketform?.id)}
                    >
                      <Image src={deleteicon} alt="delete-icon" height={16} width={16} />
                      Delete Owner
                    </Button>
                  )}
                  {/* First inputs */}
                  <div key={index} className="lg:flex w-full mb-[8px] gap-[24px]">
                    {/* Owner types are here */}
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`ownerforms.${index}.relation`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">RELATIONSHIP WITH COMPANY</FormLabel>
                            {/* <Image src={user} alt="img" className="absolute right-3 top-[30%]" /> */}
                            <FormControl>
                              <Input
                                key={ticketform?.id}
                                type="text"
                                placeholder="Select Relationship"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value.trimStart().length === 0) {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, relation: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setOwnerForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, relation: value } : formObject))
                                    );
                                    field.onChange(value);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  const value = field.value ?? ""; // Fallback to an empty string if undefined
                                  if (e.key === " " && value.length === 0) {
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
                                  const value = field.value ?? ""; // Fallback to an empty string if undefined
                                  if (e.key === " " && value.length === 0) {
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
                  <div key={index} className="lg:flex w-full mb-[8px] gap-[24px]">
                    {/* Last name is here */}
                    <div className="w-full">
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
                                  const value = field.value ?? ""; // Fallback to an empty string if undefined
                                  if (e.key === " " && value.length === 0) {
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
                </div>
              ))}
            <div className="flex flex-col gap-3 mt-5 justify-between w-full sm:flex-row sm:mt-0">
              <Button
                type="button"
                className="w-full sm:w-[200px] font-extrabold py-[12px] text-base"
                onClick={() => {
                  //   e.preventDefault();
                  onNextBtnClicked(3, { RepresentativeData: {} });
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

export default Owners;
