"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import naitramlogo from "@/assets/naitram-logo-white.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import greenticket from "@/assets/Group 1597878034.svg";
import { usePathname } from "next/navigation";
import { cn, shimmer, toBase64 } from "@/lib/utils";
import { useRef } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import arrowup from "@/assets/Arrow up.svg";
import arrowdown from "@/assets/aboutdropdown.svg";
// import arrowDownIcon from "@/assets/arrow-down-drop.svg"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";

import { AuthMode } from "@/types/types";
import { Bell, LockKey } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import ProfileSidebar from "@/components/profile-page/ProfileSideBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationPopUp from "../notifications/NotificationPopUp";
import logout from "../../assets/logout.svg";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";
import { getOrganizerDetail } from "@/lib/middleware/organizer";
import bellred from "@/assets/Wallet/bell red.svg";
import { getUserNotifications, getOrgNotifications, UserNotificationReadAll, OrgNotificationReadAll } from "@/lib/middleware/notification";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";

const Header = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("SIGNIN");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [fixedBg, setFixedBg] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [notifPopupOpen, setNotifPopupOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"USER" | "ORGANISER">("USER");
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("/person3.jpg");

  // Toggle the dropdown open/close state
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const [Unreadnotification,setUnreadNotification] = useState<any>("");

  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // Track the currently open dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsOpen(false); // Optional: close the menu after selection

    if (link === "Organizer Profile") {
      setProfilePic(myOrgData?.userDetails?.organizerProfile?.profilePicture || "/person3.jpg");
      localStorage.setItem("profilePic", myOrgData?.userDetails?.organizerProfile?.profilePicture ?? "/person3.jpg");
    } else {
      setProfilePic(myProfile?.profilePicture || "/person3.jpg");
      localStorage.setItem("profilePic", myProfile?.profilePicture ?? "/person3.jpg");
    }
  };

  // Toggle dropdown function
  const handleDropdownToggle = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const count = useAppSelector((state) => state?.signIn);
  console.log(count, "this is good");

  const [token, setToken] = useState<any>();
  const dispatch = useAppDispatch();

  const isLoggedIn = true;
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(getUserNotifications(userid));
    dispatch(getOrgNotifications(userid));
  }, []);

  const changeBg = () => {
    if (window.scrollY >= 10) {
      setFixedBg(true);
    } else {
      setFixedBg(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBg);
  }

  const links = [
    { id: 1, title: "Home", url: "/" },
    {
      id: 2,
      title: "About",
      url: "/about",
      subLinks: [
        { title: "Gallery", url: "/gallery" },
        { title: "Download App", url: "/download-app" },
      ],
    },
    { id: 3, title: "Events", url: "/viewallevents" },
    // { id: 4, title: "Rewards", url: "/reward" },
    {
      id: 4,
      title: "Rewards",
      url: "/reward",
      // subLinks: [{ title: "Wallet", url: "/wallet" }],
    },
    { id: 5, title: "Get Sponsored", url: "/get-sponsor" },
    { id: 6, title: "My Tickets", url: "/wallet" },
  ];
  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setToken(id);
  }, [token, count]);

  // Dispatcing the user profile and Organizer profile
  useEffect(() => {
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(showProfile(userid));
    dispatch(getOrganizerDetail(userid));
  }, []);

  const Logout = () => {
    localStorage.clear();
    setToken("");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  const myProfile = useAppSelector((state) => state?.getShowProfile?.myProfile?.data);
  const myOrgData = useAppSelector((state) => state?.getOrgDetail?.orgDetail?.data?.data);

  useEffect(() => {
    if (localStorage.getItem("profilePic")) {
      setProfilePic(localStorage.getItem("profilePic") || "/person3.jpg");
    } else {
      if (myProfile) {
        setProfilePic(myProfile?.profilePicture || "/person3.jpg");
      } else {
        setProfilePic("/person3.jpg");
      }
    }
  }, [myProfile, myOrgData]);

  const handleHostToggle = () => {
    if (!token) {
      console.log("Token host ", token);
      setIsLoginDialogOpen(true);
    } else {
      const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
      console.log("No token ", token);
      router.push("/organizer-event/event-dashboard");
    }
  };

  const Notify = useAppSelector((state) => state?.getUserNotifications?.myNotifications?.data);
  const NotifyOrg = useAppSelector((state) => state?.getOrgNotifications?.myNotifications?.data);
  const Unreadnotification = Notify && Notify?.some((item: any) => item && item?.NotifyRead === false);

  const UnreadnotificationOrg = NotifyOrg && NotifyOrg?.some((item: any) => item && item?.NotifyRead === false);

  console.log("Notify:", Notify);
  console.log("Unreadnotification:", Unreadnotification);

  async function UserReadAll(id: any) {
    console.log("my notify id is", id);
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setLoader(true);

    try {
      const data = {
        userId: userid,
      };
      dispatch(UserNotificationReadAll(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Notification Status Res", res?.payload?.data);
          SuccessToast("Marked All as read");
          dispatch(getUserNotifications(userid));
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function OrgReadAll(id: any) {
    console.log("my notify id is", id);
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setLoader(true);

    try {
      const data = {
        userId: userid,
      };
      dispatch(OrgNotificationReadAll(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Notification Status Res", res?.payload?.data);
          SuccessToast("Marked All as read");

          dispatch(getOrgNotifications(userid));
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Menu authMode={authMode} setAuthMode={setAuthMode} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} toggleMenu={toggleMenu} />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuIsOpen(false)}
            className="fixed bg-black z-70 w-full h-full cursor-pointer menu-show"
          ></motion.div>
        )}
      </AnimatePresence>
      <header
        className={cn("fixed w-full pxpx py-[26px] sm:pr-[24px] flex items-center justify-between z-50 duration-300", {
          "bg-black/50 backdrop-blur-lg webkit-header-blur": fixedBg,
        })}
      >
        <Link href="/">
          <div className="">
            <Image src={naitramlogo} alt="Naitram-Logo" />
          </div>
        </Link>
        <nav className="nav-inside">
          {links.map((link) => (
            <div key={link.id} className="relative group" ref={link.id === openDropdown ? dropdownRef : null}>
              {/* Main Link */}
              <div className="flex items-center cursor-pointer">
                <Link href={link.url} className={`text-base font-normal ${pathname === link.url ? "active" : ""}`}>
                  {link.title}
                </Link>

                {/* Toggle arrows only for IDs 2 and 4 */}
                {/* {(link.id === 2 || link.id === 4) && ( */}
                {link.subLinks && (
                  <Image
                    src={openDropdown === link.id ? arrowup : arrowdown} // Change icon based on state
                    alt={`${link.title} Arrow`}
                    width={12}
                    height={12}
                    className="ml-[5px] h-[12px] w-[12px] inline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link redirection
                      handleDropdownToggle(link.id); // Toggle dropdown
                    }}
                  />
                )}
              </div>

              {/* Underline on hover */}
              <div className="bg-white h-[1.5px] w-full translate-y-[-0.2rem] scale-x-0 group-hover:scale-x-100 duration-300"></div>

              {/* Dropdown Menu */}
              {link.subLinks && openDropdown === link.id && (
                <div className="absolute left-0 mt-2 text-base font-bold gradient-slate bg-white shadow-lg rounded-md z-10">
                  {link.subLinks.map((subLink, j) => (
                    <Link
                      key={j}
                      href={subLink.url}
                      className="block px-4 py-2 hover:gradient-slate active:text-[#00D059] active:gradient-slate hover:text-[#00D059] text-sm"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex lg:gap-[10px] items-center">
          <div className="hidden lg:block">
            <Button
              onClick={() => {
                router.push("/verify-ticket");
              }}
              className="flex items-center add-bank-account-border  bg-black gap-[4px] p-[12px]"
            >
              <Image src={greenticket} alt="greenticket" />
              <p className=" font-extrabold text-base text-[#00D059]"> Verify Ticket</p>
            </Button>
          </div>
          {/* Host Event */}
          <div>
            <Button
              className="hidden p-[12px] py-[8px] font- font-extrabold text-base lg:block background-[#13FF7A] text-[#030303]"
              onClick={() => handleHostToggle()}
            >
              Host Event
            </Button>
          </div>
          {/* signIn*/}
          <>
            {!token && (
              <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="hidden pb-[6px] lg:block">
                    Sign In
                  </Button>
                </DialogTrigger>
                {authMode === "SIGNIN" && isLoginDialogOpen && (
                  <SignInModal redirectRoute={`/viewallevents`} setAuthMode={setAuthMode} setSigninModal={() => setIsLoginDialogOpen(false)} />
                )}
                {authMode === "SIGNUP" && <SignUpModal setAuthMode={setAuthMode} setSigninModal={() => setIsLoginDialogOpen(false)} />}
              </Dialog>
            )}
          </>

          {/* Bell, UserImage, and DropDown */}
          {isLoggedIn && token && (
            <div className="relative mr-[12px] md:mr-[12px] lg:ms-0 lg:mr-[12px] xl:mr-- flex items-center lg:gap-[8px] gap-[10px] h-full cursor-pointer">
              <Popover open={notifPopupOpen} onOpenChange={setNotifPopupOpen}>
                <PopoverTrigger asChild className="relative z-[1200] cursor-pointer">
                  {Unreadnotification || UnreadnotificationOrg ? (
                    <Image
                      className="lg:size-[24px] h-[28px] w-[28px] lg:h-[24px] lg:w-[24px] size-{28px} cursot-pointer"
                      src={bellred}
                      alt="unread-bell"
                    />
                  ) : (
                    <Bell className="lg:size-[24px] h-[28px] w-[28px] lg:h-[24px] lg:w-[24px] size-{28px} cursot-pointer" />
                  )}
                </PopoverTrigger>

                <PopoverContent
                  className=" flex items-end flex-col cursor-pointer relative z-[1200] text-white border border-muted 
                shadow-custom bg-black w-[350px] lg:w-[400px] rounded-2xl  -translate-x-4 translate-y-6"
                >
                  <ScrollArea className="h-[600px] px-[8px] pb-[15px] border-none w-full ">
                    <NotificationPopUp setNotifPopupOpen={setNotifPopupOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
                  </ScrollArea>
                  {activeTab == "USER" && Notify && Unreadnotification && (
                    <Button
                      className=" py-[12px] text-[12px] h-[32px] flex 
                  items-center justify-center mt-2"
                      onClick={UserReadAll}
                    >
                      Mark as all read
                    </Button>
                  )}

                  {activeTab == "ORGANISER" && UnreadnotificationOrg && NotifyOrg && (
                    <Button
                      className=" py-[12px] text-[12px] h-[32px] flex 
                  items-center justify-center mt-2"
                      onClick={OrgReadAll}
                    >
                      Mark as all read
                    </Button>
                  )}
                </PopoverContent>
              </Popover>

              {/* <Popover open={popupOpen} onOpenChange={setPopupOpen}> */}
              {/* user Image and drop down arrow */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-[10px]">
                    {/* <div className="border h-[44px] w-[44px] border-muted gradient-slate rounded-full items-center  cursor-pointer"> */}
                    <div className="size-[44px] lg:size-[44px] gradient-slate p-[6px] rounded-full overflow-hidden  shadow-inner shadow-md border border-gray-700 rounded-full border-gradient bg-gradient-to-t from-transparent to-transparent">
                      <div>
                        <Link href={"/profile/profile-main"} className="display-none">
                          <Image
                            src={profilePic}
                            width={32}
                            height={32}
                            className="object-cover object-center rounded-full w-[32px] h-[32px]"
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
                            alt="DP"
                          />
                        </Link>
                      </div>

                      {/* </div> */}
                    </div>
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                      {/* Dropdown Button */}
                      <div>
                        <button onClick={toggleDropdown} className="">
                          <svg
                            className={` h-[20px] w-[20px] text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        {isOpen && (
                          <div
                            style={{
                              background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                            }}
                            className="absolute w-[179px] right-0 z-10 mt-4 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                          >
                            <div className="flex gap-[9px] justify-center p-[24px] flex-col">
                              <Link
                                href="/organizer-event/event-dashboard"
                                onClick={() => handleLinkClick("Organizer Profile")}
                                className={`block text-start text-sm hover:text-green-500 ${
                                  activeLink === "Organizer Profile" ? " text-green-500" : "text-white"
                                }`}
                              >
                                Organiser Profile
                              </Link>
                              <Link
                                href="/profile/profile-main"
                                onClick={() => handleLinkClick("User Profile")}
                                className={`block text-start text-sm hover:text-green-500 ${
                                  activeLink === "User Profile" ? "text-green-500" : "text-white"
                                }`}
                              >
                                User Profile
                              </Link>
                              <div className="w-fit flex justify-start items-center">
                                <button className="block text-start text-sm hover:text-green-500 text-white" onClick={Logout}>
                                  {/* <Image src={logout} className="w-[16px] md:w-[24px] me-[8px] md:me-[14px]" alt="img" /> */}
                                  Log out
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-black rounded-2xl text-white border-none shadow-none p-0 -translate-x-4 translate-y-2">
                  <ScrollArea className="h-[550px] rounded-2xl shadow-custom">
                    {/* <ProfileSidebar
                      setPopupOpen={setPopupOpen}
                      className="top-0 w-[350px] md:w-full"
                    /> */}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          )}

          <button type="button" onClick={toggleMenu} className="flex translate-x-[0rem] items-center gap-[0.1rem] menu-show ">
            <div className="text-black bg-white rounded-full size-10 grid place-items-center">
              <div className="translate-x-[-0.3rem] translate-y-[-0.2rem]">
                <Hamburger toggled={menuIsOpen} size={20} />
              </div>
            </div>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
