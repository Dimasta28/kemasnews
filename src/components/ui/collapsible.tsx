"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & { asChild?: boolean }
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} {...props} />;
});
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;


const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> & { asChild?: boolean }
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <CollapsiblePrimitive.Content asChild ref={ref} {...props} />;
});
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
