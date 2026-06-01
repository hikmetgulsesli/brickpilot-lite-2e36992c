import { type BrickPilotRuntimeBridge } from '../game/game-runtime';

declare global {
  interface Window {
    app?: BrickPilotRuntimeBridge;
  }

  var app: BrickPilotRuntimeBridge | undefined;
}

export function setBrickPilotTestBridge(bridge: BrickPilotRuntimeBridge): BrickPilotRuntimeBridge {
  globalThis.app = bridge;

  if (typeof window !== 'undefined') {
    window.app = bridge;
  }

  return bridge;
}
