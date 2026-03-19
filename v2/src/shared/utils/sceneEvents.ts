/**
 * Lightweight event emitter to bridge React state with the Babylon.js scene.
 */

export interface WinEventData {
  readonly lat: number;
  readonly lng: number;
  readonly amount: number;
  readonly gameName: string;
}

export interface RingEventData {
  readonly lat: number;
  readonly lng: number;
  readonly amount: number;
}

export interface CameraTargetData {
  readonly panelId: string;
}

type WinListener = (data: WinEventData) => void;
type RingListener = (data: RingEventData) => void;
type CameraTargetListener = (data: CameraTargetData) => void;
type BlackholeListener = (active: boolean) => void;

const winListeners: Set<WinListener> = new Set();
const ringListeners: Set<RingListener> = new Set();
const cameraListeners: Set<CameraTargetListener> = new Set();
const blackholeListeners: Set<BlackholeListener> = new Set();

export const sceneEvents = {
  emitWin(data: WinEventData): void { winListeners.forEach(fn => fn(data)); },
  onWin(fn: WinListener): () => void { winListeners.add(fn); return () => { winListeners.delete(fn); }; },

  emitRing(data: RingEventData): void { ringListeners.forEach(fn => fn(data)); },
  onRing(fn: RingListener): () => void { ringListeners.add(fn); return () => { ringListeners.delete(fn); }; },

  emitCameraTarget(data: CameraTargetData): void { cameraListeners.forEach(fn => fn(data)); },
  onCameraTarget(fn: CameraTargetListener): () => void { cameraListeners.add(fn); return () => { cameraListeners.delete(fn); }; },

  /** Blackhole effect — stars get sucked toward center, scene darkens */
  emitBlackhole(active: boolean): void { blackholeListeners.forEach(fn => fn(active)); },
  onBlackhole(fn: BlackholeListener): () => void { blackholeListeners.add(fn); return () => { blackholeListeners.delete(fn); }; },
} as const;
