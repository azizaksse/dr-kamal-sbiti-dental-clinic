import type { ReactElement, ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function Section({ children, className }: Props): ReactElement {
  return <section className={`py-16 ${className ?? ""}`}>{children}</section>;
}


