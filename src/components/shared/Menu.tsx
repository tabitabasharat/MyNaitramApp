import Link from "next/link";
import Hamburger from "hamburger-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import logo from "@/assets/logo.svg";
import { slide } from "@/components/animations/variants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import { AuthMode } from "@/types/types";
import arrowdown from "@/assets/aboutdropdown.svg"
import dropdown from "@/assets/aboutdropdown.svg"
import naitramLogo from "@/assets/naitram-logo-white.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
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
      src:arrowdown,
      // url: "",
      subLinks: [
        { title: "Gallery", herf: "/gallery" },
        { title: "Download App", herf: "/download-app" },
      ],
    },
    {
      name: "Event",
      href: "/events",
    },
    {
      name: "Wallet",
      href: "/wallet",
    },
    {
      name: "Rewards",
      href: "/reward",
    },
    {
      name: "Get Sponsored",
      href: "/contactus",
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

  return (
    <>
      <motion.div
        className="fixed right-0 h-full w-full md:w-[450px] gradient-slate border-l border-l-[#282828] z-[80] px-[2.5rem] lg:hidden"
        initial={{ x: "120%" }}
        animate={{ x: menuIsOpen ? 0 : "120%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="overflow-y-scroll overflow-x-clip h-full scrollbar-hidden">
          <div className="mt-[1.6rem] flex justify-between items-center w-full">
            <Link href="/" className="">
              <div className="">
                <Image src={naitramLogo} alt="Naitram-Logo" />
              </div>
            </Link>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-[0.1rem] translate-x-[0.6rem]"
            >
              <div className="text-white ">
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
                // exit="exit"
                initial="initial"
                className="relative w-fit group"
                onClick={() => {
                  setMenuIsOpen(false);
                }}
              >
                {/* Main Link */}
                <Link href={link.href || "#"} className="relative">
                  {link.name || link.title} 
                </Link>

                {/* Underline hover effect */}
                <div className="absolute h-[1px] bottom-[0.15rem] scale-x-0 w-full group-hover:scale-x-100 bg-white duration-300 origin-left"></div>

                {/* Dropdown Menu for links with subLinks (e.g. 'About') */}
                {link.subLinks && (
                  <motion.div
                    className="absolute left-0 mt-2 w-[200px] hidden group-hover:block bg-white gradient-slate shadow-lg rounded-md z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: -10 }}
                  >
                    {link.subLinks.map((subLink, j) => (
                      <Link
                        key={j}
                        href={subLink.herf} // Fixing typo herf -> href
                        className="block px-4 py-2  hover:gradient-slate active:text-[#00D059] active:gradient-slate"
                      >
                        {subLink.title} 
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* {links.map((link, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={slide}
                animate="enter"
                exit="exit"
                initial="initial"
                className="relative w-fit group"
                onClick={() => {
                  setMenuIsOpen(false);
                }}
              >
                <Link key={i} href={link.href}>
                  {link.name}{" "}
                </Link>
                <div
                  className={`absolute h-[1px] bottom-[0.15rem] scale-x-0 w-full group-hover:scale-x-100 bg-white duration-300 origin-left`}
                ></div>
              </motion.div>
            ))} */}
            <Button
              variant="secondary"
              className=" lg:mr-[12px]"
              onClick={() => router.push("/create-event")}
            >
              Host Event
            </Button>
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
                  <Button className="px-[3rem]">Logout</Button>
                </motion.div>
              </DialogTrigger>
              {authMode === "SIGNIN" && (
                <SignInModal
                  redirectRoute="/events"
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
                  <Button className="px-[3rem]">Sign In</Button>
                </motion.div>
              </DialogTrigger>
              {authMode === "SIGNIN" && (
                <SignInModal
                  redirectRoute="/events"
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
              <Link href={""}>
                <LinkedinLogo
                  size={30}
                  weight="fill"
                  className="hover:opacity-60 duration-300"
                />
              </Link>
              <Link href={""}>
                <InstagramLogo
                  size={30}
                  weight="fill"
                  className="hover:opacity-60 duration-300"
                />
              </Link>
              <Link href={""}>
                <FacebookLogo
                  size={30}
                  weight="fill"
                  className="hover:opacity-60 duration-300"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Menu;
