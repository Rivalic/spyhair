import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-gold text-primary-foreground shadow-[0_8px_24px_-8px_hsl(43_80%_60%/0.6)] hover:shadow-[0_12px_32px_-8px_hsl(43_80%_60%/0.8)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "glass text-foreground hover:bg-white/10",
        secondary: "bg-secondary/60 backdrop-blur-md text-secondary-foreground border border-white/10 hover:bg-secondary/80",
        ghost: "hover:bg-white/5 text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gold: "bg-gradient-gold text-primary-foreground font-semibold shadow-[0_8px_24px_-8px_hsl(43_80%_60%/0.6)] hover:shadow-[0_14px_36px_-8px_hsl(43_80%_60%/0.85)]",
        goldOutline: "glass-gold text-primary font-semibold hover:text-primary-foreground hover:bg-primary/30",
        elegant: "glass text-foreground hover:bg-white/10",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
