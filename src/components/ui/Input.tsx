import type { InputHTMLAttributes, ReactElement } from "react";
import { clsx } from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { className?: string };

export default function Input({ className, ...props }: InputProps): ReactElement {
  return (
    <input
      className={clsx(
        "block w-full rounded-lg border border-accent-gold/20 bg-background-tertiary/50 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-accent-gold focus:bg-background-tertiary focus:shadow-lg focus:shadow-accent-gold/10 hover:border-accent-gold/40",
        className
      )}
      {...props}
    />
  );
}


