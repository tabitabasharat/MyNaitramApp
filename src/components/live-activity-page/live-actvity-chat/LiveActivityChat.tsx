import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import Chat from '@/components/live-activity-page/live-actvity-chat/Chat';
import { ScrollArea } from '@/components/ui/scroll-area';

const LiveActivityChat = () => {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/blur-green.png)',
        backgroundPosition: 'right',
      }}
      className="w-full lg:w-[576px] h-[600px] md:border md:border-[#292929] rounded-xl bg-cover bg-no-repeat px-5 relative md:overflow-hidden mt-12 md:mt-0"
    >
      <ScrollArea className="h-full w-full mt-1 z-0 space-y-2 pb-[6rem]">
        <div className="space-y-2">
          <Chat />
          <Chat img="/dj.jpg" />
          <Chat />
          <Chat img="/dj.jpg" />
          <Chat />
          <Chat img="/dj.jpg" />
          <Chat />
          <Chat img="/dj.jpg" />
          <Chat />
        </div>
      </ScrollArea>

      <div className="flex absolute bottom-8 w-[90%] gap-4 z-[2]">
        <Input placeholder="Type here" className="rounded-full h-12 px-6" />
        <Button className="rounded-full w-[36px] h-[36px]">
          <PaperPlaneTilt size={16} className="h-full" weight="bold" />
        </Button>
      </div>
      <div className="absolute top-[-3rem] md:top-8 bg-[#0A0D0B] px-3 py-2 translate-x-1/2 right-1/2 rounded-full z-[2]">
        <p className="font-bold text-[13px] text-[#D9D9D9]">Tue, 14 March</p>
      </div>
      <div className="absolute bottom-0 inset-0 rounded-xl gradient-chat z-[1] pointer-events-none"></div>
    </div>
  );
};

export default LiveActivityChat;
