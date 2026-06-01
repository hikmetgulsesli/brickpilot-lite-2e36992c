import { type BrickPilotActions } from '../brickpilot-lite/brickpilot-lite.store';

export function actSavePreferences(actions: Pick<BrickPilotActions, 'savePreferences'>): void {
  actions.savePreferences();
}
