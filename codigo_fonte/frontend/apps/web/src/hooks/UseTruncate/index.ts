import { useState, useRef, useEffect } from "react";

export function useTruncate() {
  const [isTruncated, setIsTruncated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (ref.current) {
        const element = ref.current;
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return { ref, isTruncated };
}
