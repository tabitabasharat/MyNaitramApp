import Image from 'next/image';
import { DialogContent } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import sad from '@/assets/sad.svg';

const TicketPurchaseExpire = () => {
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[400px]">
      <div className="w-fit pt-4 px-2">
        <div className="rounded-full overflow-hidden size-[100px] mx-auto">
          <Image
            src={sad}
            className="rounded-full object-cover"
            width={500}
            height={500}
            alt="expired-icon"
          />
        </div>
        <p className="text-center w-[90%] mx-auto mt-4">
          Your ticket purchase is expired. Please re-order the tickets to get
          yours!
        </p>
        <Button className="w-full mt-14">Re-Order Tickets</Button>
      </div>
    </DialogContent>
  );
};

export default TicketPurchaseExpire;
