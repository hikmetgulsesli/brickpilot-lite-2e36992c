import { type BrickPilotActions } from '../brickpilot-lite/brickpilot-lite.store';

export function actRestartGame(actions: Pick<BrickPilotActions, 'restart'>): void {
  actions.restart();
}
