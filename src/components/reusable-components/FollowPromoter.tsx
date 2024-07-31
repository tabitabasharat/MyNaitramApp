import Image from 'next/image';
import promoter from '@/assets/promoter.png';
import {
  InstagramLogo,
  SealCheck,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '../ui/button';
import Link from 'next/link';

const FollowPromoter = () => {
  return (
    <div className="mt-6 bg-white/10 rounded-xl p-6">
      <div className="flex gap-4">
        <Image
          src={promoter}
          width={50}
          height={50}
          className="rounded-xl border-2 border-[#D9D9D9] shadow-2xl"
          alt="promoter"
        />
        <div>
          <Link href={'/events/event-detail/promoter-profile'}>
            <p className="font-bold text-lg flex items-center gap-1 hover:underline">
              Dreamscape Events{' '}
              <SealCheck
                className="text-[#FFC109] -translate-y-1"
                size={18}
                weight="fill"
              />
            </p>
          </Link>
          <p>
            <span>48 Events</span> | <span>9.2k Attendees</span>
          </p>
        </div>
      </div>
      <hr className="border-white/10 my-5" />
      <div className="flex gap-3">
        <Button variant="secondary">Follow Promoter</Button>
        <div className="flex gap-3 h-full">
          <div className="border border-white w-fit p-2 rounded-full">
            <InstagramLogo size={25} weight="fill" />
          </div>
          <div className="border border-white w-fit p-2 rounded-full">
            <XLogo size={25} weight="fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowPromoter;
