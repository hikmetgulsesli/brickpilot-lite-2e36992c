import { type BrickPilotState, createInitialBrickPilotState } from '../../game/game-runtime';

const STORAGE_KEY = 'brickpilot-lite:snapshot';

export interface BrickPilotRepository {
  load: () => BrickPilotState;
  save: (state: BrickPilotState) => void;
  clear: () => void;
}

function hasStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function createBrickPilotRepository(): BrickPilotRepository {
  return {
    load: () => {
      if (!hasStorage()) return createInitialBrickPilotState();

      const rawSnapshot = window.localStorage.getItem(STORAGE_KEY);
      if (!rawSnapshot) return createInitialBrickPilotState();

      try {
        return { ...createInitialBrickPilotState(), ...JSON.parse(rawSnapshot) } as BrickPilotState;
      } catch {
        return createInitialBrickPilotState();
      }
    },
    save: (state: BrickPilotState) => {
      if (hasStorage()) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    clear: () => {
      if (hasStorage()) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    },
  };
}

export const brickPilotRepository = createBrickPilotRepository();
