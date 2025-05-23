"use client";

import Backward from "../Backward/Backward";
import ufo from "@/assets/UFO_SVG.png";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import arrowdown from "../../assets/arrow-down-drop.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScreenLoader from "../loader/Screenloader";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createVeueForm } from "@/lib/middleware/venue";
// import { getEventByEventId } from "@/lib/middleware/event";
import { ErrorToast, SuccessToast } from "../reusable-components/Toaster/Toaster";

import api from "@/lib/apiInterceptor";
import { API_URL } from "@/lib/client";

import { RxCrossCircled } from "react-icons/rx";

const formSchema = z
  .object({
    v_name: z.string().min(1, { message: "Venue Name cannot be empty." }),
    v_address: z.string().min(1, { message: "Venue Address cannot be empty." }),
    v_city: z.string().min(1, { message: "City cannot be empty." }),
    state: z.string().min(1, { message: "State/Region cannot be empty." }),
    postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
    country: z.string().min(1, { message: "Country cannot be empty." }),

    capacity: z.string().min(1, { message: "Capacity cannot be empty." }),
    v_type: z.string().min(1, { message: "Venue Type cannot be empty." }),
    is_licenseForEvent: z
      .string()
      .min(1, { message: "Field cannot be empty." })
      .refine((value) => ["License", "No licensed"].includes(value), {
        message: "Invalid value. Must be 'License' or 'No licensed'.",
      }),
    license_copy: z.string().optional(),

    managerName: z.string().min(1, { message: "Manager Name cannot be empty." }),
    m_email: z
      .string()
      .email({ message: "Please enter a valid email address." }) // Email validation
      .nonempty({ message: "Email cannot be empty." }),
    m_phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number." }) // Only digits and optional leading '+'
      .nonempty({ message: "Phone number cannot be empty." }),
    inspection: z.string().min(1, { message: "Inspection cannot be empty." }),
  })
  .superRefine((values, ctx) => {
    if (values.is_licenseForEvent === "License" && (!values.license_copy || values.license_copy.trim().length === 0)) {
      ctx.addIssue({
        code: "custom", // Specifies this as a custom validation error
        path: ["license_copy"], // The field where the error is associated
        message: "License Copy is required", // Error message
      });
    }
  });

//  DropDown Options
const venueTypes = [{ label: "Indoor" }, { label: "Outdoor" }];
const liscenseType = [{ label: "License" }, { label: "No licensed" }];

