/** @format */

"use client";

import { useEffect, useState } from "react";

/** Live clock in Jakarta (WIB, UTC+7). Renders a placeholder until mounted. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
      {time ?? "--:--:--"} WIB
    </span>
  );
}
