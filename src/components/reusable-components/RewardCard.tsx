import { shimmer, toBase64 } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import { Reveal } from '../animations/Reveal';
import { ScaleReveal } from '../animations/ScaleReveal';

const RewardCard = ({
  img,
  title,
  desc,
}: {
  img: StaticImageData;
  title: string;
  desc: string;
}) => {
  return (
    <div className="w-full md:w-[500px] lg:w-full">
      <ScaleReveal>
        <Image
          src={img}
          width={500}
          height={500}
          className="rounded-xl w-full md:w-[500px] lg:w-full"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          alt="award"
        />
      </ScaleReveal>
      <Reveal y={100}>
        <h3 className="text-[32px] font-bold mt-8">{title}</h3>
      </Reveal>
      <Reveal y={100}>
        <p className="text-muted mt-6">{desc}</p>
      </Reveal>
    </div>
  );
};

export default RewardCard;
