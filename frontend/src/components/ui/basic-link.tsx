import * as React from 'react';
import PrimitiveLink from 'next/link';

import { cn } from '@/lib/utils';

export interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const BasicLink = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  ({ className, children, href, ...props }, ref) => {
    return (
      <PrimitiveLink
        href={href}
        className={cn('text-blue-700 hover:text-orange-600 dark:text-blue-500', className)}
        ref={ref}
        {...props}
      >
        {children}
      </PrimitiveLink>
    );
  },
);
BasicLink.displayName = 'BasicLink';

export { BasicLink };
