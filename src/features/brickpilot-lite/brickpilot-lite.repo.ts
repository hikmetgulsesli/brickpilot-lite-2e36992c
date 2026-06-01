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
      const initialState = createInitialBrickPilotState();

      if (!hasStorage()) return initialState;

      const rawSnapshot = window.localStorage.getItem(STORAGE_KEY);
      if (!rawSnapshot) return initialState;

      try {
        const snapshot = JSON.parse(rawSnapshot) as Partial<BrickPilotState>;
        const bricksAreCurrent =
          Array.isArray(snapshot.bricks) &&
          snapshot.bricks.every((brick) => typeof brick.row === 'number' && typeof brick.alive === 'boolean');

        return {
          ...initialState,
          ...snapshot,
          ball: { ...initialState.ball, ...snapshot.ball },
          paddle: { ...initialState.paddle, ...snapshot.paddle },
          activePiece: { ...initialState.activePiece, ...snapshot.activePiece },
          bricks: bricksAreCurrent ? snapshot.bricks ?? initialState.bricks : initialState.bricks,
          preferences: { ...initialState.preferences, ...snapshot.preferences },
        };
      } catch {
        return initialState;
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
