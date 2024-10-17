import { cn, shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const Thumbnillive = ({ img, size , width, height}: any) => {
  return (
    <Image
      src={img}
      width={width ? width : 500}
      height={height ? height : 500}
      className={cn('size-[84px] mb-[0px] object-cover object-top rounded-lg', size)}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
      alt=""
    />
  );
};

export default Thumbnillive;
