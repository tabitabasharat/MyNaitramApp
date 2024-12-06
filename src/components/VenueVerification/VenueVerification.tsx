"use client";

import Backward from "../Backward/Backward";
import ufo from "@/assets/UFO_SVG.png";
import Image from "next/image";
import blur from "@/assets/V2assets/Blur.svg";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import arrowdown from "../../assets/arrow-down-drop.svg";
import link from "@/assets/V2assets/Link Simple.svg";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Venue Name cannot be empty." }),
  address: z.string().min(1, { message: "Venue Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(1, { message: "State/Region cannot be empty." }),
  postalcode: z.string().min(1, { message: "Postal Code cannot be empty." }),
  country: z.string().min(1, { message: "Country cannot be empty." }),
  managerName: z.string().min(1, { message: "Manager Name cannot be empty." }),
  capacity: z.string().min(1, { message: "Capacity cannot be empty." }),
  licensed: z.string().min(1, { message: "licensed cannot be empty." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }) // Email validation
    .nonempty({ message: "Email cannot be empty." }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number." }) // Only digits and optional leading '+'
    .nonempty({ message: "Phone number cannot be empty." }),
  inspection: z.string().min(1, { message: "Inspection cannot be empty." }),
});
const cities = ["New York", "Los Angeles", "Chicago", "Houston"];

function VenueVerification() {
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to an array
      setGalleryFiles(fileArray); // Update state with selected files
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalcode: "",
      country: "",
      managerName: "",
      capacity: "",
      email: "",
      phone: "",
      licensed: "",
      inspection: "",
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenvenue, setIsDropdownOpenvenue] = useState(false);
  const [isDropdownOpentype, setIsDropdownOpentype] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [customvenue, setCustomvenue] = useState("");
  const [customtype, setCustomtype] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedtype, setSelectedtype] = useState<string | null>(null);
  const [selectedvenue, setSelectedvenue] = useState<string | null>(null);
  const [categories, setCategories] = useState([{ label: "Category 1" }, { label: "Category 2" }, { label: "Category 3" }]);
  const [type, setType] = useState([{ label: "Category 1" }, { label: "Category 2" }, { label: "Category 3" }]);
  const [venue, setVenue] = useState([{ label: "Category 1" }, { label: "Category 2" }, { label: "Category 3" }]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdowntype = () => setIsDropdownOpentype(!isDropdownOpentype);
  const toggleDropdownlicensed = () => setIsDropdownOpenvenue(!isDropdownOpenvenue);

  const handleAddCategory = () => {
    if (customCategory.trim() && customCategory.length <= 15) {
      setCategories((prev) => [...prev, { label: customCategory }]);
      setCustomCategory("");
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };
  const handleAddCategoryvenue = () => {
    if (customvenue.trim() && customvenue.length <= 15) {
      setVenue((prev) => [...prev, { label: customvenue }]);
      setCustomvenue("");
    }
  };

  const handleCategorySelectvenue = (category: string) => {
    setSelectedvenue(category);
    setIsDropdownOpenvenue(false);
  };
  const handleAddCategoryType = () => {
    if (customtype.trim() && customtype.length <= 15) {
      setType((prev) => [...prev, { label: customtype }]);
      setCustomtype("");
    }
  };

  const handleCategorySelectType = (category: string) => {
    setSelectedtype(category);
    setIsDropdownOpentype(false);
  };

  return (
    <section className="bg-img-effect bg-cover bg-center ">
      <div className="pt-[120px] z-[1200] md:pt-[132px] pb-[100px] md:pb-[132px] md:px-[35px] lg:px-[75px] xl:px-[180px] px-[24px]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full xl:w-[1080px] ">
            <div>
              <Backward />
              <h1 className="text-[30px] md:text-[48px] font-extrabold pb-[24px] mt-[20px] md:mt-[30px]">Event Venue Verification Form</h1>
            </div>
            <div className="flex flex-col gap-[52px] md:gap-[32px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => console.log(values))}>
                  <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] ">
                    <div className="flex h-[56px] bg-color rounded-t-[12px]">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Venue </span>
                        <span>Information</span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    <div className="pt-[8px] flex flex-col gap-[16px] sm:gap-[24px] p-[24px] md:pb-[32px] md:pt-[32px] md:px-[60px]">
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">venue NAME</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Venue Name"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
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
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="relative w-full space-b-[16px] md:space-b-[24px]">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">City</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter City"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
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
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white font-extrabold absolute left-3 top-[25px] uppercase">
                                venue country
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Venue Country"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="space-t-0" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                    <div className="flex h-[56px] bg-color rounded-t-[12px]">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Venue </span>
                        <span>Details</span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    <div className="pt-[8px] flex flex-col gap-[16px] sm:gap-[24px] p-[24px] md:pb-[32px] md:pt-[32px] md:px-[60px]">
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
                        <FormField
                          control={form.control}
                          name="capacity"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base text-white text-white font-extrabold absolute left-3 top-[25px] uppercase">
                                venue capacity
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Capacity"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="relative py-[13px] mt-[8px] w-full rounded-md border border-[#292929] gradient-slate px-[12px]">
                          {/* Header */}
                          <div className="flex items-center justify-between cursor-pointer" onClick={toggleDropdown}>
                            <div className="flex flex-col">
                              <p className="text-base text-white text-white font-extrabold pb-[4px] uppercase">Venue Type</p>
                              <p className="text-[12px] font-bold text-[#8F8F8F]">{selectedCategory || "Select Venue Type"}</p>
                            </div>
                            <Image
                              src={arrowdown} // Replace with your actual image path
                              width={11}
                              height={11}
                              alt="Toggle Dropdown"
                            />
                          </div>

                          {/* Dropdown */}
                          {isDropdownOpen && (
                            <div className="absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px] h-[210px] overflow-auto">
                              {/* Custom Category Input */}
                              <div className="flex items-center gap-4 mb-4">
                                <input
                                  type="text"
                                  placeholder="Enter new category"
                                  value={customCategory}
                                  onChange={(e) => setCustomCategory(e.target.value)}
                                  className="w-full px-2 py-1 rounded-md border border-gray-500 text-sm text-white bg-transparent focus:outline-none"
                                />
                                <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                                  Add
                                </button>
                              </div>

                              {/* Category Options */}
                              {categories.map((category, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-2 cursor-pointer"
                                  onClick={() => handleCategorySelect(category.label)}
                                >
                                  <p
                                    className={`text-[16px] font-normal ${selectedCategory === category.label ? "text-[#00d059]" : "text-[#FFFFFF]"}`}
                                  >
                                    {category.label}
                                  </p>
                                  {selectedCategory === category.label && (
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
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
                        <div className="relative w-full sm:w-[50%] py-[13px] mt-[8px] w-full rounded-md border border-[#292929] gradient-slate px-[12px]">
                          {/* Header */}
                          <div className="flex items-center justify-between cursor-pointer" onClick={toggleDropdowntype}>
                            <div className="flex flex-col">
                              <p className="text-base text-white text-white font-extrabold pb-[4px] uppercase">event Type</p>
                              <p className="text-[12px] font-bold text-[#8F8F8F]">{selectedCategory || "Select Event Type"}</p>
                            </div>
                            <Image
                              src={arrowdown} // Replace with your actual image path
                              width={11}
                              height={11}
                              alt="Toggle Dropdown"
                            />
                          </div>

                          {/* Dropdown */}
                          {isDropdownOpentype && (
                            <div className="absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px] h-[210px] overflow-auto">
                              {/* Custom Category Input */}
                              <div className="flex items-center gap-4 mb-4">
                                <input
                                  type="text"
                                  placeholder="Enter new category"
                                  value={customCategory}
                                  onChange={(e) => setCustomtype(e.target.value)}
                                  className="w-full px-2 py-1 rounded-md border border-gray-500 text-sm text-white bg-transparent focus:outline-none"
                                />
                                <button onClick={handleAddCategoryType} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                                  Add
                                </button>
                              </div>

                              {/* Category Options */}
                              {categories.map((category, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-2 cursor-pointer"
                                  onClick={() => handleCategorySelectType(category.label)}
                                >
                                  <p
                                    className={`text-[16px] font-normal ${selectedCategory === category.label ? "text-[#00d059]" : "text-[#FFFFFF]"}`}
                                  >
                                    {category.label}
                                  </p>
                                  {selectedCategory === category.label && (
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
                        <div className="relative w-full sm:w-[50%] py-[13px] mt-[8px] w-full rounded-md border border-[#292929] gradient-slate px-[12px]">
                          {/* Header */}
                          <div className="flex items-center justify-between cursor-pointer" onClick={toggleDropdownlicensed}>
                            <div className="flex w-[95%] flex-col">
                              <p className="text-base text-white text-white truncate-styling2 font-extrabold pb-[4px] uppercase">
                                is the venue licensed for the event type?
                              </p>
                              <p className="text-[12px] font-bold text-[#8F8F8F]">{selectedCategory || "Select"}</p>
                            </div>
                            <Image
                              src={arrowdown} // Replace with your actual image path
                              width={11}
                              height={11}
                              alt="Toggle Dropdown"
                            />
                          </div>

                          {/* Dropdown */}
                          {isDropdownOpenvenue && (
                            <div className="absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px] h-[210px] overflow-auto">
                              {/* Custom Category Input */}
                              <div className="flex items-center gap-4 mb-4">
                                <input
                                  type="text"
                                  placeholder="Enter new category"
                                  value={customCategory}
                                  onChange={(e) => setCustomvenue(e.target.value)}
                                  className="w-full px-2 py-1 rounded-md border border-gray-500 text-sm text-white bg-transparent focus:outline-none"
                                />
                                <button onClick={handleAddCategoryvenue} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                                  Add
                                </button>
                              </div>

                              {/* Category Options */}
                              {categories.map((category, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-2 cursor-pointer"
                                  onClick={() => handleCategorySelectvenue(category.label)}
                                >
                                  <p
                                    className={`text-[16px] font-normal ${selectedCategory === category.label ? "text-[#00d059]" : "text-[#FFFFFF]"}`}
                                  >
                                    {category.label}
                                  </p>
                                  {selectedCategory === category.label && (
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
                      </div>
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
                        <form className="w-full max-w-md gradient-slate gradient-slate-input rounded-lg shadow-lg py-[16px] px-[12px] space-y-4">
                          <div className="relative space-y-0">
                            <p className="text-base text-white font-extrabold uppercase">licensed copy</p>
                            <label
                              htmlFor="fileUpload"
                              className={`gallery-box-same border-none text-[#8F8F8F] font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold gradient-slatee rounded-md cursor-pointer flex items-end ${
                                galleryFiles?.length > 0 ? "gallery-box" : "gallery-tops"
                              }`}
                            >
                              <span>{galleryFiles?.length > 0 ? `${galleryFiles.length} file(s) selected` : "Attach Licensed Copy"}</span>
                              <input type="file" multiple accept="image/*, video/*" id="fileUpload" className="hidden" onChange={handleFileChange} />
                            </label>
                          </div>

                          {/* Display selected file names */}
                          {galleryFiles?.length > 0 && (
                            <div className="mt-4">
                              <p className="text-gray-300 text-sm font-semibold">Selected Files:</p>
                              <ul className="list-disc list-inside text-gray-400 text-sm mt-2">
                                {galleryFiles.map((file, index) => (
                                  <li key={index}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="gradient-slate w-full rounded-[12px] mb-[52px] md:mb-[32px] xl:w-[1080px]">
                    <div className="flex h-[56px] rounded-t-[12px] bg-color">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Venue </span>
                        <span>Contact Information</span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    <div className="pt-[8px] flex flex-col gap-[16px] sm:gap-[24px] p-[24px] md:pb-[32px] md:pt-[8px] md:px-[60px]">
                      <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[24px] w-full common-container">
                        {/* Event Name fields */}
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
                                  placeholder="Enter Venue Manager Name"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="relative space-b-[16px] md:space-b-[24px] w-full">
                              <FormLabel className="text-base truncate-styling text-white font-extrabold absolute left-3 top-[25px] uppercase">
                                Venue manager email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Venue Manager Email"
                                  className="pt-12 pb-6 font-bold text-[12px] placeholder:text-[12px] placeholder:font-bold placeholder:text-[#8F8F8F]"
                                  {...field}
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
                          name="phone"
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
                                  // onInput={(e) => {
                                  //     // Remove any non-numeric characters
                                  //     e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                  // }}
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
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="gradient-slate w-full rounded-[12px] xl:w-[1080px]">
                    <div className="flex h-[56px] bg-color rounded-[12px]">
                      <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]">
                        <span className="text-[#13FF7A]">Declaration </span>
                      </p>
                      <Image src={ufo} width={350} height={350} className="hidden sm:block" alt="ufo" />
                    </div>
                    <div className="p-[24px] md:py-[32px] md:px-[60px]">
                      <div className="items-start gap-[24px] w-full common-container">
                        <p className="text-sm md:text-base mb-[20px]">
                          By signing this form, I confirm that the above information is accurate and that I have provided all necessary documentation
                          to verify the venue for the event.
                        </p>
                        <p className="text-sm md:text-base mb-[20px]">Organizer Signature: ___________________________</p>
                        <p className="text-sm md:text-base mb-[20px]">Date: ___________________________</p>
                        <p className="text-sm md:text-base mb-[20px]">Ticket Platform Representative Signature: ___________________________</p>
                        <p className="text-sm md:text-base mb-[20px]"> Date: ___________________________</p>
                        <p className="text-sm md:text-base mb-[20px]">
                          This form must be completed and approved by the ticket platform before ticket sales or event promotion can commence.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <Button
                      type="submit"
                      className="mt-8 px-4 py-[12px] bg-[#00A849]  text-sm md:text-base font-extrabold w-full sm:w-[200px] text-black font-bold rounded-[200px]"
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
