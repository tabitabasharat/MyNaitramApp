
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import CheckOutModal from '@/components/checkout/CheckOutModal';


const BuyTicket = () => {
  
  return (
    <Dialog>
      <div className="w-full lg:w-[665px] bg-[#007A3535] rounded-xl flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-between px-6 py-4 gap-4">
        <div>
          <p className="font-bold text-[24px] text-center lg:text-left">
            £10 - £50
          </p>
          <p className="text-muted text-sm md:text-base mt-1 text-center lg:text-left">
            Price may vary due to different ticket types
          </p>
        </div>
        <DialogTrigger asChild>
          <Button className="text-black px-[4rem] lg:py-7 w-full lg:w-fit">
            Buy Ticket
          </Button>
        </DialogTrigger>

        <CheckOutModal />
      </div>
    </Dialog>
  );
};

export default BuyTicket;
