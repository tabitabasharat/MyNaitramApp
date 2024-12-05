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

type ExecutiveForm = {
  id: string;
  relation: string;
  firstname: string;
  lastname: string;
};

const formSchema = z.object({
  executiveforms: z.array(
    z.object({
      relation: z.string().optional(), // Relation is now optional
      firstname: z.string().optional(), // First name is now optional
      lastname: z.string().optional(), // Last name is now optional
    })
  ),
});

// Define the prop types for the child component
interface ChildComponentProps {
  onNextBtnClicked: (newState: number, data: any) => void;
  PageData?: any;
}

const Executive = ({ onNextBtnClicked, PageData = {} }: ChildComponentProps) => {
  const [userID, setUserID] = useState<any>("");
  const [executivForm, setExecutiveForm] = useState<ExecutiveForm[]>([
    {
      id: uuidv4(),
      relation: "",
      firstname: "",
      lastname: "",
    },
  ]);

  useEffect(() => {
    console.log("Initial form data is as ===> ", executivForm);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("Executive page as => ", PageData);
    setUserID(userID);

    const userDatapPrev = localStorage.getItem("exeData");
    const PreExecutiveData = userDatapPrev ? JSON.parse(userDatapPrev) : null;
    console.log("Executoive data from local storage is ===> ", PreExecutiveData);
    if (
      PreExecutiveData &&
      Array.isArray(PreExecutiveData?.executiveforms) &&
      PreExecutiveData?.executiveforms.length > 0 &&
      Object.keys(PreExecutiveData?.executiveforms[0]).length !== 0
    ) {
      console.log("Individual Form Backed value is as==> ", PageData);
      form.reset({
        executiveforms: PreExecutiveData?.executiveforms?.map((_: any, index: number) => {
          console.log("Tyoe of Element is as ======> ", _);
          if (Object.keys(_).length !== 0) {
            return {
              relation: _?.relation || "",
              firstname: _?.firstname || "",
              lastname: _?.lastname || "",
            };
          }
        }),
      });
      ///////////////////////////////
      const oldDateisAs = PreExecutiveData?.executiveforms?.map((_: any, index: number) => {
        if (Object.keys(_).length !== 0) {
          return {
            id: uuidv4(),
            relation: _?.relation || "",
            firstname: _?.firstname || "",
            lastname: _?.lastname || "",
          };
        }
      });
      setExecutiveForm(oldDateisAs);
    } else {
      console.log("Individual No Backed Code");
    }
  }, []);

  // useEffect(() => {
  //   console.log("Data is as now ===> ", executivForm);
  // }, [executivForm]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      executiveforms: [],
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const addMoreExecuters = (e: any) => {
    e.preventDefault();
    setExecutiveForm((prevTickets) => [
      ...prevTickets,
      {
        id: uuidv4(),
        relation: "",
        firstname: "",
        lastname: "",
      },
    ]);
  };

  const handleRemoveExecutive = (e: any, fieldID: string) => {
    e.preventDefault();

    const updatedFormFields = executivForm
      .filter((field) => field.id !== fieldID)
      .map((field) => ({
        relation: field.relation || "", // Default if relation is empty
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
        Email: "example@gmail.com",
        relationship: value?.relation,
      };
    });
    const exectiveData = {
      userId: userID,
      userType: "Executive",
      approved: true,
      Executive: executiveDataArrayObject,
    };
    onNextBtnClicked(6, exectiveData);
  }

  return (
    <div>
      <div className="flex gap-[30px] flex-col md:gap-[70px]">
        <Form {...form}>
          <form className=" w-full" onSubmit={form.handleSubmit(EventCreation)}>
            {executivForm?.length > 0 &&
              executivForm.map((ticketform, index) => (
                <div key={index}>
                  {index === executivForm.length - 1 ? (
                    <Button
                      onClick={addMoreExecuters}
                      className={`max-w-fit h-[36px] gradient-border-btn rounded-[44px] bg-[black] text-[#00D059] font-extrabold 
            py-[12px] px-[12px] text-sm md:text-base md:w-fit
            disabled:cursor-not-allowed disabled:opacity-50 mb-[32px] ${index !== 0 ? "mt-[50px]" : ""}`}
                    >
                      <Image src={add} alt="add" className="me-[8px] w-[14px] h-[14px]" /> <p className="text-[11px] font-extrabold"></p>
                      Add Executive{" "}
                    </Button>
                  ) : (
                    <Button
                      className={`bg-[#FF1717B2] text-white max-w-fit h-[36px] rounded-[44px] text-[11px] font-extrabold leading-[15.95px] text-left md:text-base md:w-fit disabled:cursor-not-allowed disabled:opacity-50 mb-[32px] flex gap-[8px] ${
                        index !== 0 ? "mt-[50px]" : ""
                      }`}
                      onClick={(e) => handleRemoveExecutive(e, ticketform?.id)}
                    >
                      <Image src={deleteicon} alt="delete-icon" height={16} width={16} />
                      Delete Executive
                    </Button>
                  )}
                  <div className="lg:flex w-full mb-[8px] gap-[24px]">
                    {/* Drop Down */}
                    <div className="lg:w-[49%]">
                      <FormField
                        control={form.control}
                        name={`executiveforms.${index}.relation`}
                        render={({ field }) => (
                          <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                            <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">RELATIONSHIP WITH COMPANY</FormLabel>
                            {/* <Image src={user} alt="img" className="absolute right-3 top-[30%]" /> */}
                            <FormControl>
                              <Input
                                key={index}
                                type="text"
                                placeholder="Enter Relation"
                                className="pt-11 pb-5 placeholder:text-base placeholder:text-[white] placeholder:font-normal"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Prevent leading space
                                  if (value.trimStart().length === 0) {
                                    setExecutiveForm((prevTickets) =>
                                      prevTickets.map((formObject, i) => (i === index ? { ...formObject, relation: "" } : formObject))
                                    );
                                    field.onChange("");
                                  } else {
                                    setExecutiveForm((prevTickets) =>
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
                  </div>
                  <div className="lg:flex w-full mb-[8px] gap-[24px]">
                    {/* First Name */}
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
                                type="firstname"
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
                    {/* Last name */}
                    <div className="w-full">
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
                                type="lastname"
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
                </div>
              ))}
            <div className="flex flex-col gap-3 mt-5 justify-between w-full sm:flex-row sm:mt-0">
              <Button
                type="button"
                className="w-full sm:w-[200px] font-extrabold py-[12px] text-base"
                onClick={() => {
                  //   e.preventDefault();
                  onNextBtnClicked(4, { OwnerData: {} });
                  console.log("RRRRRRRRRRRRRRRR===> ", form.getValues());
                  const exeData = form
                    .getValues()
                    ?.executiveforms?.filter((fieldObject, index) => fieldObject?.relation && fieldObject?.firstname && fieldObject?.lastname);
                  localStorage.setItem("exeData", JSON.stringify({ executiveforms: exeData }));
                }}
              >
                Back
              </Button>
              <Button type="submit" disabled={!isValid} className="w-full sm:w-[200px] font-extrabold py-[12px] text-base">
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
