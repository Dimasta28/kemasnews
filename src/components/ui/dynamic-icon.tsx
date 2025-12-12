"use client";

import { icons, LucideProps } from "lucide-react";

type IconName = keyof typeof icons;

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = icons[name as IconName];

  if (!LucideIcon) {
    // Fallback to a generic icon if the name is invalid
    const FallbackIcon = icons["Globe"];
    return <FallbackIcon {...props} />;
  }

  return <LucideIcon {...props} />;
};

export { DynamicIcon };
export type { IconName };
