import { useEffect, useState } from "react";

export type DeviceCaps = {
  isMobile: boolean;
  isTouch: boolean;
  reduceMotion: boolean;
  /** True when heavy desktop-only effects should run. */
  enableFx: boolean;
};

const DEFAULT: DeviceCaps = {
  isMobile: false,
  isTouch: false,
  reduceMotion: false,
  enableFx: true,
};

/** Read once, on mount — caps are stable per session. */
export function useDeviceCaps(): DeviceCaps {
  const [caps, setCaps] = useState<DeviceCaps>(DEFAULT);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768 || isTouch;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCaps({
      isMobile,
      isTouch,
      reduceMotion,
      enableFx: !isMobile && !reduceMotion,
    });
  }, []);
  return caps;
}
