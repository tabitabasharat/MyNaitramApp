import Image from 'next/image';
import AvatarGradientBorder from '../ui/avatar-border-gradient';
import { cn, toBase64, shimmer } from '@/lib/utils';

const Avatar = ({ img, size }: any) => {
  return (
    <AvatarGradientBorder className="w-fit rounded-full p-[2px]">
      <div className="bg-black rounded-full p-[5px]">
        <Image
          src={img}
          width={500}
          height={500}
          className={cn(
            'size-[85px] object-cover object-top rounded-full',
            size,
          )}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          alt=""
        />
      </div>
    </AvatarGradientBorder>
  );
};

export default Avatar;
