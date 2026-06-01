import { type BrickPilotActions } from '../brickpilot-lite/brickpilot-lite.store';

export function actStartGame(actions: Pick<BrickPilotActions, 'start'>): void {
  actions.start();
}
