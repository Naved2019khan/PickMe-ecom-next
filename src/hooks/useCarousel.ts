"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseCarouselOptions {
  total:        number;
  autoPlay?:    boolean;
  interval?:    number; // ms
}

export function useCarousel({
  total,
  autoPlay = true,
  interval = 4000,
}: UseCarouselOptions) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlay) {
      timerRef.current = setInterval(next, interval);
    }
  }, [autoPlay, interval, next]);

  useEffect(() => {
    reset();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reset]);

  return { current, next, prev, goTo };
}
