'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { DynamicIcon, type IconName } from './dynamic-icon';

interface CircularCounterProps {
  to: number;
  suffix?: string;
  className?: string;
  iconName?: string;
}

const CircularCounter = ({ to, suffix = '', className, iconName }: CircularCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const circumference = 2 * Math.PI * 45; // 2 * pi * radius (50-5)
  const progress = to / 100;

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
          className="stroke-current text-primary-foreground/10"
          strokeWidth="6"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-current text-primary-foreground"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
        {iconName && <DynamicIcon name={iconName} className="h-6 w-6 mb-1" />}
        <div className="flex items-baseline">
            <p ref={numberRef} className="text-4xl font-bold">0</p>
            {suffix && <span className="text-xl font-bold">{suffix}</span>}
        </div>
      </div>
    </div>
  );
};

export { CircularCounter };
    