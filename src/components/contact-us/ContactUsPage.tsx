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
import { Reveal } from "@/components/animations/Reveal";

const ContactUsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [fullname, setFullname] = useState("");
  const [Lastname, setLastname] = useState("");

  const [Email, setEmail] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");

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
      style={{
       
        backgroundImage: "url(/contact-ellipse.png)",
        backgroundPosition: " top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      
      }}
      className="min-h-screen  bg-cover bg-no-repeat contact-head"
    >
      <div className="pxpx mx-2xl contactus-inner">
        <div>
          <Reveal y={100} width="100%">
            <div className="flex flex-col justify-center items-center w-full h-full text-center">
              <h2 className="font-bold text-[31px] lg:text-[60px]">
                Get in Touch!
              </h2>
              <p className="text-[#FFFFFF] font-light lg:text-[20px] mt-5">
                Ready to host on our platform?
              </p>
            </div>
          </Reveal>

          <div className="w-full relative flex flex-col justify-center items-center inputs-contain">
            <Input
              value={fullname}
              className=" px-5 name-input"
              onChange={(event) => setFullname(event.target.value)}
              placeholder="First Name"
            />
            <Input
              value={Lastname}
              className=" px-5 name-input mt-5"
              onChange={(event) => setLastname(event.target.value)}
              placeholder="Last Name"
            />
            <Input
              value={Email}
              className=" px-5 name-input mt-5"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
            />
            <Input
              value={Organization}
              className=" px-5 name-input mt-5"
              onChange={(event) => setOrganization(event.target.value)}
              placeholder="Organization"
            />
            <Input
              value={Role}
              className=" px-5 name-input mt-5"
              onChange={(event) => setRole(event.target.value)}
              placeholder="Role"
            />
            <Input
                type="number"
              value={Contactno}
              className=" px-5 name-input mt-5"
              onChange={(event) => setContactno(event.target.value)}
              placeholder="Contact Number"
            />

            <Textarea
              value={Description}
              className=" px-5 text-area-input mt-5"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell us more about why you're getting in touch?"
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
              <Link href="https://www.instagram.com/naitram.live/" target="_blank">
                Instagram: @naitram.live
              </Link>
            </div>
            <div className="insta-link insta-link2">
              <Link href="/contactus">
                Customer support: support@naitram.live
              </Link>
            </div>

            <div className="update-box ">
            <div className="update-overlay">
              <Reveal y={100} width="100%">
                <div>

                <h2 className="font-bold text-[24px] lg:text-[60px] text-center ">
                  Stay informed and never miss<br></br> an update
                </h2>
                <div className="mail-and-btn">
                  <Input
                    value={EmailAddress}
                    className=" px-5 email-input focus:border-[#009540] focus:border-dashed email-input-bg "
                    onChange={(event) => setEmailAddress(event.target.value)}
                    placeholder="Your Email Address"
                  />
                  <Button
                    variant="secondary"
                    className=" flex items-center subscribe-btn"
                  >
                    Subscribe
                  </Button>
                </div>

                </div>
              </Reveal>
            </div>
          </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
