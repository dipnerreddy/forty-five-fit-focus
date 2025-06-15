
import React from "react";
import { User2 } from "lucide-react";

import { useLiveVisitorCount } from "@/hooks/useLiveVisitorCount";

/**
 * A floating live visitor counter shown at the bottom right of the landing page.
 * Shows a tooltip with the current count on hover/tap.
 */
const LiveVisitorCount: React.FC = () => {
  const count = useLiveVisitorCount();
  const label =
    count === 1
      ? "You're the only one on the page right now."
      : `${count} people are checking this out right now!`;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="group relative">
        {/* Circle button with visitor icon */}
        <button
          type="button"
          aria-label={`${count} live visitor${count === 1 ? "" : "s"}`}
          className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-lg border border-orange-200 hover:bg-orange-200 transition group"
        >
          <User2 className="w-6 h-6 text-orange-500" aria-hidden />
          {/* Small live dot indicator */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border border-white animate-pulse" />
        </button>
        {/* Tooltip: Show on hover (desktop) or always (mobile) */}
        <div className="pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 transition-opacity duration-200 absolute bottom-14 right-0 bg-orange-100 border border-orange-200 text-orange-900 rounded-lg shadow-lg px-4 py-2 text-xs whitespace-nowrap z-50
          group-active:opacity-100
        ">
          {label}
        </div>
      </div>
    </div>
  );
};

export default LiveVisitorCount;
