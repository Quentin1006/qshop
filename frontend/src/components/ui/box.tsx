import * as React from 'react';

import { cn } from '@/lib/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn('flex h-full items-center justify-center bg-white p-4', className)} ref={ref} {...props}>
      {children}
    </div>
  );
});
Box.displayName = 'Box';

export { Box };
