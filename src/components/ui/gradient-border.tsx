import React from 'react';
import { cn } from '@/lib/utils';

const GradientBorder = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'p-px border-primary overflow-hidden w-full rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GradientBorder;
