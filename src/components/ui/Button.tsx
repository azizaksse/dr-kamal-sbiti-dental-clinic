"use client";

import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide",
  {
    variants: {
      variant: {
        primary: "cta-primary focus-visible:ring-accent-gold",
        secondary: "cta-secondary focus-visible:ring-accent-golden-grey",
        outline: "bg-transparent ring-1 ring-accent-golden-grey/30 text-accent-text hover:bg-accent-golden-grey/10 hover:ring-accent-golden-grey/50",
        ghost: "bg-transparent text-accent-text hover:bg-accent-golden-grey/10",
        gold: "cta-golden focus-visible:ring-accent-gold",
        premium: "cta-premium focus-visible:ring-accent-gold",
      },
      size: {
        sm: "h-9 px-4 text-xs cta-small",
        md: "h-11 px-6 text-sm cta-medium",
        lg: "h-14 px-8 text-base cta-large",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    asChild?: boolean;
  };

export default function Button({ className, variant, size, asChild, ...props }: ButtonProps): ReactElement {
  const Comp = asChild ? Slot : "button";
  return <Comp className={clsx(buttonVariants({ variant, size }), className)} {...props} />;
}


