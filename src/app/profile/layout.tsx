import ProfileSidebar from '@/components/profile-page/ProfileSideBar';
import ProfileSideInfo from '@/components/profile-page/ProfileSideInfo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex mx-2xl py-[8rem] px-[34px] lg:py-[9rem] xl:gap-12">
      <div className="w-[0px] sm:w-[150px] lg:w-[450px]" >
        <ProfileSideInfo/>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
