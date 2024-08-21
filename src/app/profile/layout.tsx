import ProfileSidebar from "@/components/profile-page/ProfileSideBar";
import ProfileSideInfo from "@/components/profile-page/ProfileSideInfo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex main-box mx-2xl py-[8rem] px-[34px] lg:py-[9rem] xl:gap-12">
      <div className="w-full">
        <ProfileSideInfo />
        {children}
      </div>
    </div>
  );
}
