import { Suspense, lazy, Component, type ReactNode, type ErrorInfo } from 'react';

// Lazy-load the heavy Babylon.js canvas so it never blocks the initial paint
const StarfieldBackground = lazy(() => import('./StarfieldBackground'));

// ─── WebGL error boundary ─────────────────────────────────────────────────────

interface WebGLErrorState {
  readonly failed: boolean;
}

/**
 * Catches WebGL context-loss and Babylon.js initialisation errors.
 * On failure we render a plain dark background — no broken canvas.
 */
class WebGLErrorBoundary extends Component<
  { readonly children: ReactNode },
  WebGLErrorState
> {
  constructor(props: { readonly children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): WebGLErrorState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.warn('[StarfieldCanvas] WebGL error — degrading gracefully:', error, info);
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            background: '#050508',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
      );
    }
    return this.props.children;
  }
}

// ─── Dark fallback while the Babylon.js bundle loads ─────────────────────────

function DarkFallback() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#050508',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function StarfieldCanvas() {
  return (
    <WebGLErrorBoundary>
      <Suspense fallback={<DarkFallback />}>
        <StarfieldBackground />
      </Suspense>
    </WebGLErrorBoundary>
  );
}
