"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Watches an inline CTA sentinel element and reports whether the
 * fixed bottom CTA should be shown (= inline CTA scrolled out of view).
 */
export function useInlineCtaSentinel() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFixed(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, showFixed };
}
