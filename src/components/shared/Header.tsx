'use client';

import Image from 'next/image';
import logo from '@/assets/logo.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn, shimmer, toBase64 } from '@/lib/utils';
import { Sling as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SignInModal from '@/components/auth/SignInModal';
import SignUpModal from '@/components/auth/SignUpModal';

import { AuthMode } from '@/types/types';
import { Bell } from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence, motion } from 'framer-motion';
import Menu from './Menu';
import ProfileSidebar from '@/components/profile-page/ProfileSideBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import NotificationPopUp from '../notifications/NotificationPopUp';

const Header = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('SIGNIN');
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [fixedBg, setFixedBg] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [notifPopupOpen, setNotifPopupOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

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

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', changeBg);
  }

  const links = [
    { title: 'Home', url: '/' },
    { title: 'Events', url: '/events' },
    { title: 'About', url: '/about' },
    { title: 'Gallery', url: '/gallery' },
    // { title: 'Search', url: '/search' },
  ];
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
            className="fixed bg-black z-[70] w-full h-full cursor-pointer lg:hidden"
          ></motion.div>
        )}
      </AnimatePresence>
      <header
        className={cn(
          'fixed w-full pxpx py-[1.5rem] flex items-center justify-between z-50 duration-300',
          { 'bg-black/50 backdrop-blur-lg webkit-header-blur': fixedBg },
        )}
      >
        <Link href="/">
          <div className="w-[150px]">
            <Image src={logo} width={800} height={800} alt="Naitram-Logo" />
          </div>
        </Link>
        <nav className="hidden lg:flex gap-[3rem]">
          {links.map((link, i) => (
            <div key={i} className="relative group">
              <Link
                className={cn('', {
                  'font-bold': pathname === link.url,
                })}
                href={link.url}
              >
                {link.title}
              </Link>
              <div className="bg-white h-[1.5px] w-full translate-y-[-0.2rem] scale-x-0 group-hover:scale-x-100 duration-300"></div>
            </div>
          ))}
        </nav>
        <div className="flex items-center">
          {isLoggedIn && (
            <Dialog  open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
              <Button variant="secondary" className="hidden lg:block">
                  Sign In
                </Button>
              </DialogTrigger>
              {authMode === 'SIGNIN' && isLoginDialogOpen && (
                <SignInModal setAuthMode={setAuthMode}   setSigninModal={() => setIsLoginDialogOpen(false)}  />
              )}
              {authMode === 'SIGNUP' && (
                <SignUpModal setAuthMode={setAuthMode} setSigninModal={() => setIsLoginDialogOpen(false)} />
              )}
            </Dialog>
          )}
          {/* {isLoggedIn && (
            <div className="mr-2 lg:mr-4 flex items-center gap-4 h-full">
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
                  <div className="border border-muted gradient-slate rounded-full lg:flex items-center lg:gap-3 lg:py-[0.45rem] lg:pl-[0.45rem] lg:pr-6 cursor-pointer">
                    <div className="size-[40px] lg:size-[35px] rounded-full overflow-hidden">
                      <Image
                        src={'/person3.jpg'}
                        width={500}
                        height={500}
                        className="object-cover object-top"
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(1200, 1800),
                        )}`}
                        alt="DP"
                      />
                    </div>
                    <p className="font-bold hidden lg:block">Sohali</p>
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
          )} */}
          {/* <Button variant="secondary" className="hidden lg:block">
            Get the App
          </Button> */}
          <button
            type="button"
            onClick={toggleMenu}
            className="flex translate-x-[0rem] items-center gap-[0.1rem] lg:hidden"
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
