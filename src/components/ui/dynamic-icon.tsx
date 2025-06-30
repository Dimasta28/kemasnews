"use client";

import { icons, LucideProps } from "lucide-react";

type IconName = keyof typeof icons;

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    // Fallback to a generic icon if the name is invalid
    const FallbackIcon = icons["Globe"];
    return <FallbackIcon {...props} />;
  }

  return <LucideIcon {...props} />;
};

export { DynamicIcon };
export type { IconName };
