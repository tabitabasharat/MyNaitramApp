"use client";
import React from "react";
import "./CreateEvent.css";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect } from "react";
import Editicon from "@/assets/Editicon.svg";
import addicon from "@/assets/add-icon.svg";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { useForm } from "react-hook-form";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { API_URL } from "@/lib/client";
import crossicon from "@/assets/cross-img-icon.svg";
// import { DatePicker } from "@/components/organisms/DatePicker";

import { useRouter } from "next/navigation";

import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
// import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { createevent } from "@/lib/middleware/event";
import api from "@/lib/apiInterceptor";
import DenseMenu from "./Dropdown";
import arrowdown from "../../assets/arrow-down-drop.svg";
import img1 from "../../assets/Handbag (1).svg";
import img2 from "../../assets/Cake.svg";
import img3 from "../../assets/Crown.svg";
import img4 from "../../assets/Shield Star.svg";
import tick from "../../assets/fi-rr-check.svg";

type TicketTypeOption = {
  id: number;
  label: string;
};
type TicketType = {
  type: any;
  price: any;
  no: any;
  options: TicketTypeOption[];
};
const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),
  eventcategory: z
    .string()
    .min(1, { message: "Event category cannot be empty." }),
  eventlocation: z
    .string()
    .min(1, { message: "Event location cannot be empty." }),
  eventstartdate: z
    .string()
    .min(1, { message: "Event start date cannot be empty." }),
  eventenddate: z
    .string()
    .min(1, { message: "Event end date cannot be empty." }),

  eventstarttime: z
    .string()
    .min(1, { message: "Event start time cannot be empty." }),
  eventendtime: z
    .string()
    .min(1, { message: "Event end time cannot be empty." }),

  eventdescription: z
    .string()
    .min(1, { message: "Event description cannot be empty." }),

  compticketno: z
    .string()
    .min(1, { message: "Complimentary ticket number cannot be empty." }),
  fburl: z
    .string()
    .url({ message: "Invalid Facebook URL." })
    .min(1, { message: "Facebook URL cannot be empty." }),
  instaurl: z
    .string()
    .url({ message: "Invalid Instagram URL." })
    .min(1, { message: "Instagram URL cannot be empty." }),
  youtubeurl: z
    .string()
    .url({ message: "Invalid YouTube URL." })
    .min(1, { message: "YouTube URL cannot be empty." }),
  tiktokurl: z
    .string()
    .url({ message: "Invalid TikTok URL." })
    .min(1, { message: "TikTok URL cannot be empty." }),
  linkedinurl: z
    .string()
    .url({ message: "Invalid Linkedin URL." })
    .min(1, { message: "Linkedin URL cannot be empty." }),
  telegramurl: z
    .string()
    .url({ message: "Invalid Telegram URL." })
    .min(1, { message: "Telegram URL cannot be empty." }),
  eventmainimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  tickets: z
    .array(
      z.object({
        type: z.string().min(1, { message: "Ticket type cannot be empty." }),
        price: z
          .string()
          .min(1, { message: "Ticket price must be greater than 0." }),
        no: z
          .string()
          .min(1, { message: "Number of tickets must be greater than 0." }),
      })
    )
    .refine((tickets) => tickets.length > 0, {
      message: "At least one ticket is required.",
    }),
});
type Option = {
  id: number;
  label: string;
  image: string;
};
export default function CreateEvent() {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [Dropdown, setDropdown] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [userid, setUserid] = useState("");
  const [Eventname, setEventname] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventLocation, setEventLocation] = useState("");
  const [EventStartDate, setEventStartDate] = useState("");
  const [EventEndDate, setEventEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");
  console.log("my event date is", EventStartTime);
  const [EventEndTime, setEventEndTime] = useState("");
  const [Eventdescription, setEventdescription] = useState("");

  const [CompTicketNo, setCompTicketNo] = useState("");
  const [MainImg, setMainImg] = useState("");
  const [MainImgName, setMainImgName] = useState<any>("");

  const [CoverImg, setCoverImg] = useState("");
  const [CoverImgName, setCoverImgName] = useState<any>("");

  const [FBUrl, setFBUrl] = useState("");
  const [InstaUrl, setInstaUrl] = useState("");
  const [TwitterUrl, setTwitterUrl] = useState("");

  const [YoutubeUrl, setYoutubeUrl] = useState("");

  const [tiktokUrl, settiktokUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [eventsFiles, setEventsFile] = useState<any>([]);
  const router = useRouter();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { type: "", price: 0, no: 0, options: [] },
  ]);
  const options: Option[] = [
    { id: 1, label: "Merchandise Stalls", image: img1 },
    { id: 2, label: "Food and Beverages", image: img2 },
    { id: 3, label: "VIP Lounge", image: img3 },
    { id: 4, label: "Security and First Aid", image: img4 },
  ];
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleDropdown = () => {
    setDropdown(!Dropdown);
  };
  const handleOptionToggle = (option: Option) => {
    setSelectedOptions((prev) => {
      const isSelected = prev.some((o) => o.id === option.id);
      if (isSelected) {
        return prev.filter((o) => o.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventname: "",
      eventcategory: "",
      eventlocation: "",
      eventstartdate: "",
      eventenddate: "",

      eventstarttime: "",
      eventendtime: "",
      eventmainimg: "",
      eventcoverimg: "",
      eventdescription: "",

      compticketno: "",
      fburl: "",
      instaurl: "",
      youtubeurl: "",
      telegramurl: "",
      tiktokurl: "",
      linkedinurl: "",
      tickets: [],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]); // Update state with all selected files
      console.log("Gallery files:", [...galleryFiles, ...filesArray]);
    }
  };
  const handleFileChangeapi = async () => {
    if (galleryFiles) {
      setLoader(true);

      try {
        const filesArray = Array.from(galleryFiles);

        console.log("Gallery files:", filesArray);

        const formData = new FormData();

        filesArray.forEach((file) => formData.append("files", file));

        //  console.log("my res before", formData)
        const res: any = await api.post(
          `${API_URL}/upload/uploadMultiple`,
          formData
        );

        if (res?.status === 200) {
          setLoader(false);

          console.log("gallery res", res);
          console.log("gallery image uploasssded");
          setEventsFile(res?.data?.imageUrls);

          console.log(res?.data?.data, "this is the gallery url");
          SuccessToast("Images Uploaded Successfully");
          return res?.data?.imageUrls;
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof TicketType,
    value: string | number | TicketTypeOption[]
  ) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  // const handleAddTicketType = (e: any) => {
  //   e.preventDefault();
  //   setTicketTypes((prevTickets) => [
  //     ...prevTickets,
  //     { type: "", price: 0, no: 0 },
  //   ]);
  // };
  const handleAddTicketType = (e: any) => {
    e.preventDefault();
    setTicketTypes((prevTickets) => [
      ...prevTickets,
      { type: "", price: 0, no: 0, options: [] },
    ]);
  };

  const handleSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Selected Main cover img is:", file);
    const filename = file?.name;
    console.log("file name", filename);
    setMainImgName(filename);

    if (file) {
      setLoader(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await api.post(
          `${API_URL}/upload/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          setLoader(false);

          console.log("Main cover image", res);
          console.log("Main cover image uploaded");
          form.setValue("eventmainimg", res?.data?.data);
          setMainImg(res?.data?.data);
          console.log(res?.data?.data, "this is the Main cover image url");
          SuccessToast("Main Cover Image Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleCoverSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Selected  cover img is:", file);
    const filename = file?.name;
    console.log("file name", filename);
    setCoverImgName(filename);
    if (file) {
      setLoader(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await api.post(
          `${API_URL}/upload/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          setLoader(false);

          console.log(" cover image", res);
          console.log(" cover image uploaded");
          form.setValue("eventcoverimg", res?.data?.data);

          setCoverImg(res?.data?.data);
          console.log(res?.data?.data, "this is the cover image url");
          SuccessToast("Cover Event Image Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const removeImage = (index: number) => {
    setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const userID: any = localStorage.getItem("_id");
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  const combinedArray = [
    ...ticketTypes.map((ticket) => ({ ...ticket, source: "ticketTypes" })),
    ...selectedOptions.map((option) => ({
      id: option.id,
      label: option.label,
      source: "selectedOptions",
    })), // Only id and label for options
  ];

  const enrichedTicketTypes = ticketTypes.map((ticket) => ({
    ...ticket,
    options: selectedOptions.map((option) => ({
      id: option.id,
      label: option.label,
    })),
  }));
  async function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    console.log(" Event Creation");

    setLoader(true);
    const imagesOfGallery = await handleFileChangeapi();
    try {
      const data = {
        userId: userid,
        name: Eventname,
        category: EventCategory,
        eventDescription: Eventdescription,
        location: EventLocation,
        ticketStartDate: EventStartDate,
        ticketEndDate: EventEndDate,
        startTime: EventStartTime,
        endTime: EventEndTime,
        mainEventImage: MainImg,
        coverEventImage: CoverImg,

        tickets: enrichedTicketTypes,
        totalComplemantaryTickets: CompTicketNo,
        fbUrl: FBUrl,
        instaUrl: InstaUrl,
        youtubeUrl: YoutubeUrl,
        twitterUrl: TwitterUrl,
        tiktokUrl: tiktokUrl,
        linkedinUrl: linkedinUrl,
        eventmedia: imagesOfGallery,
      };
      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          SuccessToast("Event Created Successfully");
          router.push("/viewallevents");
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
  console.log("Form errors:", form.formState.errors);
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px] create-inner"
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl  w-full   ">
        <div className="px-[24px] py-[16px] relative create-container ">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
              {" "}
              Create <span className="text-primary">Event</span>
            </h1>
            <Image src={Editicon} alt="Edit-icon" />
          </div>

          <Image
            src={ufo}
            width={350}
            height={350}
            className="absolute right-[0] bottom-0"
            alt="ufo"
          />
        </div>
        <div className="gradient-slate w-full pt-[32px] pb-[88px] px-[60px]  create-container-head">
          <Form {...form}>
            <form
              className=" w-full"
              // onSubmit={form.handleSubmit(verificationCode)}
              onSubmit={(event) => {
                console.log("Form submit triggered");
                form.handleSubmit(EventCreation)(event);
              }}
            >
              <div className="flex items-start gap-[24px] w-full common-container">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm font-bold text-gray-500 absolute left-3  uppercase pt-[16px] pb-[4px]">
                        Event Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Event Name"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setEventname(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventcategory"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3  uppercase pt-[16px] pb-[4px]">
                        Event Category
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Event Category"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] mt-0"
                          {...field}
                          onChange={(e) => {
                            setEventCategory(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventdescription"
                  render={({ field }) => (
                    <FormItem className="relative w-full  space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={Eventdescription}
                          className="pt-11 create-txtarea-input "
                          onChange={(e) => {
                            setEventdescription(e.target.value);
                            field.onChange(e);
                          }}
                          placeholder="Enter Event Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventlocation"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Location"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventLocation(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="eventstartdate"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Ticketing Start Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          aria-label="Date"
                          placeholder="Enter Start Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventStartDate(e.target.value);
                            field.onChange(e);
                          }}
                        />
                        {/* <div className="pt-9 pb-3 gradient-slate pl-[0.75rem] border border-[#292929]   rounded-md cursor-pointer flex justify-between items-center ">
                          <DatePicker datelabel={"Enter Event Date"}/>
                          <DatePicker
                            selected={EventStartDate}
                            onChange={(date) => setEventStartDate(date)}
                            autoFocus={false}
                            className="custom-datepicker text-[#ffffff]"
                            placeholderText="Enter Event Date"
                          />
                        </div> */}
                      </FormControl>

                      {/* <Input
                          placeholder="Enter Event Date"
                          className="pt-11 pb-5 font-bold placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setEventDate(e.target.value);
                            field.onChange(e);
                          }}
                        /> */}

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventenddate"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Ticketing End Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          aria-label="Date"
                          placeholder="Enter End Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventEndDate(e.target.value);
                            field.onChange(e);
                          }}
                        />
                        {/* <div className="pt-9 pb-3 gradient-slate pl-[0.75rem] border border-[#292929]   rounded-md cursor-pointer flex justify-between items-center ">
                          <DatePicker datelabel={"Enter Event Date"}/>
                          <DatePicker
                            selected={EventEndDate}
                            onChange={(date) => setEventEndDate(date)}
                            autoFocus={false}
                            className="custom-datepicker text-[#ffffff]"
                            placeholderText="Enter Event Date"
                          />
                        </div> */}
                      </FormControl>

                      {/* <Input
                          placeholder="Enter Event Date"
                          className="pt-11 pb-5 font-bold placeholder:font-normal"
                          {...field}
                          onChange={(e) => {
                            setEventDate(e.target.value);
                            field.onChange(e);
                          }}
                        /> */}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="eventstarttime"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event Start Date & time
                      </FormLabel>
                      <FormControl>
                        {/* <div className="pt-9 pb-3 gradient-slate pl-[0.75rem] border border-[#292929]   rounded-md cursor-pointer flex justify-between items-center ">
                           <TimePicker
                            onChange={setEventStartTime}
                            value={EventStartTime}
                            clockAriaLabel={false}
                            disableClock={true}
                            
                          /> 
                          <DateTimePicker
                            onChange={setEventStartTime}
                            value={EventStartTime}
                            disableClock={true}
                            calendarIcon={false}
                            clearIcon={false}
                            className="text-[#000000]"
                          />
                        </div> */}
                        <Input
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter Start Time"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventStartTime(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventendtime"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event End Date & time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter End Time"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventEndTime(e.target.value);
                            field.onChange(e);
                          }}
                        />
                        {/* <div className="pt-9 pb-3 gradient-slate pl-[0.75rem] border border-[#292929]   rounded-md cursor-pointer flex justify-between items-center ">
                          <TimePicker
                            onChange={setEventStartTime}
                            value={EventStartTime}
                            clockAriaLabel={false}
                            disableClock={true}
                            
                          /> 
                        <DateTimePicker
                            onChange={setEventEndTime}
                            value={EventEndTime}
                            disableClock={true}
                            calendarIcon={false}
                            clearIcon={false}
                            className="text-[#000000]"
                          />
                          
                        </div> */}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="eventmainimg"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Main event image
                      </FormLabel>
                      <UploadSimple
                        className="absolute right-[24px] top-[30%] "
                        size={20}
                      />

                      <FormControl>
                        <div>
                          <label
                            htmlFor="upload"
                            className="pt-9 pb-3 font-bold   border border-[#292929]  placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-between items-center "
                          >
                            {/* <span>{field.value?.name || "Upload Image"}</span> */}
                            <span className="pl-[0.75rem]">
                              {MainImgName || "Upload Image"}
                            </span>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload"
                              onChange={handleSingleFileChange}
                              //   onChange={(e) => handleInputChangeForUploadMedia(e)}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventcoverimg"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        cover event image
                      </FormLabel>
                      <UploadSimple
                        className="absolute right-[24px] top-[30%] "
                        size={20}
                      />

                      <FormControl>
                        <div>
                          <label
                            htmlFor="upload2"
                            className="pt-9 pb-3 font-bold   border border-[#292929]  placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-between items-center "
                          >
                            {/* <span>{field.value?.name || "Upload Image"}</span> */}
                            <span className="pl-[0.75rem]">
                              {CoverImgName || "Upload Image"}
                            </span>
                            {/* {CoverImgName  &&  CoverImg ? (
                              <span className="pl-[0.75rem]">
                                {CoverImgName}
                              </span>
                            ) : (
                              <span>Upload Image</span>
                            )} */}

                            <input
                              ref={fileInputRef2}
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload2"
                              onChange={handleCoverSingleFileChange}

                              //   onChange={(e) => handleInputChangeForUploadMedia(e)}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormItem className="relative w-full space-y-0">
                  <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                    Gallery media
                    {galleryFiles?.length > 0 && (
                      <div className="mt-4 pb-4 relative">
                        <div className="flex flex-wrap gap-[12px] ">
                          {galleryFiles?.map((file, index) => (
                            <>
                              <div
                                key={index}
                                className="relative w-[80px] h-[80px] bg-gray-200  rounded-[12px]"
                              >
                                <Image
                                  src={window.URL.createObjectURL(file)}
                                  alt={`Gallery Image ${index + 1}`}
                                  className="w-full h-full object-cover relative rounded-[12px]"
                                  width={80}
                                  height={80}
                                />

                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="trash_button"
                                >
                                  <Image
                                    src={crossicon}
                                    alt="remove"
                                    width={20}
                                    height={20}
                                  />
                                </button>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <label
                        htmlFor="galleryUpload"
                        className={` pb-3 gallery-box-same font-bold border border-[#292929] placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-end items-end pr-[40px]  ${
                          galleryFiles.length > 0
                            ? "h-[200px] gallery-box"
                            : "pt-9 gallery-top"
                        }`}
                      >
                        <span className="pl-[0.75rem] uploadImageButton">
                          {"Upload Images"}
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/png, image/jpg, image/jpeg, image/svg"
                          className="hidden"
                          id="galleryUpload"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              </div>

              {ticketTypes.map((ticket, index) => (
                <div
                  className="flex items-start gap-[24px] w-full mt-[24px] common-container"
                  key={index}
                >
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="relative w-full space-y-0">
                        <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                          Event Ticket Type
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Type"
                            className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                            {...field}
                            onChange={(e) => {
                              handleInputChange(index, "type", e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`tickets.${index}.price`}
                    render={({ field }) => (
                      <FormItem className="relative w-full space-y-0">
                        <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                          Event Ticket Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Price"
                            className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                            {...field}
                            onChange={(e) => {
                              handleInputChange(
                                index,
                                "price",
                                parseFloat(e.target.value)
                              );
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`tickets.${index}.no`}
                    render={({ field }) => (
                      <FormItem className="relative w-full space-y-0">
                        <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                          Event Number of Tickets
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter No. of Tickets"
                            className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                            {...field}
                            onChange={(e) => {
                              handleInputChange(
                                index,
                                "no",
                                parseInt(e.target.value, 10)
                              );
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* <div className="pb-[20px] mt-[12px] w-full rounded-md border border-[#292929] gradient-slate px-3 py-2 text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ">
                <div
                  className="flex items-center justify-between pt-[16px]"
                  onClick={handleDropdown}
                >
                  <p className="text-sm text-gray-500 uppercase ">
                    WHATS INCLUDED
                  </p>
                  <Image
                    src={arrowdown}
                    width={11}
                    height={11}
                    alt="arrow-down"
                  />
                </div>
                {Dropdown && (
                  <div>
                    <div className="flex items-center justify-between  pt-[8px] ">
                      <div className="flex items-center gap-[10px]  pt-[8px]">
                        <Image src={img1} width={16} height={16} alt="img" />
                        <p className="text-[14px] text-gray-500 ">
                          Merchandise Stalls
                        </p>
                      </div>

                      <Image src={tick} width={10} height={10} alt="img" />
                    </div>
                    <div className="flex items-center justify-between   pt-[8px]">
                      <div className="flex items-center gap-[10px]  pt-[8px]">
                        <Image src={img2} width={16} height={16} alt="img" />
                        <p className="text-[14px] text-gray-500  ">
                          Food and Beverages
                        </p>
                      </div>
                      <Image src={tick} width={10} height={10} alt="img" />
                    </div>
                    <div className="flex items-center justify-between   pt-[8px]">
                      <div className="flex items-center gap-[10px]  pt-[8px]">
                        <Image src={img3} width={16} height={16} alt="img" />
                        <p className="text-[14px] text-gray-500  ">
                          VIP Lounge
                        </p>
                      </div>
                      <Image src={tick} width={10} height={10} alt="img" />
                    </div>
                    <div className="flex items-center justify-between   pt-[8px]">
                      <div className="flex items-center gap-[10px]  pt-[8px]">
                        <Image src={img4} width={16} height={16} alt="img" />
                        <p className="text-[14px] text-gray-500  ">
                          Security and First Aid
                        </p>
                      </div>
                      <Image src={tick} width={10} height={10} alt="img" />
                    </div>
                  </div>
                )}
              </div> */}

              <div className="pb-[8px] mt-[12px] w-full rounded-md border border-[#292929] gradient-slate  pt-[16px] px-[12px]  text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                <div
                  className="flex items-center justify-between "
                  onClick={handleDropdown}
                >
                  <p className="text-sm text-gray-500 uppercase">
                    WHATS INCLUDED
                  </p>
                  <Image
                    src={Dropdown ? arrowdown : arrowdown}
                    width={11}
                    height={11}
                    alt="arrow"
                  />
                </div>
                {Dropdown && (
                  <div>
                    {options?.map((option) => (
                      <div
                        key={option?.id}
                        className="flex items-center justify-between pt-[8px] cursor-pointer"
                        onClick={() => handleOptionToggle(option)}
                      >
                        <div className="flex items-center gap-[10px]  ">
                          <Image
                            src={option.image}
                            width={16}
                            height={16}
                            alt="img"
                          />
                          <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                            {option.label}
                          </p>
                        </div>
                        {selectedOptions.some((o) => o.id === option.id) && (
                          <Image src={tick} width={10} height={10} alt="tick" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* To use the selected options elsewhere */}
                {/* <div>
                  Selected Options:{" "}
                  {selectedOptions.map((o) => o.label).join(", ")}
                </div> */}
              </div>

              <div className="flex justify-end items-center mt-[12px] ticket-btn">
                <Button
                  className="font-bold h-[32px] py-[8px] px-[12px] gap-[9.75px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold "
                  onClick={handleAddTicketType}
                >
                  <Image src={addicon} alt="Add-icon" height={12} width={12} />
                  Add Ticket Type
                </Button>
              </div>

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="compticketno"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Complimentary number of tickets
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter No. of Tickets"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setCompTicketNo(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="flex items-center gap-[24px] w-full mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Gallery media
                      </FormLabel>
                      <div>
                        <label
                          htmlFor="upload"
                          className="pt-9 pb-3 font-bold 
                            border border-[#292929]  placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-end items-end  pr-[40px]"
                        >
                          <span className="pl-[0.75rem] uploadImageButton">
                            {"Upload Image"}
                          </span>

                          <input
                            type="file"
                            multiple="multiple"
                            accept="image/png image/jpg image/jpeg image/svg"
                            className="hidden"
                            id="upload"
                            //   onChange={(e) => handleInputChangeForUploadMedia(e)}
                          />
                        </label>
                      </div>
                    </FormItem>
                  )}
                />
              </div> */}

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="fburl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setFBUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instaurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setInstaUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="telegramurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Twitter
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTwitterUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Youtube
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setYoutubeUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="tiktokurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Tiktok
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            settiktokUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Linkedin
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setlinkedinUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end items-center mt-[36px] edit-btn">
                <Button
                  type="submit"
                  className="font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                >
                  Create Event
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
