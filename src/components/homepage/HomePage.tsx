"use client";
import About from "./sections/About";
import AllNaitramEvents from "./sections/AllNaitramEvents";
import Events from "./sections/Events";
import Hero from "./sections/Hero";
import RewardProgram from "./sections/RewardProgram";
import StayInformed from "./sections/StayInformed";
import ScreenLoader from "../loader/Screenloader";
import { useState, useEffect } from "react";
import SignInModal from "../auth/SignInModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AuthMode } from "@/types/types";
import SignUpModal from "../auth/SignUpModal";

const HomePage = () => {
  const [loader, setLoader] = useState(true);
  const [showmodal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("SIGNIN");

  return (
    <>
      {/* {loader && <ScreenLoader/>} */}

      <Dialog open={showmodal} onOpenChange={setShowModal}>
        {authMode === "SIGNIN" && (
          <SignInModal redirectRoute={`/viewallevents`} setAuthMode={setAuthMode} setSigninModal={() => setShowModal(false)} />
        )}
        {authMode === "SIGNUP" && <SignUpModal setAuthMode={setAuthMode} setSigninModal={() => setShowModal(false)} />}
      </Dialog>
      <Hero />
      {/* <Events />s */}
      <About />
      <RewardProgram />
      <AllNaitramEvents />
      <StayInformed />
    </>
  );
};

export default HomePage;
