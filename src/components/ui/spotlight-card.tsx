
'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import React from 'react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
      <div
        ref={ref}
        onMouseMove={(e) => {
          const { left, top } = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - left);
          mouseY.set(e.clientY - top);
        }}
        className={cn(
          'group relative w-full rounded-xl border border-border/20 bg-background shadow-lg transition-shadow duration-300 hover:shadow-2xl',
          className
        )}
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(350px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.15), transparent 80%)
            `,
          }}
        />
        {children}
      </div>
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';

export { SpotlightCard };
