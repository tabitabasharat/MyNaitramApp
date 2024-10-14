import Link from "next/link";
import Hamburger from "hamburger-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  LinkedinLogo,
  TiktokLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import greenticket from "@/assets/greenTicket.svg";
import arrowUp from "@/assets/Arrow up.svg";
import arrowDown from "@/assets/aboutdropdown.svg";
import twitter from "@/assets/prime_twitter.svg";
import logo from "@/assets/logo.svg";
import { slide } from "@/components/animations/variants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import { AuthMode } from "@/types/types";
import naitramLogo from "@/assets/naitram-logo-white.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useRef } from "react";
const Menu = ({
  authMode,
  setAuthMode,
  menuIsOpen,
  setMenuIsOpen,
  toggleMenu,
}: {
  authMode: AuthMode;
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleMenu: () => void;
}) => {
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
      id: 2,
      subLinks: [
        { title: "Gallery", href: "/gallery" },
        { title: "Download App", href: "/download-app" },
      ],
    },
    {
      name: "Events",
      href: "/viewallevents",
    },

    {
      title: "Rewards",
      href: "/reward",
      id: 4,
      subLinks: [
        { title: "Wallet", href: "/wallet" },
        // { title: "Download App", href: "/download-app" },
      ],
    },
    // {
    //   name: "Rewards",
    //   href: "/reward",
    // },
    {
      name: "Get Sponsored",
      href: "/get-sponsor",
    },
  ];
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [token, setToken] = useState<any>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const count = useAppSelector((state) => state?.signIn);

  const logout = () => {
    localStorage.clear();
    setToken("");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };
  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setToken(id);
  }, [token, count]);

  const handleHostToggle = () => {
    setMenuIsOpen(false);
    if (!token) {
      console.log("Token host ", token);
      setIsLoginDialogOpen(true);
    } else {
      const userid =
        typeof window !== "undefined" ? localStorage.getItem("_id") : null;
      console.log("No token ", token);
      router.push("/organizer-event/event-dashboard");
    }
  };

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleDropdownToggle = (id: number) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // Detect clicks outside any dropdown to close it
  const handleClickOutside = (event: MouseEvent) => {
    const clickedOutside = dropdownRefs.current.every(
      (ref) => ref && !ref.contains(event.target as Node)
    );
    if (clickedOutside) setActiveDropdown(null);
  };

  // Listen for clicks outside of the dropdown to close it
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed z-[1205] right-0 h-full w-full md:w-[450px] gradient-slate border-l border-l-[#282828] px-[2.5rem] lg:hidden"
        initial={{ x: "120%" }}
        animate={{ x: menuIsOpen ? 0 : "120%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="overflow-y-scroll  overflow-x-clip h-full scrollbar-hidden">
          <div className="mt-[1.6rem] flex justify-between items-center w-full">
            <Link href="/" className="">
              <div className="">
                <Image src={naitramLogo} alt="Naitram-Logo" />
              </div>
            </Link>
            <button
              onClick={toggleMenu}
              className="flex items-center w-[40px] h-[40px] gap-[0.1rem] translate-x-[0.6rem]"
            >
              <div className="text-white w-[40px] flex h-[40px]">
                <Hamburger toggled={menuIsOpen} size={22} />
              </div>
            </button>
          </div>
          <div className="text-[19px] w-fit upperase flex flex-col gap-[2rem] mt-[3rem] text-white">
            {links.map((link, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={slide}
                animate="enter"
                initial="initial"
                className="relative w-fit group"
              >
                {link.subLinks ? (
                  <div
                    className="relative flex items-center"
                    ref={(el: any) => (dropdownRefs.current[i] = el)}
                  >
                    {/* Main link (e.g., "Rewards", "About") */}
                    <Link
                      href={link.href}
                      onClick={() => setActiveDropdown(null)} // Close menu when clicked
                      className="relative cursor-pointer"
                    >
                      {link.name || link.title}
                      <div className="absolute h-[1px] bottom-[0.15rem] scale-x-0 w-full group-hover:scale-x-100 bg-white duration-300 origin-left"></div>
                    </Link>

                    {/* Arrow for dropdown toggle */}
                    {(link.id === 2 || link.id === 4) && (
                      <div
                        className="ml-2 cursor-pointer"
                        onClick={() => handleDropdownToggle(link.id)} // Toggle dropdown
                      >
                        <Image
                          src={activeDropdown === link.id ? arrowUp : arrowDown}
                          alt={
                            activeDropdown === link.id
                              ? "Arrow Up"
                              : "Arrow Down"
                          }
                          className="ml-[5px]"
                          sizes="12px"
                        />
                      </div>
                    )}

                    {/* Dropdown Menu (conditionally rendered on click) */}
                    {activeDropdown === link.id && (
                      <motion.div
                        className="absolute top-[25px] left-0 mt-2 w-[200px] bg-white gradient-slate shadow-lg rounded-md z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {link.subLinks.map((subLink, j) => (
                          <Link
                            key={j}
                            href={subLink.href}
                            className="block px-4 py-2 hover:gradient-slate active:text-[#00D059] active:gradient-slate"
                          >
                            {subLink.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href || "#"}
                    onClick={() => setActiveDropdown(null)} // Close menu when clicked
                    className="relative"
                  >
                    {link.name || link.title}
                    <div className="absolute h-[1px] bottom-[0.15rem] scale-x-0 w-full group-hover:scale-x-100 bg-white duration-300 origin-left"></div>
                  </Link>
                )}
              </motion.div>
            ))}
            {/* <Dialog>
              <DialogTrigger asChild> */}
            <motion.div
              // onClick={() => {
              //   setMenuIsOpen(false);
              // }}
              custom={links.length + 1}
              variants={slide}
              animate="enter"
              exit="exit"
              initial="initial"
              className="h-fit w-fit flex gap-[1.5rem] flex-col gap:mt-[2rem] z-[1]"
            >
              <Button
                onClick={() => {
                  router.push("/verify-ticket");
                }}
                className="flex items-center add-bank-account-border  bg-black gap-[4px] p-[12px]"
              >
                <Image src={greenticket} alt="greenticket" />
                <p className=" font-extrabold text-base text-[#00D059]">
                  {" "}
                  Verify Ticket
                </p>
              </Button>
              <Button
                variant="secondary"
                className="bg-[#13FF7A] p-[12px] py-[8px] font- font-extrabold text-base lg:mr-[12px]"
                // onClick={() => router.push("/organizer-event/event-dashboard")}
                onClick={() => {
                  handleHostToggle();
                }}
              >
                Host Event
              </Button>
            </motion.div>

            {!token && (
              <Dialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="hidden pb-[6px] lg:block"
                  >
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
          </div>

          {token || count?.signIn?.data?.id ? (
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  onClick={() => {
                    logout();
                    setMenuIsOpen(false);
                  }}
                  custom={links.length + 1}
                  variants={slide}
                  animate="enter"
                  exit="exit"
                  initial="initial"
                  className="h-fit w-fit mt-[1.5rem] lg:mt-[2rem] z-[1]"
                >
                  <Button className="px-[3rem] bg-[#13FF7A]">Logout</Button>
                </motion.div>
              </DialogTrigger>
              {authMode === "SIGNIN" && (
                <SignInModal
                  redirectRoute="/viewallevents"
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
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  onClick={() => {
                    setMenuIsOpen(false);
                  }}
                  custom={links.length + 1}
                  variants={slide}
                  animate="enter"
                  exit="exit"
                  initial="initial"
                  className="h-fit w-fit mt-[1.5rem] lg:mt-[2rem] z-[1]"
                >
                  <Button className="px-[3rem] bg-white">Sign In</Button>
                </motion.div>
              </DialogTrigger>
              {authMode === "SIGNIN" && (
                <SignInModal
                  redirectRoute="/viewallevents"
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
          <motion.div
            custom={links.length + 2}
            variants={slide}
            animate="enter"
            exit="exit"
            initial="initial"
            className="mt-[2.6rem] text-white flex items-center gap-[1.3rem] pb-[2rem]"
          >
            <div className="flex gap-[0.5rem] mt-[0.8rem]">
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/naitramlive"
              >
                <LinkedinLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link>
              {/* <Link
                target="_blank"
                href="https://www.instagram.com/naitram.live/"
              >
                <InstagramLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link> */}
              <Link
                target="_blank"
                href="https://www.instagram.com/naitram.live/"
              >
                <InstagramLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link>
              {/* <Link target="_blank" href="">
              <FacebookLogo  className="w-[32px] h-[32px]" weight="fill" />
            </Link> */}
              {/* <Link
                target="_blank"
                href="https://www.tiktok.com/@naitram.verified?_t=8qCgj42cequ&_r=1"
              >
                <TiktokLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link> */}
              {/* <Link
                target="_blank"
                href="https://www.tiktok.com/@naitram.entertainment?_t=8qCgbmu3oB7&_r=1"
              >
                <TiktokLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link> */}

              <Link
                target="_blank"
                href="https://x.com/naitramlive"
              >
                {/* <TwitterLogo size={30} weight="fill" /> */}
                <Image
                  src={twitter}
                  className="w-[30px] h-[30px]"
                  alt="twitter"
                />
              </Link>
              {/* <Link target="_blank" href="">
              <TelegramLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link> */}
              <Link
                target="_blank"
                href="https://www.youtube.com/@naitramlive"
              >
                <YoutubeLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link>
              {/* <Link
                target="_blank"
                href="https://youtube.com/@naitram.entertainment?si=rYyYuGCajrn2v3TM"
              >
                <YoutubeLogo className="w-[32px] h-[32px]" weight="fill" />
              </Link> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Menu;
