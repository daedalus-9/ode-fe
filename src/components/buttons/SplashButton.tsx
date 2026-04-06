import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string; // only needed if as="a"
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SplashButton = ({
  children,
  className,
  as = "button",
  href,
  ...rest
}: Props) => {
  const baseClasses = twMerge(
    "rounded-md bg-gradient-to-br from-amber-400 to-amber-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-amber-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-amber-500/70",
    className
  );

  if (as === "a") {
    return (
      <a className={baseClasses} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...rest}>
      {children}
    </button>
  );
};
