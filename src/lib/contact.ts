export const ODE_CONTACT = Object.freeze({
  emailHref: "mailto:traffic@logic-freight.co.uk",
  phoneHref: "tel:+441633441457",
});

export function odeEmailHref(subject?: string) {
  return `${ODE_CONTACT.emailHref}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
