import { cn, shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';
import GradientBorder from '../ui/gradient-border';
import AccountSidebarLink from '@/components/reusable-components/AccountSidebarLink';
import {
  FileText,
  Headphones,
  Question,
  Ticket,
  Translate,
  Trophy,
  UserGear,
  FileLock,
} from '@phosphor-icons/react/dist/ssr';

const ProfileSidebar = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {
  return (
    <div
      className={cn(
        'sticky top-[9rem] z-[10] h-full bg-black shadow-custom rounded-2xl overflow-hidden',
        className,
      )}
    >
      <Image
        src={'/person3.jpg'}
        width={500}
        height={500}
        className="absolute h-[200px] object-cover object-center blur-[20px]"
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(1200, 1800),
        )}`}
        alt="DP"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="z-[2] relative py-7 px-6">
        <div className="flex gap-4">
          <div>
            <GradientBorder className="rounded-full p-[2px]">
              <div className="bg-black rounded-full p-[4px]">
                <Image
                  src={'/person3.jpg'}
                  width={500}
                  height={500}
                  className="size-[60px] object-cover object-top rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800),
                  )}`}
                  alt="DP"
                />
              </div>
            </GradientBorder>
          </div>
          <div>
            <p className="text-primary text-sm font-bold">TOP USER</p>
            <p className="font-bold text-lg">Sohail Hussain</p>
            <p className="text-sm">
              <span className="text-[#E6E6E6]">07 Attend</span>{' '}
              <span className="opacity-20">|</span>{' '}
              <span className="text-[#E6E6E6]">324 Following</span>
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1.5">
          <AccountSidebarLink
            setPopupOpen={setPopupOpen}
            title="Your Tickets"
            leftElement={<Ticket size={20} weight="bold" />}
            url="/profile/your-tickets"
          />
          <AccountSidebarLink
            setPopupOpen={setPopupOpen}
            title="Your Rewards"
            leftElement={<Trophy size={20} weight="bold" />}
            url="/profile/your-rewards"
          />
        </div>
        <div className="mt-4">
          <p className="text-muted font-black">SETTINGS</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Account Settings"
              leftElement={<UserGear size={20} weight="bold" />}
              url="/profile/account-settings"
            />
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Languages"
              leftElement={<Translate size={20} weight="bold" />}
              url="/profile/languages"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-muted font-black">SUPPORTS</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="Help Center"
              leftElement={<Headphones size={20} weight="bold" />}
              url="/profile/help-center"
            />
            <AccountSidebarLink
              setPopupOpen={setPopupOpen}
              title="FAQS"
              leftElement={<Question size={20} weight="bold" />}
              url="/profile/faqs"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-muted font-black">ABOUT</p>
          <div className="mt-2 flex flex-col gap-1.5">
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
      </div>
    </div>
  );
};

export default ProfileSidebar;
