import { BubbleButton } from "@/components/buttons/BubbleButton";
import { Card } from "@/components/utils/Card";
import { PulseLine } from "@/components/utils/PulseLine";
import React, { useState } from "react";
import { BsLightning } from "react-icons/bs";

export const CodeCard = () => {
  const [selected, setSelected] = useState<"load" | "driver">("load");
  const [matchFound, setMatchFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearching, setShowSearching] = useState(false);

  const handleInstantMatch = () => {
    if (selected === "load") {
      setLoading(true);
      setShowSearching(true); // show "Searching..." immediately
      setTimeout(() => {
        setSelected("driver");
        setMatchFound(true);
        setLoading(false);
        setShowSearching(false); // hide "Searching..." once match found
      }, 1500); // Simulate search delay
    }
  };

  return (
    <Card className="mx-auto max-w-3xl pt-3">
      <div className="-mx-9 mb-6 flex items-center justify-between border-b border-zinc-700 px-6 pb-3">
        <div className="flex items-center gap-3">
          <ToggleChip
            onClick={() => matchFound && setSelected("load")}
            selected={selected === "load"}
            disabled={!matchFound}
          >
            Load Request
          </ToggleChip>
          <ToggleChip
            onClick={() => matchFound && setSelected("driver")}
            selected={selected === "driver"}
            disabled={!matchFound}
          >
            Driver Match
          </ToggleChip>
        </div>
        <BubbleButton
          className="text-xs"
          onClick={handleInstantMatch}
          disabled={loading || matchFound}
        >
          <BsLightning />
          <span className="hidden sm:inline">
            {loading
              ? "Searching..."
              : matchFound
                ? "Match Found"
                : "Instant Match"}
          </span>
        </BubbleButton>
      </div>

      <div className="px-6 py-4">
        {selected === "load" ? (
          <LoadView showStatus={showSearching} />
        ) : (
          <DriverView />
        )}
      </div>

      <PulseLine />
    </Card>
  );
};

const ToggleChip = ({
  children,
  selected,
  onClick,
  disabled = false,
}: {
  children: string;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-1.5 py-0.5 text-sm font-medium transition-colors ${
        selected
          ? "bg-amber-600 text-zinc-50"
          : "bg-zinc-900 text-zinc-50 hover:bg-zinc-700 disabled:opacity-50"
      }`}
    >
      {children}
    </button>
  );
};

const LoadView = ({ showStatus }: { showStatus: boolean }) => (
  <div className="space-y-2">
    <p>
      <span className="font-semibold">Pickup:</span> Birmingham
    </p>
    <p>
      <span className="font-semibold">Dropoff:</span> Manchester
    </p>
    <p>
      <span className="font-semibold">Weight:</span> 12 tonnes
    </p>
    <p>
      <span className="font-semibold">Goods:</span> Palletised general cargo
    </p>
    {showStatus && (
      <p className="font-semibold text-amber-300">
        Status: Searching for available hauliers…
      </p>
    )}
  </div>
);

const DriverView = () => (
  <div className="space-y-2">
    <p>
      <span className="font-semibold">Driver:</span> Logic Freight Subcontractor
    </p>
    <p>
      <span className="font-semibold">Vehicle:</span> Artic Curtain Sider
    </p>
    <p>
      <span className="font-semibold">Distance to pickup:</span> 14 miles
    </p>
    <p>
      <span className="font-semibold">ETA:</span> 45 minutes
    </p>
    <p>
      <span className="font-semibold">Rate agreed:</span> £420
    </p>
    <p className="font-semibold text-green-400">
      Status: Confirmed and en route 🚚
    </p>
  </div>
);
