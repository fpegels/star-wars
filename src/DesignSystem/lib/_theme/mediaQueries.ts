import { useEffect, useState } from "react";

export const BREAKPOINTS = {
  MOBILE_MIN: 320,
  MOBILE_MAX: 1023,
  DESKTOP_MIN: 1024,
};

export const mediaQuery = {
  desktop: `@media (min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`,
};

export function useScreenSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const listener = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [size]);

  return {
    isMobile:
      size.width >= BREAKPOINTS.MOBILE_MIN &&
      size.width <= BREAKPOINTS.MOBILE_MAX,
    isDesktop: size.width >= BREAKPOINTS.DESKTOP_MIN,
    innerWidth: size.width,
    innerHeight: size.height,
  };
}
