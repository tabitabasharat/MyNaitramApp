"use client";
import React from "react";
import "./CreateEvent.css";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef } from "react";
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
import { useForm } from "react-hook-form";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { API_URL } from "@/lib/client";
import crossicon from "@/assets/cross-img-icon.svg";
// import { DatePicker } from "@/components/organisms/DatePicker";
import DatePicker from "react-datepicker";

import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
// import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";


import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),
  eventcategory: z
    .string()
    .min(1, { message: "Event category cannot be empty." }),
  eventlocation: z
    .string()
    .min(1, { message: "Event location cannot be empty." }),
  eventdate: z.string().min(1, { message: "Event date cannot be empty." }),
  eventstarttime: z
    .string()
    .min(1, { message: "Event start time cannot be empty." }),
  eventendtime: z
    .string()
    .min(1, { message: "Event end time cannot be empty." }),
  eventdescription: z
    .string()
    .min(1, { message: "Event description cannot be empty." }),
  tickettype: z.string().min(1, { message: "Ticket type cannot be empty." }),
  ticketpp: z
    .string()
    .min(1, { message: "Tickets per person cannot be empty." }),
  ticketno: z
    .string()
    .min(1, { message: "Total ticket number cannot be empty." }),
  comptickettype: z
    .string()
    .min(1, { message: "Complimentary ticket type cannot be empty." }),
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
  telegramurl: z
    .string()
    .url({ message: "Invalid Telegram URL." })
    .min(1, { message: "Telegram URL cannot be empty." }),
});

