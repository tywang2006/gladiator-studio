import type { CSSProperties, ReactNode } from 'react';

interface SectionWrapperProps {
  readonly id: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/**
 * Layout wrapper for top-level page sections.
 *
 * Intentionally does NOT apply opacity/translate reveal animations here.
 * Each section's internal components already handle their own entrance
 * animations via Framer Motion `whileInView`. Adding a second opacity layer
 * at this level caused all sections to remain permanently invisible on initial
 * page load because the IntersectionObserver never fired for below-fold
 * sections before the user scrolled.
 */
export function SectionWrapper({ id, children, className = '', style }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 px-4 md:px-8 ${className}`}
      style={style}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