function VenueVerification() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Stte for Lisence Copy
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]); //This is fir API will accept Link
  const [copyLiscenceUrl, setCopyLiscenceURL] = useState<string | null>(null); // This is for form UI Filhaall

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      v_name: "",
      v_address: "",
      v_city: "",
      state: "",
      postalcode: "",
      country: "",

      capacity: "",
      v_type: "",
      is_licenseForEvent: "",
      license_copy: "",

      managerName: "",
      m_email: "",
      m_phone: "",
      inspection: "",
    },
  });

  // Drop Downs
  const [venueDropDOWN, setVenueDropDown] = useState(false);
  const [lisenceDropDOWN, setLiscenseDropDown] = useState(false);

  // Selected Values
  const [selctdVenueType, setVenueTYPE] = useState<string | null>(null);
  const [selctdLisence, setLISCENCE] = useState<string | null>(null);

  const venueDropdown = () => setVenueDropDown(!venueDropDOWN);
  const liscenceDropDown = () => setLiscenseDropDown(!lisenceDropDOWN);

  // Loader
  const [loader, setLoader] = useState(false);

  //User ID and Event ID state
  const [userID, setUserID] = useState<string | null>(null);
  const [eventID, setEventID] = useState<string | null>(null);

  // Venue Type Selection
  const handleVenueTypeSelection = (s_type: string) => {
    setVenueTYPE(s_type);
    setVenueDropDown(!venueDropDOWN);
    form.clearErrors("v_type");
    form.setValue("v_type", s_type);
  };

  // Lisence Type Selection
  const handleLiscenceTypeSelection = (l_type: string) => {
    setLISCENCE(l_type);
    setLiscenseDropDown(!lisenceDropDOWN);
    form.clearErrors("is_licenseForEvent");
    form.setValue("is_licenseForEvent", l_type);
    if (l_type == "No licensed") {
      setGalleryFiles([]);
      setCopyLiscenceURL("");
      form.setValue("license_copy", "");
    }
  };

  // Uploading Liscence Copy
  const uploadLisenceCopy = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoader(true);
      try {
        const filesArray = Array.from(e.target.files);
        setGalleryFiles(filesArray);

        const formData = new FormData();
        filesArray.forEach((file) => formData.append("files", file));

        const res: any = await api.post(`${API_URL}/upload/uploadMultiple`, formData);

        if (res?.status === 200) {
          setLoader(false);
          setCopyLiscenceURL(res?.data?.imageUrls[0]);
          form.setValue("license_copy", filesArray?.[0]?.name);
          form.clearErrors("license_copy");
          SuccessToast("Liscense Copy Uploaded Successfully");
          return res?.data?.imageUrls;
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading lisence copy");
          form.setError("license_copy", {
            type: "manual",
            message: "Choose any other image",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        form.setError("license_copy", {
          type: "manual",
          message: "Choose any other Image",
        });
      }
    }
  };

  //Getting user ID
  useEffect(() => {
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    setUserID(userid);
  }, []);

  //getting event ID from link
  useEffect(() => {
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventID(value);
    console.log("my event id is", value);
    // dispatch(getEventByEventId(value));
  }, []);

  //Foem Submission here
  async function SubmitVebueForm(values: z.infer<typeof formSchema>) {
    setLoader(true);
    if (form.getValues("is_licenseForEvent") === "License" && form.getValues("license_copy") == "") {
      ErrorToast("License Copy is required");
      return;
    }
    try {
      const data = {
        eventId: eventID,
        userId: userID || localStorage.getItem("_id"),
        City: form.getValues("v_city"),
        Country: form.getValues("country"),
        InspectionNotes: form.getValues("inspection"),
        IsVenueLisenced: form.getValues("is_licenseForEvent") === "License" ? true : false,
        LicensedCopy: copyLiscenceUrl || form.getValues("license_copy") || "",
        Region: form.getValues("state"),
        Venue_Address: form.getValues("v_address"),
        Venue_Capacity: form.getValues("capacity"),
        Venue_ManagerEmail: form.getValues("m_email"),
        Venue_ManagerName: form.getValues("v_name"),
        Venue_ManagerPhoneNo: form.getValues("m_phone"),
        Venue_Name: form.getValues("v_name"),
        Venue_Type: form.getValues("v_type"),
        postalCode: form.getValues("postalcode"),
      };
      dispatch(createVeueForm(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Venue update res", res?.payload?.data);
          SuccessToast("Venue submitted Successfully");
          router.back();
        } else {
          setLoader(false);
          console.log(res?.payload?.message);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  }

  const removeSelectedFile = () => {
    setGalleryFiles([]);
    setCopyLiscenceURL("");
    form.setValue("license_copy", "");
  };

  return (
    <section className="bg-img-effect bg-cover bg-center ">
      {loader && <ScreenLoader />}
      {/* {EventDataLoader && <ScreenLoader />} */}
      <div className="pt-[120px] z-[1200] md:pt-[132px] pb-[100px] md:pb-[132px] md:px-[35px] lg:px-[75px] xl:px-[180px] px-[24px]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full xl:w-[1080px] ">
            <div>
              <Backward />
              <h1 className="text-[30px] md:text-[48px] font-extrabold pb-[24px] mt-[20px] md:mt-[30px]">Event Venue Verification Form</h1>
            </div>
            <div className="flex flex-col gap-[52px] md:gap-[32px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(SubmitVebueForm)}>
                  {/* Venuw Information Section */}
                  <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] ">
                    {/* Imformation Head */}
                    <div className="flex h-[56px] bg-color rounded-t-[12px]">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Venue </span>
                        <span>Information</span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    {/* Information Body */}
                    <div className="pt-[8px] flex flex-col gap-[16px] sm:gap-[24px] p-[24px] md:pb-[32px] md:pt-[32px] md:px-[60px]">
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Venue Name fields */}
                        <FormField
                          control={form.control}
                          name="v_name"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">venue NAME</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Venue Name"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Venue Address */}
                        <FormField
                          control={form.control}
                          name="v_address"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">
                                venue address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Venue Address"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* City */}
                        <FormField
                          control={form.control}
                          name="v_city"
                          render={({ field }) => (
                            <FormItem className="relative w-full space-b-[16px] md:space-b-[24px]">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">City</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter City"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* State Region */}
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="relative w-full space-b-[16px] md:space-b-[24px]">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">State/Region</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter State/Region"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Postal Code */}
                        <FormField
                          control={form.control}
                          name="postalcode"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">Postal Code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Postal Code"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Country */}
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">country</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Country"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="space-t-0" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Venue Details Section fields */}
                  <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                    {/* Detail Header */}
                    <div className="flex h-[56px] bg-color rounded-t-[12px]">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Venue </span>
                        <span>Details</span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    {/* Detail Body */}
                    <div className="pt-[8px] flex flex-col gap-[16px] sm:gap-[24px] p-[24px] md:pb-[32px] md:pt-[32px] md:px-[60px]">
                      {/* Venue Type and Capacity */}
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Venue Capacity Field */}
                        <FormField
                          control={form.control}
                          name="capacity"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">
                                venue capacity
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Capacity"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  type="text" // Change to text for complete control over input
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only digits and prevent negative/decimal signs
                                    if (/^\d*$/.test(value)) {
                                      field.onChange(value); // Update the field only with valid input
                                    }
                                  }}
                                  onPaste={(e) => {
                                    const pastedValue = e.clipboardData.getData("text");
                                    // Prevent pasting invalid characters
                                    if (!/^\d+$/.test(pastedValue)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Prevent typing invalid characters directly (e.g., '-', '+', '.')
                                    if (
                                      e.key === "-" ||
                                      e.key === "+" ||
                                      e.key === "." ||
                                      e.key === "e" // For scientific notation in browsers
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
                        {/* Venue Type Field */}
                        <div className="w-full">
                          <div className="relative py-[13px] mt-[8px] w-full rounded-md border border-[#292929] gradient-slate px-[12px]">
                            <div className="flex items-center justify-between cursor-pointer" onClick={venueDropdown}>
                              <div className="flex flex-col">
                                <p className="text-base text-white font-extrabold pb-[4px] uppercase">Venue Type</p>
                                <p className="text-[12px] font-bold text-[#8F8F8F]">{selctdVenueType || "Select Venue Type"}</p>
                              </div>
                              <Image
                                src={arrowdown} // Replace with your actual image path
                                width={11}
                                height={11}
                                alt="Toggle Dropdown"
                              />
                            </div>

                            {/* Dropdown */}
                            {venueDropDOWN && (
                              <div className="absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px] h-fit overflow-auto">
                                {/* Category Options */}
                                {venueTypes.map((v_types: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center py-2 cursor-pointer"
                                    onClick={() => handleVenueTypeSelection(v_types?.label)}
                                  >
                                    <p
                                      className={`text-[16px] font-normal ${
                                        selctdVenueType === v_types?.label ? "text-[#00d059]" : "text-[#FFFFFF]"
                                      }`}
                                    >
                                      {v_types?.label}
                                    </p>
                                    {selctdVenueType === v_types?.label && (
                                      <Image
                                        src={arrowdown} // Replace with your actual tick image path
                                        width={10}
                                        height={10}
                                        alt="Selected"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Error Message */}
                          {form.formState.errors?.v_type?.message && (
                            <p className="text-red-500 text-sm mt-2">{String(form.formState.errors?.v_type?.message)}</p>
                          )}
                        </div>
                      </div>

                      {/* liscence Information AND Liscence Uploading */}
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Is the Venew Liscense For the Event Type */}
                        <div className=" w-full sm:w-[49%]">
                          <div className="relative w-full py-[13px] mt-[8px] rounded-md border border-[#292929] gradient-slate px-[12px]">
                            {/* Field */}
                            <div className="flex items-center justify-between cursor-pointer" onClick={liscenceDropDown}>
                              <div className="flex w-[95%] flex-col">
                                <p className="text-base text-white truncate-styling2 font-extrabold pb-[4px] uppercase">
                                  is the venue licensed for the event type?
                                </p>
                                <p className="text-[12px] font-bold text-[#8F8F8F]">{selctdLisence || "Select"}</p>
                              </div>
                              <Image
                                src={arrowdown} // Replace with your actual image path
                                width={11}
                                height={11}
                                alt="Toggle Dropdown"
                              />
                            </div>

                            {/* Dropdown */}
                            {lisenceDropDOWN && (
                              <div className="absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px] h-fit overflow-auto">
                                {/* Category Options */}
                                {liscenseType.map((l_type: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center py-2 cursor-pointer"
                                    onClick={() => handleLiscenceTypeSelection(l_type?.label)}
                                  >
                                    <p className={`text-[16px] font-normal ${selctdLisence === l_type?.label ? "text-[#00d059]" : "text-[#FFFFFF]"}`}>
                                      {l_type?.label}
                                    </p>
                                    {selctdLisence === l_type?.label && (
                                      <Image
                                        src={arrowdown} // Replace with your actual tick image path
                                        width={10}
                                        height={10}
                                        alt="Selected"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Error Message */}
                          {form.formState.errors?.is_licenseForEvent?.message && (
                            <p className="text-red-500 text-sm mt-2">{String(form.formState.errors?.is_licenseForEvent?.message)}</p>
                          )}
                        </div>

                        {/* Liscense PDF or Image Uploading Field */}
                        {selctdLisence == "License" && (
                          <div className="w-full sm:w-[49%]">
                            <div className="relative w-full py-[13px] mt-[8px] rounded-md border border-[#292929] gradient-slate px-[12px]">
                              <div className="relative space-y-[5px]">
                                <p className="text-base text-white font-extrabold uppercase">licensed copy</p>
                                <label
                                  htmlFor="fileUpload"
                                  className={`gallery-box-same border-none text-[#8F8F8F] font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold gradient-slatee rounded-md cursor-pointer flex items-end ${
                                    galleryFiles?.length > 0 ? "gallery-box" : "gallery-tops"
                                  }`}
                                >
                                  <span>{galleryFiles?.length > 0 ? `${galleryFiles.length} file(s) selected` : "Attach Licensed Copy"}</span>
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    id="fileUpload"
                                    className="hidden"
                                    onChange={uploadLisenceCopy}
                                  />
                                </label>
                                <Image
                                  className="absolute top-[20%] right-0 cursor-pointer"
                                  src="/Images/linkIcon.svg" // Replace with your actual image path
                                  width={18}
                                  height={18}
                                  alt="Link Icon"
                                />
                              </div>

                              {/* Display selected file names */}
                              {galleryFiles?.length > 0 && (
                                <div className="mt-4 relative w-full">
                                  <RxCrossCircled
                                    color="red"
                                    size={20}
                                    className="absolute bottom-0 right-[1%] top-[50%] cursor-pointer"
                                    onClick={removeSelectedFile}
                                  />
                                  <p className="text-gray-300 text-sm font-semibold">Selected File:</p>
                                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2">
                                    {galleryFiles.map((file, index) => (
                                      <li key={index}>{file.name}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            {/* Error Message */}
                            {form.formState.errors?.license_copy?.message && (
                              <p className="text-red-500 text-sm mt-2">{String(form.formState.errors?.license_copy?.message)}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Contact Information Section */}
                  <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                    {/* Contact informatio head */}
                    <div className="flex h-[56px] rounded-t-[12px] bg-color">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Venue </span>
                        <span>Contact Information</span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    {/* Contact information Body */}
                    <div className="pt-[8px] flex flex-col gap-[16px] sm:gap-[24px] p-[24px] md:pb-[32px] md:pt-[8px] md:px-[60px]">
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* MANAGER Name fields */}
                        <FormField
                          control={form.control}
                          name="managerName"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white truncate-styling font-extrabold absolute left-3 top-[25px] uppercase max-[326px]truncate max-[326px]:w-[195px]">
                                venue manager name
                              </FormLabel>

                              <FormControl>
                                <Input
                                  type="name"
                                  placeholder="Enter Venue Manager Name"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow the input, but prevent leading space
                                    if (value.trimStart().length === 0) {
                                      field.onChange("");
                                    } else {
                                      field.onChange(e);
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
                          name="m_email"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base truncate-styling text-white font-extrabold absolute left-3 top-[25px] uppercase">
                                Venue manager email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter Venue Manager Email"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    // Allow the input, but prevent leading space
                                    if (e.target.value.trimStart() == "") {
                                      return;
                                    }
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
                        <FormField
                          control={form.control}
                          name="m_phone"
                          render={({ field }) => (
                            <FormItem className="relative w-full space-b-[16px] md:space-b-[24px]">
                              <FormLabel className="text-base truncate-styling text-white truncate-styling font-extrabold absolute left-3 top-[25px] uppercase">
                                venue manager PHONE NUMBER
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Phone Number"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  type="text" // Use text for better input control
                                  onChange={(e) => {
                                    const value = e.target.value.trimStart(); // Trim leading spaces

                                    // Sanitize input to allow only valid characters
                                    const sanitizedValue = value.replace(/[^0-9\s()+]/g, "");

                                    // Always update the field value, even if unchanged
                                    field.onChange(sanitizedValue);

                                    // Optionally, directly update the input's value for immediate UI feedback
                                    e.target.value = sanitizedValue;
                                  }}
                                  onPaste={(e) => {
                                    const pastedValue = e.clipboardData.getData("text");
                                    // Prevent pasting invalid characters
                                    if (!/^[\d\s()+]+$/.test(pastedValue)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Allow keys like Backspace, Delete, Tab, Arrow keys, Enter, etc.
                                    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Home", "End"];

                                    if (allowedKeys.includes(e.key)) {
                                      return; // Allow default behavior for these keys
                                    }

                                    // Prevent invalid characters such as letters or symbols
                                    if (
                                      e.key.match(/[^0-9()+\s]/) || // Allow only numbers and valid phone symbols
                                      e.key === "e" || // Prevent scientific notation
                                      e.key === "." // Prevent decimal points
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
                          name="inspection"
                          render={({ field }) => (
                            <FormItem className="relative w-full space-b-[16px] md:space-b-[24px]">
                              <FormLabel className="text-base text-white truncate-styling font-extrabold absolute left-3 top-[25px] uppercase">
                                inspection notes
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Inspection Notes"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value.trimStart(); // Trim leading spaces
                                    // Always update the field value, even if unchanged
                                    field.onChange(value);
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
                  {/* Declaration Section */}
                  <div className="gradient-slate w-full rounded-[12px] xl:w-[1080px]">
                    {/* Declaration head */}
                    <div className="flex h-[56px] bg-color rounded-[12px]">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Declaration </span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    {/* Declaration body */}
                    <div className="p-[24px] md:py-[32px] md:px-[60px]">
                      <div className="items-start gap-[24px] w-full common-container">
                        <p className="text-sm md:text-base mb-[20px]">
                          This form must be completed and approved by the ticket platform before ticket sales or event promotion can commence.
                        </p>
                        <p className="text-sm md:text-base mb-[20px]">
                          By submitting this form, I confirm that the above information is accurate and that I have provided all necessary
                          documentation to verify the venue for the event.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <Button
                      type="submit"
                      className="mt-8 px-4 py-[12px] bg-[#00A849]  text-sm md:text-base w-full sm:w-[200px] text-black font-bold rounded-[200px]"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div className="relative">{/* <Image src={blur} alt="blur-effect" className="absolute z-[1100]" /> */}</div>
      </div>
    </section>
  );
}

export default VenueVerification;
