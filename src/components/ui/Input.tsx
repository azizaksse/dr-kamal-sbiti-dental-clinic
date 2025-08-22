import type { InputHTMLAttributes, ReactElement } from "react";
import { clsx } from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { className?: string };

export default function Input({ className, ...props }: InputProps): ReactElement {
  return (
    <input
      className={clsx(
        "block w-full rounded-lg border border-accent-border bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-accent-text placeholder:text-accent-text-light outline-none transition-all duration-300 focus:border-accent-primary focus:bg-white focus:shadow-lg focus:shadow-accent-primary/10 hover:border-accent-primary/40",
        className
      )}
      {...props}
    />
  );
}


