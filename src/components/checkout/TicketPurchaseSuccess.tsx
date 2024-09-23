'use client';
import Image from 'next/image';
import { DialogContent } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import success from '@/assets/success.svg';
import { shimmer, toBase64 } from '@/lib/utils';
import { Separator } from '../ui/separator';
import {
  DeviceMobile,
  DownloadSimple,
  Ticket,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr';
import { ScrollArea } from '../ui/scroll-area';
import ufo from '@/assets/ufo.png';
import { DialogClose } from '@radix-ui/react-dialog';
import Link from 'next/link';




const TicketPurchaseSuccess = ({ setCurrentModal }: any) => {

 
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[500px] px-0 pb-0 overflow-hidden">
      <ScrollArea className="max-h-[90vh]">
        <div className="w-full pt-4">
          <div className="px-10">
            {' '}
            <div className="rounded-full overflow-hidden size-[100px] mx-auto">
              <Image
                src={success}
                className="rounded-full object-cover"
                width={500}
                height={500}
                alt="expired-icon"
              />
            </div>
            <p className="text-center mx-auto mt-4">
              Your ticket purchase is confirmed. <br />
              We can't wait to see you there!
            </p>
            <div className="border border-muted p-3 rounded-lg gradient-slate mt-8">
              <div className="flex gap-4 mb-3">
                <Image
                  src={'/event4.png'}
                  width={800}
                  height={800}
                  className="w-[45px] rounded-lg object-cover"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800),
                  )}`}
                  alt="event"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-sm">
                      Saturday, 5th March 2024
                    </p>
                    <p className="font-bold leading-[1.2] my-1">
                      PIZDEZ Women's Day Party 2024
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between mt-4 text-sm">
                <p className="font-light">Regular Package</p>
                <p className="font-bold">
                  <span className="font-light opacity-50">2x </span>£15
                </p>
              </div>
            </div>
            <DialogClose asChild>
              <Link href="/events">
                <Button
                  onClick={() => setCurrentModal('BuyTicket')}
                  className="w-full mt-14"
                >
                  Browse Other Events
                </Button>
              </Link>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => setCurrentModal('BuyTicket')}
                variant="outline"
                className="w-full mt-4"
              >
                Close
              </Button>
            </DialogClose>
          </div>
          <div className="relative bg-[#002912] border border-[#262626] mt-12 rounded-b-xl p-8 overflow-hidden">
            <h2 className="text-2xl">Download NAITRAM App</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-3">
                <UsersThree
                  size={22}
                  weight="fill"
                  className="text-[#8F8F8F]"
                />
                <p>Keep up with the event with Live Activity Feature</p>
              </div>
              <div className="flex gap-3">
                <Ticket size={22} weight="fill" className="text-[#8F8F8F]" />
                <p>View and open your tickets easily</p>
              </div>
              <div className="flex gap-3">
                <DeviceMobile
                  size={22}
                  weight="fill"
                  className="text-[#8F8F8F]"
                />
                <p>Browse any event anytime from your hand</p>
              </div>
            </div>
            <Button  className="flex items-center gap-[0.5rem] rounded-full mt-6 w-full">
              <DownloadSimple size={20} weight="fill" />
              <Link href="/download-app">
              Download App to Unlock Features
              </Link>
            </Button>
            <Image
              src={ufo}
              width={300}
              height={300}
              className="absolute right-0 bottom-0 scale-[1.5]"
              alt=""
            />
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default TicketPurchaseSuccess;
