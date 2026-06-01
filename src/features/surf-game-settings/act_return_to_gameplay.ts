import { type BrickPilotActions } from '../brickpilot-lite/brickpilot-lite.store';

export function actReturnToGameplay(actions: Pick<BrickPilotActions, 'returnToGameplay'>): void {
  actions.returnToGameplay();
}
