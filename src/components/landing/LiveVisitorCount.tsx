
import React from "react";
import { User2 } from "lucide-react";
import { useLiveVisitorCount } from "@/hooks/useLiveVisitorCount";

const LiveVisitorCount: React.FC = () => {
  const count = useLiveVisitorCount();

  // Generate the right label
  const label =
    count === 1
      ? "You're the only one on the page right now."
      : `${count} people are checking this out right now!`;

  return (
    <div className="mx-auto mt-4 max-w-fit px-4 py-2 rounded-full bg-orange-100 flex items-center gap-2 shadow text-orange-800 text-sm font-medium border border-orange-200 animate-in fade-in slide-in-from-top-4">
      <User2 className="w-4 h-4 text-orange-500" aria-hidden />
      <span>{label}</span>
    </div>
  );
};

export default LiveVisitorCount;
