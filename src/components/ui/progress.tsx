"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, content, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-8 w-full bg-center justify-center flex bg-no-repeat bg-contain",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 flex justify-center  transition-all"
      // FIX
      style={{ width: `${(value || 0)}%` }}
    />
	<p className=" text-foreground align-middle font-medium text-normal-stroke absolute left-1/2 -translate-x-1/2 top-[49%] -translate-y-1/2">{content}</p>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
