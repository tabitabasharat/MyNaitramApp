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
import arrowdown from "../../assets/arrow-down-drop.svg";
import img1 from "../../assets/Handbag (1).svg";
import img2 from "../../assets/Cake.svg";
import img3 from "../../assets/Crown.svg";
import img4 from "../../assets/Shield Star.svg";
import tick from "../../assets/fi-rr-check.svg";
import { updateEvent } from "@/lib/middleware/event";
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";
type TicketTypeOption = {
  id: number;
  label: string;
};
type TicketType = {
  type: any;
  price: any;
  no: any;
  options: TicketTypeOption[];
  dropdown: any;
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
    .url({ message: "Invalid Twitter URL." })
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
function CreateEvent() {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [dropdown, setDropdown] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [userid, setUserid] = useState<any>("");
  const [Eventname, setEventname] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventLocation, setEventLocation] = useState("");
  const [TicketStartDate, setTicketStartDate] = useState("");
  const [TicketEndDate, setTicketEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");
  const [EventEndTime, setEventEndTime] = useState("");

  console.log("my event start date is", EventStartTime);
  console.log("my ticket start date is", TicketStartDate);

  console.log("my event enddate is", EventEndTime);
  console.log("my ticket endd date is", TicketEndDate);

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
    { type: "", price: 0, no: 0, options: [], dropdown: true },
  ]);

  const options: Option[] = [
    { id: 1, label: "Merchandise Stalls", image: img1 },
    { id: 2, label: "Food and Beverages", image: img2 },
    { id: 3, label: "VIP Lounge", image: img3 },
    { id: 4, label: "Security and First Aid", image: img4 },
  ];
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleDropdown = (index: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index ? { ...ticket, dropdown: !ticket.dropdown } : ticket
      )
    );
  };

  const handleOptionToggle = (index: number, option: TicketTypeOption) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index
          ? {
              ...ticket,
              options: ticket.options.some((o) => o.id === option.id)
                ? ticket.options.filter((o) => o.id !== option.id)
                : [...ticket.options, option],
            }
          : ticket
      )
    );
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

  const handleAddTicketType = (e: any) => {
    e.preventDefault();
    setTicketTypes((prevTickets) => [
      ...prevTickets,
      { type: "", price: 0, no: 0, options: [], dropdown: true },
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
    const userID =typeof window !== "undefined" ?  localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  const filteredTicketTypes = ticketTypes.map((ticket) => ({
    type: ticket.type,
    price: ticket.price,
    no: ticket.no,
    options: ticket.options.map((option) => ({
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
        ticketStartDate: TicketStartDate,
        ticketEndDate: TicketEndDate,
        startTime: EventStartTime,
        endTime: EventEndTime,
        mainEventImage: MainImg,
        coverEventImage: CoverImg,

        tickets: filteredTicketTypes,
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

  function extractDate(dateTime: string): string {
    // Create a new Date object from the input string
    const date = new Date(dateTime);

    // Format the date to 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function addTimeToDate(
    inputDate: string,
    hoursToAdd: number,
    minutesToAdd: number
  ): string {
    // Parse the input date
    const date = new Date(inputDate);

    // Add the specified hours and minutes
    date.setHours(date.getHours() + hoursToAdd);
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Format the date in YYYY-MM-DDTHH:mm format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
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
                            setTicketStartDate(e.target.value);
                            field.onChange(e);
                          }}

                          // max={extractDate(EventStartTime)}
                        />
                      </FormControl>

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
                            setTicketEndDate(e.target.value);
                            field.onChange(e);
                          }}
                          min={TicketStartDate}
                          // max={extractDate(EventStartTime)}
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
                  name="eventstarttime"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event Start Date & time
                      </FormLabel>
                      <FormControl>
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
                          min={addTimeToDate(TicketEndDate, 0, 0)}
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
                          min={EventStartTime}
                        />
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
                            <span className="pl-[0.75rem]">
                              {CoverImgName || "Upload Image"}
                            </span>
                            <input
                              ref={fileInputRef2}
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload2"
                              onChange={handleCoverSingleFileChange}
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
                        <div className="flex flex-wrap gap-[12px]">
                          {galleryFiles?.map((file, index) => {
                            const isVideo = file.type.startsWith("video/");
                            const isImage = file.type.startsWith("image/");
                            return (
                              <div
                                key={index}
                                className="relative w-[80px] h-[80px] bg-gray-200 rounded-[12px]"
                              >
                                {isVideo ? (
                                  <video
                                  src={window.URL.createObjectURL(file)}
                                  className="w-full h-full object-cover relative rounded-[12px]"
                                  width={80}
                                  height={80}
                                  controls
                                >
                                  Your browser does not support the video tag.
                                </video>
                                ) : isImage ? (
                                  <Image
                                    src={window.URL.createObjectURL(file)}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="w-full h-full object-cover relative rounded-[12px]"
                                    width={80}
                                    height={80}
                                  />
                                ) : (
                                  <p className="w-full h-full flex items-center justify-center text-red-500">
                                  Unsupported media type
                                  </p>
                                )}
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
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <label
                        htmlFor="galleryUpload"
                        className={`pb-3 gallery-box-same font-bold border border-[#292929] placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-end items-end pr-[40px] ${
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
                          accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
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
                  className="flex flex-col gap-[12px] w-full mt-[24px] common-container"
                  key={index}
                >
                  <div className="flex items-center gap-[24px] common-container">
                    {/* Event Ticket Type Field */}
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
                                handleInputChange(
                                  index,
                                  "type",
                                  e.target.value
                                );
                                field.onChange(e);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Event Ticket Price Field */}
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

                    {/* Event Number of Tickets Field */}
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

                  {/* What's Included Section */}
                  <div className="pb-[8px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleDropdown(index)}
                    >
                      <p className="text-sm text-gray-500 uppercase">
                        WHATS INCLUDED
                      </p>
                      <Image
                        src={ticket?.dropdown ? arrowdown : arrowdown}
                        width={11}
                        height={11}
                        alt="arrow"
                      />
                    </div>
                    {ticket?.dropdown && (
                      <div>
                        {options?.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                            onClick={() => handleOptionToggle(index, option)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <Image
                                src={option.image}
                                width={16}
                                height={16}
                                alt="img"
                              />
                              <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                {option?.label}
                              </p>
                            </div>
                            {ticket?.options.some(
                              (o) => o.id === option.id
                            ) && (
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
                  </div>
                </div>
              ))}

              {/* Add Ticket Type Button */}
              <div className="flex justify-end items-center mt-[12px] ticket-btn">
                <Button
                  className="font-bold h-[32px] py-[8px] px-[12px] gap-[9.75px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
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
export default Protectedroute(CreateEvent);
