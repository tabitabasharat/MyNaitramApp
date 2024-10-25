"use client";
import ProfileSidebar from "@/components/profile-page/ProfileSideBar";
import ProfileSideInfo from "@/components/profile-page/ProfileSideInfo";
import Image from "next/image";
import useMedia from "@/hooks/useMedia";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMedia("(max-width: 768px)", false);
  return (
    <div
      style={
        isMobile
          ? { position: "relative" }
          : { position: "relative", overflow: "hidden", height:"125vh"}
      }
      className="flex main-box mx-2xl py-[8rem] px-[34px] lg:py-[9rem] xl:gap-12 lg:min-h-[110vh]"
    >
      <div
        style={isMobile?{ position: "relative" }:{ position: "relative", zIndex: "9" }}
        className="w-full h-[100%]"
      >
        <ProfileSideInfo />
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
              transform: "translate(125px, 125px)", // Adjust these values to move the blur further down and right
            }}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}
