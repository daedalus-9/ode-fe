"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FiArrowRight, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import useMeasure from "react-use-measure";

// -------- NAV --------
const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white transition-all duration-300 ease-out lg:px-12 ${
        scrolled
          ? "bg-neutral-950 py-3 shadow-xl"
          : "bg-neutral-950/0 py-6 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <Link href="/">
          {/* <img
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={90}
          /> */}
          Owner Driver Exchange
        </Link>
        <div className=" gap-2 lg:flex">
          {/* <Links /> */}
          <CTAs />
        </div>
        {/* <MobileMenu /> */}
      </div>
    </nav>
  );
};

// -------- NAV LINKS --------
const Links = () => (
  <div className="flex items-center gap-6">
    {LINKS.map((l) => (
      <NavLink key={l.text} FlyoutContent={l.component}>
        {l.text}
      </NavLink>
    ))}
  </div>
);

const NavLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href?: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <a href={href} className="relative">
        {children}
        <span
          style={{ transform: showFlyout ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-slate-300 transition-transform duration-300 ease-out"
        />
      </a>

      <AnimatePresence>
        {showFlyout && FlyoutContent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 w-[400px] -translate-x-1/2 rounded-lg bg-white text-black shadow-xl"
          >
            <FlyoutContent setMenuOpen={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------- CTA BUTTONS --------
const CTAs = () => (
  <div className="ml-6 flex items-center gap-3">
    <a
      href="mailto:traffic@logic-freight.co.uk"
      className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black"
    >
      <FaMailBulk />
      <span>Email</span>
    </a>
    <a
      href="tel:01633441457"
      className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black"
    >
      <FaPhone />
      <span className="ml-2">Call</span>
    </a>
  </div>
);

// -------- FLYOUT CONTENTS --------
const SubcontractorsContent = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="grid grid-cols-3 gap-6 p-6">
    <div>
      <h3 className="mb-2 font-semibold">Scotland</h3>
      <Link
        href="/return-loads-scotland"
        onClick={() => setMenuOpen(false)}
        className="block text-sm hover:underline"
      >
        Return Loads Scotland
      </Link>
    </div>

    <div>
      <h3 className="mb-2 font-semibold">England</h3>
      <Link
        href="/return-loads-england"
        onClick={() => setMenuOpen(false)}
        className="block text-sm hover:underline"
      >
        Return Loads England
      </Link>
    </div>

    <div>
      <h3 className="mb-2 font-semibold">Wales</h3>
      <Link
        href="/return-loads-wales"
        onClick={() => setMenuOpen(false)}
        className="block text-sm hover:underline"
      >
        Return Loads Wales
      </Link>
    </div>

    {/* <div className="col-span-3 mt-4 text-center">
      <Link
        href="/subcontractors/join"
        onClick={() => setMenuOpen(false)}
        className="inline-block rounded-md bg-slate-500 px-6 py-2 text-lg font-semibold text-black hover:bg-slate-600"
      >
        Join as a Haulier
      </Link>
    </div> */}
  </div>
);

// -------- MOBILE MENU --------
const MobileMenuLink = ({
  children,
  href,
  FoldContent,
  setMenuOpen,
}: {
  children: React.ReactNode;
  href?: string;
  FoldContent?: React.ElementType;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-neutral-950">
      {FoldContent ? (
        <div
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
          onClick={() => setOpen((pv) => !pv)}
        >
          <span>{children}</span>
          <motion.div
            animate={{ rotate: open ? "180deg" : "0deg" }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown />
          </motion.div>
        </div>
      ) : (
        <a
          onClick={() => setMenuOpen(false)}
          href={href}
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
        >
          <span>{children}</span>
          <FiArrowRight />
        </a>
      )}

      {FoldContent && (
        <motion.div
          initial={false}
          animate={{
            height: open ? height : "0px",
            marginBottom: open ? "24px" : "0px",
          }}
          className="overflow-hidden"
        >
          <div ref={ref}>
            <FoldContent setMenuOpen={setMenuOpen} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <img
                src="/assets/images/logo.png"
                alt="logo"
                width={200}
                height={90}
              />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-neutral-950" />
              </button>
            </div>

            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  FoldContent={l.component}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>

            <div className="flex justify-end bg-neutral-950 p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------- LINK STRUCTURE --------
const LINKS = [
  {
    text: "Areas",
    component: SubcontractorsContent,
  },
];

export default FlyoutNav;