export default function CreateEvent() {
  const [Eventname, setEventname] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventLocation, setEventLocation] = useState("");
  const [EventDate, setEventDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");
  const [EventEndTime, setEventEndTime] = useState("");
  const [Eventdescription, setEventdescription] = useState("");
  const [TicketType, setTicketType] = useState("");
  const [TicketPrice, setTicketPrice] = useState("");
  const [TicketNo, setTicketNo] = useState("");

  const [CompTicketType, setCompTicketType] = useState("");
  const [CompTicketNo, setCompTicketNo] = useState("");
  const [MainImg, setMainImg] = useState("");
  const [CoverImg, setCoverImg] = useState("");
  const [FBUrl, setFBUrl] = useState("");
  const [InstaUrl, setInstaUrl] = useState("");
  const [TelegramUrl, setTelegramuUrl] = useState("");

  const [YoutubeUrl, setYoutubeUrl] = useState("");

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  async function verificationCode(values: z.infer<typeof formSchema>) {
    console.log("my code is", values);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventname: "",
      eventcategory: "",
      eventlocation: "",
      eventdate: "",
      eventstarttime: "",
      eventendtime: "",
      eventdescription: "",
      tickettype: "",
      ticketpp: "",
      ticketno: "",
      comptickettype: "",
      compticketno: "",
      fburl: "",
      instaurl: "",
      youtubeurl: "",
      telegramurl: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]); // Update state with all selected files
      console.log("Gallery files:", filesArray);
    }
  };

  const removeImage = (index: number) => {
    setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px] create-inner"
    >
      <div className="pxpx mx-2xl  w-full   ">
        <div className="px-[24px] py-[16px] relative create-container ">
          <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
            {" "}
            Create <span className="text-primary">Event</span>
          </h1>
          <Image
            src={ufo}
            width={350}
            height={350}
            className="absolute right-[0] bottom-0"
            alt="ufo"
          />
        </div>
        <div className="gradient-slate w-full pt-[32px] pb-[32px] px-[60px]  create-container-head">
          <Form {...form}>
            <form
              className="mt-6 w-full"
              onSubmit={form.handleSubmit(verificationCode)}
            >
              <div className="flex items-start gap-[24px] w-full common-container">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full ">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Event Name"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event Category
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Event Category"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="eventlocation"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
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

                <FormField
                  control={form.control}
                  name="eventdate"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event date
                      </FormLabel>
                      <FormControl>
                        <div className="pt-9 pb-3 gradient-slate pl-[0.75rem] border border-[#292929]   rounded-md cursor-pointer flex justify-between items-center ">
                          {/* <DatePicker datelabel={"Enter Event Date"}/> */}
                          <DatePicker
                            selected={EventDate}
                            onChange={(date) => setEventDate(date)}
                            autoFocus={false}
                            className="custom-datepicker text-[#ffffff]"
                            placeholderText="Enter Event Date"
                          />
                        </div>
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
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event Start time
                      </FormLabel>
                      <FormControl>
                        <div className="pt-9 pb-3 gradient-slate pl-[0.75rem] border border-[#292929]   rounded-md cursor-pointer flex justify-between items-center ">
                          {/* <TimePicker
                            onChange={setEventStartTime}
                            value={EventStartTime}
                            clockAriaLabel={false}
                            disableClock={true}
                            
                          /> */}
                           <DateTimePicker  onChange={setEventStartTime}
                            value={EventStartTime}
                            disableClock={true}
                            calendarIcon={false} 
                            clearIcon={false}
                            className="text-[#000000]"
                            />
                        </div>
                      </FormControl>

                      {/* <FormControl>
                        <Input
                          placeholder="Enter Start Time"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventStartTime(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventendtime"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-3 uppercase">
                        Event end time
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter End Time"
                          className="pt-11 pb-5 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventEndTime(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <FormField
                control={form.control}
                name="eventname"
                render={({ field }) => (
                  <FormItem className="relative w-full ">
                    <FormLabel className="text-sm text-gray-500 absolute left-3 top-3 uppercase">
                      Event Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Event Description"
                        className="pt-11 pb-[204px] font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setEventname(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="eventdescription"
                render={({ field }) => (
                  <FormItem className="relative w-full ">
                    <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                      Event Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        value={Eventdescription}
                        className="pt-11 create-txtarea-input "
                        onChange={(e) => {
                          setEventdescription(e.target.value);
                        }}
                        placeholder="Enter Event Description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="tickettype"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event Ticke type
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Type"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketType(e.target.value);
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
                  name="ticketpp"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event Ticket Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Price"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketType(e.target.value);
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
                  name="ticketno"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Event number of tickets
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter No. of Tickets"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketNo(e.target.value);
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
                  name="comptickettype"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Complimentary ticket type
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter type"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setCompTicketType(e.target.value);
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
                  name="compticketno"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
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

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        cover event image
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
                              {"Upload Image"}
                            </span>

                            <input
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload"
                              //   onChange={(e) => handleInputChangeForUploadMedia(e)}
                            />
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        cover event image
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
                              {"Upload Image"}
                            </span>

                            <input
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload"
                              //   onChange={(e) => handleInputChangeForUploadMedia(e)}
                            />
                          </label>
                        </div>
                      </FormControl>
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

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="galleryMedia"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Gallery media
                        {galleryFiles.length > 0 && (
                          <div className="mt-4 pb-4 relative">
                            <div className="flex flex-wrap gap-[12px] ">
                              {galleryFiles.map((file, index) => (
                                <>
                                  <div
                                    key={index}
                                    className="relative w-[80px] h-[80px] bg-gray-200  rounded-[12px]"
                                  >
                                    <Image
                                      src={URL.createObjectURL(file)}
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
                              galleryFiles.length > 0 ? "h-[200px] gallery-box" : "pt-9 gallery-top"
                            }`}
                          >
                            <span className="pl-[0.75rem] uploadImageButton">
                              {"Upload Images"}
                            </span>
                            <input
                              type="file"
                              multiple="multiple"
                              accept="image/png, image/jpg, image/jpeg, image/svg"
                              className="hidden"
                              id="galleryUpload"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
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

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="telegramurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Telegram
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTelegramuUrl(e.target.value);
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
              <div className="flex justify-end items-center mt-[36px]">
                <Button
                  type="submit"
                  className="font-bold py-[12px] px-[68px] "
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
