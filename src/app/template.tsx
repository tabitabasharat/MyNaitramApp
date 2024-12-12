"use client";
import { usePathname } from "next/navigation";
import Transition from "@/components/animations/Transition";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Template({ children }: { children: React.ReactNode }) {
  const profileRoutes = [
    "/profile/profile-main",
    "/profile/account-settings",
    "/profile/LiveAccntSettings",
    "/profile/help-center",
    "/profile/FAQ",
    "/organizer-event/payout-detail/cryptowallet",
    "/profile/Delete-account",
    "/side-drawer",
    "/side-drawer/live-event",
    "/venue",
    // `/side-drawer/ticket-data $[id]`,
    "/side-drawer/dashboard",
    "/side-drawer/ticket-data",
    "/side-drawer/whitelist-event",
    "/side-drawer/passworded-event",
    "/side-drawer/festivals-tickets",
    "/side-drawer/customer-ticket",
    "/side-drawer/event-analytics",
    "/side-drawer/private-event-ticketing",
    "/side-drawer/rsvp-ticketing",
    "/organizer-event/event-dashboard",
    "/organizer-event/profile",
    "/organizer-event/launch-event",
    "/organizer-event/sacnner-login",
    "/organizer-event/scanner-credentials",
    "/organizer-event/helpcenter",
    "/profile-perview",
    "/events/event-detail/live-activity",
    "/organizer-event/payout-detail",
    "organizer-event/payout-detail/cryptowallet",
    "/organizer-event/payout-detail/bankaccount",
    "/organizer-event/payout-detail/bankaccount/add-bank-account",
    "/organizer-event/payout-detail/cryptowallet/addCryptowallet",
    "/organizer-event/payout-history",
   "/organizer-event/get-paid",
  
    

    // "/wallet",
    // "/profile/reward-item"
  ];
  const pathname = usePathname();
  // const isProfileRoute = profileRoutes.includes(pathname);

  const isProfileRoute =
    profileRoutes.includes(pathname) ||
    pathname.startsWith("/organizer-event/add-scanner/");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Transition>
        <Header />
        {children}
        {!isProfileRoute && <Footer />}
        {/* <Footer /> */}
      </Transition>
    </>
  );
}
