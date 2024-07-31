'use client';

import {
  Calendar,
  CaretRight,
  FlyingSaucer,
  Planet,
} from '@phosphor-icons/react/dist/ssr';

import { posts } from '@/lib/dummyData';
import Thumbnail from '../ui/thumbnail';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import ClaimRewardCard from '../reusable-components/ClaimRewardCard';
import Dashboard from './Dashboard';

const YourRewards = () => {
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px]">Your Rewards</h2>

      <div className="flex flex-col 2xl:flex-row gap-10 w-full mt-4 lg:mt-10">
        <div className="w-full h-full">
          <p className="mb-2 text-muted">Your Balance</p>
          <div className="h-[360px] gradient-slate border rounded-lg border-muted">
            <Dashboard />
          </div>
          <div className="mt-12">
            <Dialog>
              <div className="flex justify-between">
                <p className="text-muted">My Items</p>
                <DialogTrigger asChild>
                  <button className="text-[#8F8F8F] flex hover:text-white duration-300">
                    View All <CaretRight size={20} weight="bold" />
                  </button>
                </DialogTrigger>
              </div>

              <ScrollArea className="w-full whitespace-nowrap ">
                <div className="flex gap-4 mt-6">
                  {posts.map((post) => (
                    <Thumbnail key={post.id} img={post.img} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <DialogContent className="sm:max-w-md lg:max-w-[600px] pb-0">
                <DialogHeader>
                  <DialogTitle className="font-bold text-2xl">
                    Photo Roll
                  </DialogTitle>
                  <Separator className="scale-x-[1.09] bg-[#292929]" />
                </DialogHeader>

                <ScrollArea className="h-72 w-full mt-1">
                  <div className="flex flex-wrap justify-center gap-4">
                    {posts.map((photoroll) => (
                      <Thumbnail key={photoroll.id} img={photoroll.img} />
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="2xl:w-[650px] h-full">
          <p className="mb-2 text-muted">Claimable Rewards</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 gap-4">
            <ClaimRewardCard
              heading="Daily Login Bonus"
              desc="Earn 5 MRT for Logging In Today!"
              icon={<Calendar weight="fill" size={35} />}
            />
            <ClaimRewardCard
              heading="Daily Login Bonus"
              desc="Earn 5 MRT for Logging In Today!"
              icon={<FlyingSaucer weight="fill" size={35} />}
            />
            <ClaimRewardCard
              heading="Daily Login Bonus"
              desc="Earn 5 MRT for Logging In Today!"
              icon={<FlyingSaucer weight="fill" size={35} />}
            />
            <ClaimRewardCard
              heading="Daily Login Bonus"
              desc="Earn 5 MRT for Logging In Today!"
              icon={<Planet weight="fill" size={35} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourRewards;
