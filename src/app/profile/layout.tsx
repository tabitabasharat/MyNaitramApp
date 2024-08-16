import ProfileSidebar from '@/components/profile-page/ProfileSideBar';
import ProfileSideInfo from '@/components/profile-page/ProfileSideInfo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex pxpx mx-2xl py-[8rem] lg:py-[9rem] gap-10 xl:gap-12">
      <div className="w-[450px] hidden lg:block">
        {/* <ProfileSidebar /> */}
        <ProfileSideInfo/>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
