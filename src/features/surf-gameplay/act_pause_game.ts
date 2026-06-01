import { type BrickPilotActions } from '../brickpilot-lite/brickpilot-lite.store';

export function actPauseGame(actions: Pick<BrickPilotActions, 'pause'>): void {
  actions.pause();
}
