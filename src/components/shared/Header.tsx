"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import naitramlogo from "@/assets/naitram-logo-white.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import arrowdown from "@/assets/aboutdropdown.svg";
import { cn, shimmer, toBase64 } from "@/lib/utils";
import { Sling as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";

import { AuthMode } from "@/types/types";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import ProfileSidebar from "@/components/profile-page/ProfileSideBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationPopUp from "../notifications/NotificationPopUp";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showProfile } from "@/lib/middleware/profile";

const Header = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("SIGNIN");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [fixedBg, setFixedBg] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [notifPopupOpen, setNotifPopupOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const count = useAppSelector((state) => state?.signIn);
  console.log(count, "this is good");

  const [token, setToken] = useState<any>();
  const dispatch = useAppDispatch();

  const isLoggedIn = true;
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

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
      url: "",
      subLinks: [
        { title: "Gallery", url: "/gallery" },
        { title: "Download App", url: "/download-app" },
      ],
    },
    { id: 3, title: "Event", url: "/viewallevents" },
    { id: 4, title: "Wallet", url: "/wallet" },
    { id: 5, title: "Rewards", url: "/reward" },
    { id: 6, title: "Get Sponsored", url: "/contactus" },
  ];
  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setToken(id);
  }, [token, count]);
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(showProfile(userid));
  }, []);

  const logout = () => {
    localStorage.clear();
    setToken("");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };
  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  console.log("my Profile is", myProfile);

  return (
    <>
      <AnimatePresence mode="wait">
        <Menu
          authMode={authMode}
          setAuthMode={setAuthMode}
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          toggleMenu={toggleMenu}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuIsOpen(false)}
            className="fixed bg-black z-[70] w-full h-full cursor-pointer menu-show"
          ></motion.div>
        )}
      </AnimatePresence>
      <header
        // style={{ position: }}
        className={cn(
          "fixed w-full pxpx py-[1.5rem] flex items-center justify-between z-50 duration-300",
          { "bg-black/50 backdrop-blur-lg webkit-header-blur": fixedBg }
        )}
      >
        <Link href="/">
          <div className="">
            <Image src={naitramlogo} alt="Naitram-Logo" />
          </div>
        </Link>
        <nav className="nav-inside">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              {/* Main Link */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleDropdownToggle(link.id)}
              >
                <Link
                  className={cn("", {
                    "font-bold": pathname === link.url,
                  })}
                  href={link.url}
                >
                  {link.title}
                  {link.id === 2 && (
                    <Image
                      src={arrowdown} // Specify your image path here
                      alt="About Image"
                      width={12} // Adjust width and height as needed
                      height={12}
                      className="ml-[5px] inline" // Adjust styling as needed
                    />
                  )}
                </Link>
              </div>

              {/* Underline on hover */}
              <div className="bg-white h-[1.5px] w-full translate-y-[-0.2rem] scale-x-0 group-hover:scale-x-100 duration-300"></div>

              {/* Dropdown Menu for 'About' */}
              {link.subLinks && openDropdown === link.id && (
                <div className="absolute left-0 mt-2 text-base font-bold gradient-slate bg-white shadow-lg rounded-md z-10">
                  {link.subLinks.map((subLink, j) => (
                    <Link
                      key={j}
                      href={subLink.url}
                      className="block px-4 py-2 hover:gradient-slate active:text-[#00D059] active:gradient-slate"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center">
          {token && (
            <Button
              className="hidden pt-[11px] lg:block lg:mr-[12px] background-[#13FF7A] text-[#030303]"
              // onClick={() => router.push("/organizer-event/event-dashboard")}
              onClick={() => router.push("/organizer-event/event-dashboard")}
            >
              Host Event
            </Button>
          )}

          <>
            {!token && (
              <Dialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="secondary" className="hidden lg:block">
                    Sign In
                  </Button>
                </DialogTrigger>
                {authMode === "SIGNIN" && isLoginDialogOpen && (
                  <SignInModal
                    redirectRoute={`/viewallevents`}
                    setAuthMode={setAuthMode}
                    setSigninModal={() => setIsLoginDialogOpen(false)}
                  />
                )}
                {authMode === "SIGNUP" && (
                  <SignUpModal
                    setAuthMode={setAuthMode}
                    setSigninModal={() => setIsLoginDialogOpen(false)}
                  />
                )}
              </Dialog>
            )}
          </>

          {isLoggedIn && token && (
            <div className="mr-[12px] md:ms-0 md:mr-0 lg:ms-0 lg:mr-0 flex items-center gap-4 h-full">
              <Popover open={notifPopupOpen} onOpenChange={setNotifPopupOpen}>
                <PopoverTrigger asChild>
                  <Bell size={25} className="cursot-pointer" />
                </PopoverTrigger>
                <PopoverContent className="text-white border border-muted shadow-custom bg-black w-[350px] lg:w-[400px] rounded-2xl -translate-x-4 translate-y-6">
                  <ScrollArea className="h-[450px] border-none ">
                    <NotificationPopUp setNotifPopupOpen={setNotifPopupOpen} />
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              <Popover open={popupOpen} onOpenChange={setPopupOpen}>
                <PopoverTrigger asChild>
                  <div className="border  p-[6px] border-muted gradient-slate rounded-full lg:flex items-center   cursor-pointer">
                    {/* <div className="size-[44px] lg:size-[44px] gradient-slate p-[6px] rounded-full overflow-hidden  shadow-inner shadow-md border border-gray-700 rounded-full border-gradient bg-gradient-to-t from-transparent to-transparent"> */}
                    <Link
                      href={"/profile/profile-main"}
                      className="display-none"
                    >
                      <Image
                        src={
                          myProfile?.profilePicture
                            ? myProfile?.profilePicture
                            : "/person3.jpg"
                        }
                        width={32}
                        height={32}
                        className="object-cover object-center rounded-full h-[32px]"
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(1200, 1800)
                        )}`}
                        alt="DP"
                      />
                    </Link>
                    {/* </div> */}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-black rounded-2xl text-white border-none shadow-none p-0 -translate-x-4 translate-y-2">
                  <ScrollArea className="h-[550px] rounded-2xl shadow-custom">
                    <ProfileSidebar
                      setPopupOpen={setPopupOpen}
                      className="top-0 w-[350px] md:w-full"
                    />
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          )}
          <button
            type="button"
            onClick={toggleMenu}
            className="flex translate-x-[0rem] items-center gap-[0.1rem] menu-show "
          >
            <div className="text-black bg-white rounded-full size-10 grid place-items-center">
              <div className="translate-x-[-0.3rem] translate-y-[-0.2rem]">
                <Hamburger toggled={menuIsOpen} size={17} />
              </div>
            </div>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
