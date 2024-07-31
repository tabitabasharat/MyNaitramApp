'use client';

import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import ProfileDetails from './ProfileDetails';
import PostTabs from './PostTabs';
import { useRouter } from 'next/navigation';
import { truncateString } from '@/lib/utils';

const PersonalSocialProfile = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        style={{ filter: 'blur(40px)' }}
        width={1000}
        height={1000}
        src={'/person1.png'}
        className="w-full object-cover absolute top-0 object-top z-0 opacity-[0.22] h-screen"
        alt=""
      />
      <div className="pxpx mx-2xl pt-36 pb-12 lg:pt-36 lg:pb-36 relative z-[2]">
        <div className="flex gap-4 mb-8 ">
          <button onClick={() => router.back()}>
            <ArrowLeft size={22} />
          </button>
          <p>
            <span className="text-[#BFBFBF]">Event</span> /
            <span className="text-[#BFBFBF] lg:hidden">
              {' '}
              {truncateString("PIZDEZ Women's Day Party 2024", 5)}{' '}
            </span>
            <span className="text-[#BFBFBF] hidden lg:inline-block px-1">
              {' '}
              PIZDEZ Women's Day Party 2024{' '}
            </span>
            /{' '}
            <span className="text-[#BFBFBF] lg:hidden">
              {' '}
              {truncateString('Live Activity', 4)}{' '}
            </span>
            <span className="text-[#BFBFBF] hidden lg:inline-block px-1">
              {' '}
              Live Activity{' '}
            </span>{' '}
            / <span>Evelyn Lynn</span>
          </p>
        </div>

        <ProfileDetails />
        <PostTabs />
      </div>
    </div>
  );
};

export default PersonalSocialProfile;
