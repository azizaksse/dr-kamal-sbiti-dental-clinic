"use client";

import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent-primary text-white hover:bg-accent-primary-dark focus-visible:ring-accent-primary",
        outline: "bg-transparent ring-1 ring-accent-primary/30 text-accent-text hover:bg-accent-primary/10 hover:ring-accent-primary/50",
        ghost: "bg-transparent text-accent-text hover:bg-accent-primary/10",
        gold: "bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:from-accent-primary-dark hover:to-accent-secondary-dark hover:scale-105 focus-visible:ring-accent-primary shadow-lg hover:shadow-xl",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
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


