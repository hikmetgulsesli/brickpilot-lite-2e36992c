import { type BrickPilotRuntimeBridge, createInitialBrickPilotState } from '../game/game-runtime';

export function createBrickPilotFixture(): BrickPilotRuntimeBridge {
  const state = createInitialBrickPilotState();

  return {
    state,
    actions: {
      start: () => undefined,
      resume: () => undefined,
      pause: () => undefined,
      restart: () => undefined,
      openSettings: () => undefined,
      returnToGameplay: () => undefined,
      setDifficulty: () => undefined,
      toggleAudio: () => undefined,
      toggleGhostPiece: () => undefined,
      setSpeed: () => undefined,
      savePreferences: () => undefined,
      purgeHighScore: () => undefined,
      moveLeft: () => undefined,
      moveRight: () => undefined,
      rotate: () => undefined,
      softDrop: () => undefined,
      hardDrop: () => undefined,
      tick: () => undefined,
    },
  };
}
