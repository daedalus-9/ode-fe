"use client";

import { CornerBlur } from "@/components/utils/CornerBlur";
import { PulseLine } from "@/components/utils/PulseLine";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiBell,
  FiMapPin,
  FiMessageCircle,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { CalloutChip } from "../../utils/CalloutChip";
import { Card } from "../../utils/Card";

export const Tower = () => {
  return (
    <div className="col-span-1 h-[600px] lg:col-span-4 lg:h-[600px]">
      <Card>
        <PulseLine />

        <CalloutChip>Human touch</CalloutChip>
        <p className="mb-2 text-2xl">Connections that drive earnings</p>
        <p className="mb-8 text-zinc-400">
          Behind every route is a real conversation. We help owner drivers and
          small fleets find consistent work while keeping relationships
          transparent, fair, and hassle-free.
        </p>

        <CornerBlur />
        <Mockup />
      </Card>
    </div>
  );
};

const Mockup = () => (
  <div className="absolute -bottom-4 left-6 h-[340px] w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950/50 sm:h-[370px]">
    <MockupTopBar />
    <div className="flex h-full w-full">
      <MockupSideBar />
      <MockupMain />
    </div>
  </div>
);

const MockupSideBar = () => (
  <div className="h-full w-24 border-r border-zinc-700 bg-zinc-900 p-2">
    <div className="mb-4 flex items-center justify-between">
      <FiUsers className="text-zinc-500" />
      <FiBell className="text-zinc-400" />
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-1 rounded bg-zinc-700 px-1 py-0.5 text-xs text-zinc-200">
        <FiTruck className="text-zinc-300" />
        Loads
      </div>
      <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-400">
        <FiMapPin className="text-zinc-400" />
        Routes
      </div>
      <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-400">
        <FiMessageCircle className="text-zinc-400" />
        Chat
      </div>
    </div>
  </div>
);

const MockupTopBar = () => (
  <div className="flex gap-1 border-b border-zinc-700 bg-zinc-950 p-2">
    <div className="h-2 w-2 rounded-full bg-red-600"></div>
    <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
    <div className="h-2 w-2 rounded-full bg-green-600"></div>
  </div>
);

const MockupMain = () => {
  const [matches, setMatches] = useState([
    {
      route: "Birmingham → Manchester",
      driver: "John Smith Logistics",
      time: "Matched 2 mins ago",
      color: "text-zinc-300",
    },
    {
      route: "Leeds → Bristol",
      driver: "John Smith Transport",
      time: "Matched 5 mins ago",
      color: "text-zinc-300",
    },
    {
      route: "London → Liverpool",
      driver: "John Smith Haulage",
      time: "Matched 8 mins ago",
      color: "text-zinc-300",
    },
    {
      route: "Cardiff → Sheffield",
      driver: "John Smith Freight",
      time: "Matched 12 mins ago",
      color: "text-zinc-300",
    },
  ]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setMatches((prev) => {
        const copy = [...prev];
        const first = copy.shift();
        if (first) copy.push(first);
        return copy;
      });
    }, 4000);

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative z-0 w-full p-4">
        <div className="w-full border-b border-zinc-700 pb-2 text-xs font-semibold uppercase text-zinc-500">
          <span>Recent Haulage Matches</span>
        </div>

        {matches.map((m) => (
          <motion.div
            layout
            key={m.route}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative flex flex-col gap-1 py-3 text-xs"
          >
            <div className="flex items-center gap-2">
              <FiTruck className={`${m.color} shrink-0`} />
              <span className="text-zinc-300">{m.route}</span>
            </div>
            <div className="ml-6 text-zinc-400">
              <p>{m.driver}</p>
              <p className="text-[10px] text-zinc-500">{m.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Soft fade at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 top-1/4 z-10 bg-gradient-to-b from-zinc-950/0 via-zinc-950/90 to-zinc-950" />
    </div>
  );
};
