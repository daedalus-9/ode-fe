import { ODE_CONTACT, odeEmailHref } from "@/lib/contact";
import type { ReactNode } from "react";

type OdeContactLinkProps = {
  action: "call" | "email";
  children: ReactNode;
  className?: string;
  subject?: string;
  ariaLabel?: string;
};

export function OdeContactLink({ action, children, className, subject, ariaLabel }: OdeContactLinkProps) {
  const href = action === "call" ? ODE_CONTACT.phoneHref : odeEmailHref(subject);
  const defaultLabel = action === "call" ? "Call Owner Driver Exchange" : "Email Owner Driver Exchange";
  return <a href={href} aria-label={ariaLabel || defaultLabel} className={className}>{children}</a>;
}
