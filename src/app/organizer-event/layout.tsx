"use client";
import ProfileSidebar from "@/components/profile-page/ProfileSideBar";
import ProfileSideInfo from "@/components/profile-page/ProfileSideInfo";
import Image from "next/image";
import useMedia from "@/hooks/useMedia";
import { usePathname } from "next/navigation"; // Import usePathname
import Drawer from "@/components/EventOrganizer/Sidedrawer/Sidedrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMedia("(max-width: 768px)", false);
  const pathname = usePathname(); // Use usePathname to get the current route
  const isLunchEventRoute = pathname === "/organizer-event/lunch-event"; // Compare pathname to your desired route
  
  return (
    <div
      style={
        isMobile
          ? { position: "relative"}
          : { position: "relative", overflow: "hidden"}
      }
      className={`flex main-box mx-2xl ${!isLunchEventRoute && 'lunch-event-stlying'} min-h-[100vh] lg:min-h-5vh] lg:min-h-[100vh]`}
    >
      <div
        style={
          isMobile
            ? { position: "relative" }
            : { position: "relative", zIndex: "9" }
        }
        className="w-full"
      >
        <Drawer />
        {children}
      </div>
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            right: "0%",
            bottom: "0%",
            zIndex: "-1",
          }}
        >
          <div
            style={{
              width: "860px",
              height: "875px",
              background:
                "radial-gradient(circle at center, rgba(15, 255, 119, 0.32), rgba(0, 0, 0, 0))",
              filter: "blur(100px)",
              transform: "translate(125px, 125px)",
            }}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}
