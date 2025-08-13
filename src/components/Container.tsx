import type { ReactElement, ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function Container({ children, className }: Props): ReactElement {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>{children}</div>;
}


