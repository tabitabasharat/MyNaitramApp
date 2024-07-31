import Link from 'next/link';
import Hamburger from 'hamburger-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { motion } from 'framer-motion';
import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
} from '@phosphor-icons/react/dist/ssr';
import logo from '@/assets/logo.svg';
import { slide } from '@/components/animations/variants';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import SignInModal from '@/components/auth/SignInModal';
import SignUpModal from '@/components/auth/SignUpModal';
import { AuthMode } from '@/types/types';

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
      name: 'Home',
      href: '/',
    },
    {
      name: 'Events',
      href: '/events',
    },
    {
      name: 'About',
      href: '/',
    },
    {
      name: 'Gallery',
      href: '/',
    },
    {
      name: 'Search',
      href: '/search',
    },
  ];

  return (
    <>
      <motion.div
        className="fixed right-0 h-full w-full md:w-[450px] gradient-slate border-l border-l-[#282828] z-[80] px-[2.5rem] lg:hidden"
        initial={{ x: '120%' }}
        animate={{ x: menuIsOpen ? 0 : '120%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="overflow-y-scroll overflow-x-clip h-full scrollbar-hidden">
          <div className="mt-[1.6rem] flex justify-between items-center w-full">
            <Link href="/" className="">
              <div className="w-[100px]">
                <Image src={logo} width={800} height={800} alt="Naitram-Logo" />
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
                exit="exit"
                initial="initial"
                className="relative w-fit group"
                onClick={() => {
                  setMenuIsOpen(false);
                }}
              >
                <Link key={i} href={link.href}>
                  {link.name}{' '}
                </Link>
                <div
                  className={`absolute h-[1px] bottom-[0.15rem] scale-x-0 w-full group-hover:scale-x-100 bg-white duration-300 origin-left`}
                ></div>
              </motion.div>
            ))}
          </div>
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
                <Button className="px-[3rem]">Sign Up</Button>
              </motion.div>
            </DialogTrigger>
            {authMode === 'SIGNIN' && <SignInModal setAuthMode={setAuthMode} />}
            {authMode === 'SIGNUP' && <SignUpModal setAuthMode={setAuthMode} />}
          </Dialog>
          <motion.div
            custom={links.length + 2}
            variants={slide}
            animate="enter"
            exit="exit"
            initial="initial"
            className="mt-[2.6rem] text-white flex items-center gap-[1.3rem] pb-[2rem]"
          >
            <div className="flex gap-[0.5rem] mt-[0.8rem]">
              <Link href={''}>
                <LinkedinLogo
                  size={30}
                  weight="fill"
                  className="hover:opacity-60 duration-300"
                />
              </Link>
              <Link href={''}>
                <InstagramLogo
                  size={30}
                  weight="fill"
                  className="hover:opacity-60 duration-300"
                />
              </Link>
              <Link href={''}>
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
