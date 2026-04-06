"use client";

import React from "react";
import { IconType } from "react-icons";
import { FiBox, FiClock, FiMapPin, FiTruck, FiZap } from "react-icons/fi";
import { TbCurrencyPound } from "react-icons/tb";

export const SimpleGrid = () => (
  <div className="relative z-10 grid grid-cols-2 gap-9 px-3 md:grid-cols-3 md:gap-12 md:px-6">
    <Item
      Icon={FiTruck}
      title="Fill your return loads"
      subtitle="Identify profitable return trips to save fuel, reduce waste, and maximise your earnings."
    />
    <Item
      Icon={TbCurrencyPound}
      title="Fair, fast payment terms"
      subtitle="Paid on time, every time, we make sure subcontractors get treated right."
    />
    <Item
      Icon={FiClock}
      title="Save hours every week"
      subtitle="Our smart load-matching system finds the right partner fast, so you can focus on the road."
    />
    <Item
      Icon={FiBox}
      title="Trusted loads & vetted partners"
      subtitle="Work only with verified hauliers and reliable customers, trust built into every job."
    />
    <Item
      Icon={FiMapPin}
      title="Nationwide coverage"
      subtitle="From Inverness to Penzance, Owner Driver Exchange keeps the UK’s return load network moving efficiently."
    />
    <Item
      Icon={FiZap}
      title="Smart matching technology"
      subtitle="Our intelligent system connects return loads with available vehicles in real time, cutting fuel waste and maximising capacity."
    />
  </div>
);

const Item = ({
  Icon,
  title,
  subtitle,
}: {
  Icon: IconType;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="mb-1.5 flex items-start text-lg font-medium md:text-xl">
        <Icon className="mr-2 h-[26px] text-zinc-400" />
        {title}
      </h4>
      <p className="text-sm text-zinc-400 md:text-base">{subtitle}</p>
    </div>
  );
};
