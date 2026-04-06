"use client";

import { AnimationProps, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiClock,
  FiCompass,
  FiGlobe,
  FiMap,
  FiPackage,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { CalloutChip } from "../../utils/CalloutChip";
import { Card } from "../../utils/Card";

export const LongCard = () => {
  return (
    <div className="col-span-2 h-fit sm:h-[209px]">
      <Card>
        <div className="relative z-20">
          <CalloutChip>Our experience</CalloutChip>
          <p className="mb-1.5 text-2xl">Decades in the driver’s seat</p>
          <p className="max-w-sm text-zinc-400">
            With over a century of combined experience in UK logistics, we know
            the roads, the routes, and the realities of moving freight right,
            every single time.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 top-0 z-10 w-48 bg-gradient-to-r from-zinc-950/0 to-zinc-950" />
        <SpinningFreightIcons />
      </Card>
    </div>
  );
};

const SpinningFreightIcons = () => {
  const { width } = useWindowSize();

  const [sizes, setSizes] = useState({
    radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
    iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
    ringPadding: RING_PADDING.lg,
    logoFontSize: LOGO_FONT_SIZE.lg,
  });

  useEffect(() => {
    if (!width) return;

    if (width < BREAKPOINTS.sm) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.sm,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.sm,
        ringPadding: RING_PADDING.sm,
        logoFontSize: LOGO_FONT_SIZE.sm,
      });
    } else if (width < BREAKPOINTS.md) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.md,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.md,
        ringPadding: RING_PADDING.md,
        logoFontSize: LOGO_FONT_SIZE.md,
      });
    } else {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
        ringPadding: RING_PADDING.lg,
        logoFontSize: LOGO_FONT_SIZE.lg,
      });
    }
  }, [width]);

  return (
    <div
      style={{
        width:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
        height:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
      }}
      className="absolute right-0 top-0 z-0 grid translate-x-1/3 place-content-center rounded-full bg-zinc-800/30 shadow-inner"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={TRANSITION}
        style={{
          width:
            sizes.radiusToCenterOfIcons -
            sizes.iconWrapperWidth -
            sizes.ringPadding,
          height:
            sizes.radiusToCenterOfIcons -
            sizes.iconWrapperWidth -
            sizes.ringPadding,
        }}
        className="relative grid place-items-center rounded-full"
      >
        {FREIGHT_ICONS.map((icon, idx) => {
          const degrees = (360 / FREIGHT_ICONS.length) * idx;
          return (
            <motion.div
              key={idx}
              style={{
                marginTop:
                  sizes.radiusToCenterOfIcons *
                  Math.sin(degreesToRadians(degrees)),
                marginLeft:
                  sizes.radiusToCenterOfIcons *
                  Math.cos(degreesToRadians(degrees)),
                width: sizes.iconWrapperWidth,
                height: sizes.iconWrapperWidth,
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={TRANSITION}
              className="absolute grid place-content-center rounded-full bg-zinc-700/60 text-zinc-50 shadow-md"
            >
              <icon.Icon style={{ fontSize: sizes.logoFontSize }} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const FREIGHT_ICONS = [
  { Icon: FiTruck },
  { Icon: FiPackage },
  { Icon: FiMap },
  { Icon: FiCompass },
  { Icon: FiClock },
  { Icon: FiUsers },
  { Icon: FiBarChart2 },
  { Icon: FiGlobe },
];

const degreesToRadians = (deg: number) => deg * (Math.PI / 180);

const RADIUS_TO_CENTER_OF_ICONS = { sm: 150, md: 225, lg: 325 };
const ICON_WRAPPER_WIDTH = { sm: 40, md: 65, lg: 80 };
const RING_PADDING = { sm: 8, md: 12, lg: 24 };
const LOGO_FONT_SIZE = { sm: 18, md: 24, lg: 36 };
const BREAKPOINTS = { sm: 480, md: 768 };
const TRANSITION: AnimationProps["transition"] = {
  repeat: Infinity,
  repeatType: "loop",
  duration: 60,
  ease: "linear",
};

const useWindowSize = () => {
  const [size, setSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handle = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handle);
    handle();
    return () => window.removeEventListener("resize", handle);
  }, []);
  return size;
};
