import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px 0px 120px 0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  // Default to visible so lazily-mounted sections that are already off-screen
  // never get permanently stuck at opacity-0. The scroll-reveal animation
  // (fade-in from below) is applied only to sections that mount while truly
  // below the fold; once the observer fires it is a no-op because isVisible
  // is already true.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already visible by default, nothing to observe.
    // Re-enable the animation only if the section is far enough below the fold
    // that it makes sense to animate it in.
    const rect = element.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight + 50;

    if (!belowFold) {
      // Already in or near the viewport — keep isVisible true, skip observer.
      return;
    }

    // Section is genuinely below the fold: reset to invisible and let the
    // IntersectionObserver trigger the reveal animation on scroll.
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible } as const;
}
