
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useLiveVisitorCount(room: string = 'home_page_visitors') {
  const [count, setCount] = useState(1); // At least the current visitor

  useEffect(() => {
    // Identify user with random ID (anonymous is fine)
    const userId = `anon_${Math.random().toString(36).substring(2, 12)}`;
    const channel = supabase.channel(room, {
      config: {
        presence: { key: userId }
      }
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        // Each key is a user
        setCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") return;
        await channel.track({ online_at: new Date().toISOString() });
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room]);

  return count;
}
