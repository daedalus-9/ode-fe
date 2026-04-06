"use client";

import { Card } from "@/components/utils/Card";
import { CornerBlur } from "@/components/utils/CornerBlur";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { SectionSubheading } from "@/components/utils/SectionSubheading";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons";
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = { sm: 640, lg: 1024 };

const Carousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER = width
    ? width > BREAKPOINTS.lg
      ? 3
      : width > BREAKPOINTS.sm
        ? 2
        : 1
    : 1;

  const CAN_SHIFT_LEFT = offset < 0;
  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (features.length - CARD_BUFFER);

  const shiftLeft = () => CAN_SHIFT_LEFT && setOffset((pv) => pv + CARD_SIZE);
  const shiftRight = () => CAN_SHIFT_RIGHT && setOffset((pv) => pv - CARD_SIZE);

  return (
    <section
      className="relative overflow-hidden border-b border-zinc-700 bg-zinc-900/30 py-12"
      ref={ref}
    >
      <div className="relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Heading + carousel controls */}
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3 text-center md:text-left">
              <SectionHeading>Why Owner Driver Exchange</SectionHeading>
              <SectionSubheading>
                See the features that make our freight matching and delivery
                service fast, reliable, and secure.
              </SectionSubheading>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-2xl transition-opacity ${CAN_SHIFT_LEFT ? "" : "opacity-30"}`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
                aria-label="Shift carousel left"
              >
                &larr;
              </button>
              <button
                className={`rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-2xl transition-opacity ${CAN_SHIFT_RIGHT ? "" : "opacity-30"}`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
                aria-label="Shift carousel right"
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Carousel items */}
          <motion.div
            animate={{ x: offset }}
            transition={{ ease: "easeInOut" }}
            className="grid"
            style={{ gridTemplateColumns: `repeat(${features.length}, 1fr)` }}
          >
            {features.map((feature) => (
              <Feature key={feature.id} {...feature} />
            ))}
          </motion.div>
        </div>
      </div>

      <CornerBlur />
    </section>
  );
};

const Feature = ({ title, description, Icon }: FeatureType) => {
  return (
    <Card
      className="shrink-0"
      style={{ width: CARD_WIDTH, marginRight: MARGIN }}
    >
      <Icon className="size-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-3 text-amber-50" />
      <p className="mb-1.5 mt-3 text-lg font-medium">{title}</p>
      <p className="text-sm text-zinc-400">{description}</p>
    </Card>
  );
};

export default Carousel;

type FeatureType = {
  id: number;
  title: string;
  description: string;
  Icon: IconType;
};

const features: FeatureType[] = [
  {
    id: 1,
    Icon: FiMapPin,
    title: "Consistent, Recurring Return Loads",
    description:
      "Keep your vehicles earning with regular UK-wide return load opportunities.",
  },
  {
    id: 2,
    Icon: FiTruck,
    title: "Real-Time Availability Matching",
    description:
      "Instantly match vehicles with loads to reduce empty running and fuel waste.",
  },
  {
    id: 3,
    Icon: FiBell,
    title: "Instant Load Alerts",
    description:
      "Get notified the moment a new return load appears on routes you already run.",
  },
  {
    id: 4,
    Icon: FiCheckCircle,
    title: "Fair, Reliable Payment Terms",
    description:
      "Take on loads with clear, predictable payment terms so your cash flow stays steady.",
  },
  {
    id: 5,
    Icon: FiClock,
    title: "Live Status Updates",
    description:
      "Stay informed with real-time progress updates for every return load.",
  },
];
