import { cn, shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import AccountSidebarLink from "@/components/reusable-components/AccountSidebarLink";
import {
  FileText,
  Headphones,
  Question,
  UserGear,
  FileLock,
  Chats,
  // Deleteaccnt,
} from "@phosphor-icons/react/dist/ssr";
import { DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileSidebar = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {
  const router =useRouter();
  return (
    <div
      className={cn(
        "sticky top-[9rem] z-[10] h-full bg-black shadow-custom rounded-2xl overflow-hidden",
        className
      )}
    >
      <Image
        src={"/person3.jpg"}
        width={500}
        height={500}
        className="absolute h-[200px] object-cover object-center blur-[20px]"
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(1200, 1800)
        )}`}
        alt="DP"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="z-[2] relative pt-4 px-6 pb-0">
        <div className="flex gap-4">
          <div>
            <GradientBorder className="rounded-full p-[2px]">
              <div className="bg-black rounded-full p-[4px]">
                <Image
                  src={"/person3.jpg"}
                  width={500}
                  height={500}
                  className="size-[84px] object-cover object-top rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="DP"
                />
              </div>
            </GradientBorder>
          </div>
          <div>
            <p className="text-primary text-sm font-bold pt-[5px]">TOP USER</p>
            <p className="font-bold text-lg pt-[2px] pb-[8px]">
              Sohail Hussain
            </p>
            <p className="text-sm">
              <span className="text-[#E6E6E6]">07 Attend</span>{" "}
              <span className="opacity-20">|</span>{" "}
              <span className="text-[#E6E6E6]">0 Following</span>
            </p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-muted font-black">SETTINGS</p>
          <div className="mt-2 flex flex-col gap-2">
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Account Settings"
              leftElement={<UserGear size={20} weight="bold" />}
              url="/profile/account-settings"
            />
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Live Activity Settings"
              leftElement={<Chats size={20} weight="bold" />}
              url="/profile/LiveAccntSettings"
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-muted font-black">SUPPORTS</p>
          <div className="mt-3 flex flex-col gap-2">
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Help Center"
              leftElement={<Headphones size={20} weight="bold" />}
              url="/profile/help-center"
            />
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="FAQs"
              leftElement={<Question size={20} weight="bold" />}
              url="/profile/faqs"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-muted font-black">ABOUT</p>
          <div className="mt-2 flex flex-col pb-5 gap-2">
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Terms & Conditions"
              leftElement={<FileText size={20} weight="bold" />}
              url="/profile/terms-conditions"
            />
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Privacy policy"
              leftElement={<FileLock size={20} weight="bold" />}
              url="/profile/privacy-policy"
            />
          </div>
        </div>
       
        <button className="bg-customRed w-full h-full border-none mb-[50px] rounded-full py-4 ">
          logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
