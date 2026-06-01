import { useMemo, useReducer } from 'react';
import {
  type BrickPilotActions,
  type BrickPilotDifficulty,
  type BrickPilotRuntimeBridge,
  brickPilotReducer,
} from '../../game/game-runtime';
import { brickPilotRepository } from './brickpilot-lite.repo';

export type { BrickPilotActions, BrickPilotDifficulty, BrickPilotRuntimeBridge, BrickPilotState } from '../../game/game-runtime';

export function useBrickPilotStore(): BrickPilotRuntimeBridge {
  const [state, dispatch] = useReducer(brickPilotReducer, undefined, brickPilotRepository.load);

  const actions = useMemo<BrickPilotActions>(
    () => ({
      start: () => dispatch({ type: 'start' }),
      resume: () => dispatch({ type: 'resume' }),
      pause: () => dispatch({ type: 'pause' }),
      restart: () => dispatch({ type: 'restart' }),
      openSettings: () => dispatch({ type: 'open-settings' }),
      returnToGameplay: () => dispatch({ type: 'return-to-gameplay' }),
      setDifficulty: (difficulty: BrickPilotDifficulty) => dispatch({ type: 'set-difficulty', difficulty }),
      toggleAudio: () => dispatch({ type: 'toggle-audio' }),
      toggleGhostPiece: () => dispatch({ type: 'toggle-ghost-piece' }),
      setSpeed: (speed: number) => dispatch({ type: 'set-speed', speed }),
      savePreferences: () => dispatch({ type: 'save-preferences' }),
      purgeHighScore: () => dispatch({ type: 'purge-high-score' }),
      moveLeft: () => dispatch({ type: 'move-left' }),
      moveRight: () => dispatch({ type: 'move-right' }),
      rotate: () => dispatch({ type: 'rotate' }),
      softDrop: () => dispatch({ type: 'soft-drop' }),
      hardDrop: () => dispatch({ type: 'hard-drop' }),
      tick: () => dispatch({ type: 'tick' }),
    }),
    [],
  );

  return { state, actions };
}
