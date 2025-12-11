'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';

interface CircularCounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

const CircularCounter = ({ to, suffix = '', className }: CircularCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const circumference = 2 * Math.PI * 45; // 2 * pi * radius (50-5)

  useEffect(() => {
    if (isInView && numberRef.current) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (numberRef.current) {
            numberRef.current.textContent = value.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <div ref={ref} className={`relative w-40 h-40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-current text-gray-200 dark:text-gray-700"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-current text-primary"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - (to / 100) * circumference } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
        {/* Inner filled circle */}
        <circle
            cx="50"
            cy="50"
            r="35"
            className="fill-current text-primary"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p ref={numberRef} className="text-3xl font-bold text-primary-foreground">0</p>
      </div>
    </div>
  );
};

export { CircularCounter };
    