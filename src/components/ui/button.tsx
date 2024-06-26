import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center text-normal-stroke text-foreground justify-center whitespace-nowrap rounded-2xl text-center text-base font-medium ring-offset-white transition-colors disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        default: "bg-backdrop active:bg-backdrop/90 border border-border text-foreground font-bold",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-500/90",
        outline:
          "border border-backdrop bg-white",
        secondary:
          "bg-gray-100 text-gray-900 active:bg-gray-800/80",
        ghost: "hover:bg-backdrop text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "px-2 py-1",
        lg: "h-14",
		sm: "h-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
