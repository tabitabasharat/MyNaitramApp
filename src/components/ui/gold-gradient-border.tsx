import React from 'react';
import { cn } from '@/lib/utils';

const GoldGradientBorder = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn('p-px border-secondary overflow-hidden w-full', className)}
    >
      {children}
    </div>
  );
};

export default GoldGradientBorder;
