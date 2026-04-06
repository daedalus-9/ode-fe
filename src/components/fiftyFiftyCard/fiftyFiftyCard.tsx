"use client";

import { motion, MotionConfig } from "framer-motion";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { SplashButton } from "../buttons/SplashButton";
import { scrollToForm } from "../utils/scrollToForm";

export const FiftyFiftyCard = () => {
  return (
    <>
      <section className="mx-auto mb-12 mt-24 grid max-w-5xl grid-cols-12 border border-neutral-700 bg-neutral-900 text-neutral-50">
        <Left />
        <Right />
      </section>
      <SplashButton
        onClick={() => scrollToForm()}
        className="mx-auto mb-10 mt-6 flex items-center gap-2 bg-slate-500"
      >
        Get started
        <FiArrowRight />
      </SplashButton>
    </>
  );
};

const Left = () => (
  <div className="col-span-12 flex flex-col justify-between border-r border-neutral-700 md:col-span-6">
    <div className="px-6 py-20 md:px-12 md:py-24">
      <h1 className="text-4xl uppercase leading-tight md:text-5xl md:leading-tight">
        <span className="text-slate-300">How It Works </span>
        with Owner Driver Exchange
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-400">
        A simple 3-step process to keep your vehicles on the road and earning
        with ODX.
      </p>
    </div>
  </div>
);

const Right = () => {
  const [idx, setIdx] = useState(0);

  return (
    <div className="col-span-12 flex flex-col justify-between md:col-span-6">
      <div className="relative h-[276px] overflow-hidden md:h-[372px]">
        {CONTENT.map((c, itemIdx) => (
          <motion.div
            initial={false}
            animate={{
              opacity: idx === itemIdx ? 1 : 0,
              y: idx === itemIdx ? 0 : 24,
              filter: idx === itemIdx ? "blur(0px)" : "blur(2px)",
            }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            style={{ pointerEvents: idx === itemIdx ? "all" : "none" }}
            className="absolute inset-0 z-10 grid place-content-center space-y-3 px-6 text-base font-light leading-relaxed text-neutral-400 md:px-12 md:text-lg"
            key={itemIdx}
          >
            {c.content}
          </motion.div>
        ))}

        <span className="pointer-events-none absolute -right-0 bottom-0 z-0 text-7xl text-neutral-800">
          {idx + 1}/{CONTENT.length}
        </span>
      </div>

      <Buttons idx={idx} setIdx={setIdx} />
    </div>
  );
};

const Buttons = ({
  idx,
  setIdx,
}: {
  idx: number;
  setIdx: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="relative grid h-[57px] grid-cols-2 border-t border-neutral-700">
      <ShiftButton
        onClick={() => setIdx((pv) => (pv === 0 ? CONTENT.length - 1 : pv - 1))}
        topDivClasses="bg-neutral-900"
        bottomDivClasses="bg-neutral-950"
      >
        <FiArrowLeft className="mx-auto text-xl" />
      </ShiftButton>
      <ShiftButton
        topDivClasses="bg-neutral-900"
        btnClasses="border-neutral-700 border-l"
        bottomDivClasses="bg-neutral-950"
        onClick={() => setIdx((pv) => (pv === CONTENT.length - 1 ? 0 : pv + 1))}
      >
        <FiArrowRight className="mx-auto text-xl" />
      </ShiftButton>

      <motion.span
        key={idx}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 12, ease: "linear" }}
        onAnimationComplete={() =>
          setIdx((pv) => (pv === CONTENT.length - 1 ? 0 : pv + 1))
        }
        className="pointer-events-none absolute -top-[1px] bottom-0 z-20 bg-neutral-600/10"
      />
    </div>
  );
};

const ShiftButton = ({
  onClick,
  children,
  btnClasses,
  topDivClasses,
  bottomDivClasses,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  btnClasses?: string;
  topDivClasses?: string;
  bottomDivClasses?: string;
}) => {
  return (
    <MotionConfig transition={{ ease: "circOut", duration: 0.25 }}>
      <motion.button
        initial="initial"
        whileHover="hovered"
        className={twMerge(
          "relative overflow-hidden transition-colors",
          btnClasses
        )}
        onClick={onClick}
      >
        <motion.div
          variants={{ initial: { y: "0%" }, hovered: { y: "-100%" } }}
          className={twMerge(
            "grid h-full place-content-center bg-neutral-950",
            topDivClasses
          )}
        >
          {children}
        </motion.div>
        <motion.div
          variants={{ initial: { y: "100%" }, hovered: { y: "0%" } }}
          className={twMerge(
            "absolute inset-0 grid h-full place-content-center",
            bottomDivClasses
          )}
        >
          {children}
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
};

const CONTENT = [
  {
    content: (
      <>
        <p>
          <span className="text-white">Step 1: Apply to Become a Partner</span>
        </p>
        <p>
          Submit your business details, insurance documents, and company
          letterhead online. ODX gets you approved quickly and easily.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p>
          <span className="text-white">Step 2: Get Matched with Jobs</span>
        </p>
        <p>
          After approval, ODX connects you with full or part-load haulage jobs
          across the UK, tailored to your route and availability.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p>
          <span className="text-white">Step 3: Keep Your Fleet Earning</span>
        </p>
        <p>
          Fill your return legs with paying loads and maximise efficiency. Your
          vehicles stay on the road, and you stay profitable with Owner Driver
          Exchange.
        </p>
      </>
    ),
  },
];
