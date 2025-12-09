
'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ from = 0, to, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [motionValue, isInView, to]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = prefix + latest.toFixed(0) + suffix;
        }
      }),
    [springValue, prefix, suffix]
  );

  return <span ref={ref} />;
}
