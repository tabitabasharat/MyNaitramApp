"use client";
import { usePathname } from 'next/navigation';
import Transition from '@/components/animations/Transition';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Template({ children }: { children: React.ReactNode }) {
  const profileRoutes = [
    "/profile/profile-main",
    "/profile/account-settings",
    "/profile/LiveAccntSettings",
    "/profile/help-center",
    "/profile/FAQ",
    "/profile/Delete-account",
    "/social-profile",
    "/organizer-event/event-dashboard",
    "/organizer-event/profile",
    "profile-perview",
    "/management",
    "/organizer-event/launch-event",
    "/eventsales",
    "/organizer-event/sacnner-login",
    `/organizer-event/add-scanner/$[id]`,
    "/organizer-event/scanner-credentials",
    "/organizer-event/helpcenter",
    "/profile-perview",
    "/preview-event",
    "/events/event-detail/live-activity",
  ];
  const pathname = usePathname();
  // const isProfileRoute = profileRoutes.includes(pathname);

  // Check for dynamic route using pathname.startsWith
  const isProfileRoute = profileRoutes.includes(pathname) || pathname.startsWith("/organizer-event/add-scanner/");

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
      </Transition>
    </>
  );
}
