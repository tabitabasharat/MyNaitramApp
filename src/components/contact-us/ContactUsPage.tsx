"use client";

import { ArrowLeft, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { events } from "@/lib/dummyData";
import EventCard from "../reusable-components/EventCard";
import { useState } from "react";
import "./ContactUs.css";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Link from "next/link";

const ContactUsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [fullname, setFullname] = useState("");
  const [Lastname, setLastname] = useState("");

  const [Email, setEmail] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Role, setRole] = useState("");
  const [Contactno, setContactno] = useState("");
  const [Description, setDescription] = useState("");

  const clearInput = () => {
    setSearchTerm("");
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <section
      // style={{
      //   backgroundImage:
      //     "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
      //   backgroundPosition: "center",
      // }}
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat"
    >
      <div className="pxpx mx-2xl">
        {/* <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} type="button">
            <ArrowLeft size={22} />
          </button>
          <p>
            <span className="text-[#BFBFBF]">Home</span> / <span>Search</span>
          </p>
        </div> */}
        {/* <div className="w-full relative mt-12">
          <Input
            value={searchTerm}
            className="w-full h-14 px-5"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search Event"
          />
          <MagnifyingGlass
            size={20}
            className="absolute top-1/2 -translate-y-1/2 right-5"
          />
        </div> */}
        <div className="mt-12">
          <div className="flex flex-col justify-center items-center w-full h-full text-center mt-24">
            <h2 className="font-bold text-[24px] lg:text-[36px]">
              Get in Touch!
            </h2>
            <p className="text-[#BFBFBF] font-light">
              Ready to host on our platform?
            </p>
          </div>

          <div className="w-full relative mt-12 flex flex-col justify-center items-center ">
            <Input
              value={fullname}
              className=" px-5 name-input"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="First Name"
            />
            <Input
              value={fullname}
              className=" px-5 name-input mt-5"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Last Name"
            />
            <Input
              value={fullname}
              className=" px-5 name-input mt-5"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Email Address"
            />
            <Input
              value={fullname}
              className=" px-5 name-input mt-5"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Organization"
            />
            <Input
              value={fullname}
              className=" px-5 name-input mt-5"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Role"
            />
            <Input
              value={fullname}
              className=" px-5 name-input mt-5"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Contact Number"
            />

            <Textarea
              value={fullname}
              className=" px-5 text-area-input mt-5"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Tell us more about you are getting in touch"
            />
            {/* <textarea
              name=""
              id=""
              rows={6}
              cols={80}
              className="px-5 mt-5 text-area-input flex rounded-md border border-[#292929] gradient-slate px-3 py-2 text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 '"
              placeholder="Tell us more about you are getting in touch"
            /> */}
          </div>
          <div className="w-full relative mt-5 flex flex-col justify-center items-center ">
            <Button
              variant="secondary"
              className=" flex items-center ready-btn"
            >
              I'm Ready
            </Button>

            <div className="insta-link">
               <Link href="https://www.instagram.com/naitram.live/">
               Instagram: @naitram.live
               </Link>
            </div>
            <div className="insta-link">
               <Link href="https://www.instagram.com/naitram.live/">
               Customer support: support@naitram.live
               </Link>
            </div>
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 gap-[1rem]"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
