'use client';

import { CaretRight } from '@phosphor-icons/react/dist/ssr';

import { photorolls } from '@/lib/dummyData';
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

const PhotoRoll = () => {
  return (
    <div>
      <Dialog>
        <div className="flex justify-between">
          <p>Photo Roll</p>
          <DialogTrigger asChild>
            <button className="text-[#8F8F8F] flex hover:text-white duration-300">
              View All <CaretRight size={20} weight="bold" />
            </button>
          </DialogTrigger>
        </div>

        {/* LARGE SCREEN VIEW */}
        <div className="hidden md:flex flex-wrap gap-4 justifybetween justify-center items-center mt-6">
          {photorolls.map((photoroll) => (
            <Thumbnail key={photoroll.id} img={photoroll.img} />
          ))}
        </div>

        {/* SMALL SCREEN VIEW */}
        <ScrollArea className="block md:hidden w-full whitespace-nowrap ">
          <div className="flex gap-4 mt-6">
            {photorolls.map((photoroll) => (
              <Thumbnail key={photoroll.id} img={photoroll.img} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DialogContent className="sm:max-w-md lg:max-w-[600px] pb-0">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Photo Roll</DialogTitle>
            <Separator className="scale-x-[1.09] bg-[#292929]" />
          </DialogHeader>

          <ScrollArea className="h-72 w-full mt-1">
            <div className="flex flex-wrap justify-center gap-4">
              {photorolls.map((photoroll) => (
                <Thumbnail key={photoroll.id} img={photoroll.img} />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoRoll;
