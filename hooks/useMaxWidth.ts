import { useEffect, useState } from "react";

export const useMaxWidth = (width: number) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < width);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    setMounted(true);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [width]);

  return { isMobile, mounted };
};
