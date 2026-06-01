import { useEffect } from 'react';
import { GameSettingsBrickpilotLite, GameplayBrickpilotLite } from './screens';
import { useBrickPilotStore } from './features/brickpilot-lite/brickpilot-lite.store';
import { brickPilotRepository } from './features/brickpilot-lite/brickpilot-lite.repo';
import { actReturnToGameplay } from './features/surf-game-settings/act_return_to_gameplay';
import { actSavePreferences } from './features/surf-game-settings/act_save_preferences';
import { actPauseGame } from './features/surf-gameplay/act_pause_game';
import { actRestartGame } from './features/surf-gameplay/act_restart_game';
import { actStartGame } from './features/surf-gameplay/act_start_game';
import { setBrickPilotTestBridge } from './test/bridge';

export default function App() {
  const { state, actions } = useBrickPilotStore();

  useEffect(() => {
    globalThis.app = { state, actions };
    setBrickPilotTestBridge({ state, actions });
    brickPilotRepository.save(state);
  }, [actions, state]);

  useEffect(() => {
    function handleGameplayShortcut(event: KeyboardEvent) {
      if (state.view !== 'gameplay') return;

      if (event.code === 'Space') {
        event.preventDefault();
        if (state.status === 'running') {
          actPauseGame(actions);
        } else {
          actStartGame(actions);
        }
      }

      if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        actRestartGame(actions);
      }
    }

    window.addEventListener('keydown', handleGameplayShortcut);
    return () => window.removeEventListener('keydown', handleGameplayShortcut);
  }, [actions, state.status, state.view]);

  const gameplayActions = {
    'resume-session-1': () => actStartGame(actions),
    'restart-2': () => actRestartGame(actions),
  };

  const settingsActions = {
    'settings-1': actions.openSettings,
    'help-2': actions.openSettings,
    'exit-to-menu-3': () => actReturnToGameplay(actions),
    'easy-4': () => actions.setDifficulty('easy'),
    'med-5': () => actions.setDifficulty('medium'),
    'hard-6': () => actions.setDifficulty('hard'),
    'button-7-7': actions.toggleGhostPiece,
    'button-8-8': actions.toggleAudio,
    'purge-high-score-9': actions.purgeHighScore,
    'return-to-gameplay-10': () => actReturnToGameplay(actions),
    'save-preferences-11': () => actSavePreferences(actions),
    'dashboard-1': () => actReturnToGameplay(actions),
    'controls-2': actions.openSettings,
    'audio-3': actions.toggleAudio,
    'support-4': actions.openSettings,
  };

  return (
    <div data-setfarm-root="brickpilot-lite" data-view={state.view} className="min-h-screen bg-background text-on-surface">
      {state.view === 'settings' ? (
        <GameSettingsBrickpilotLite actions={settingsActions} />
      ) : (
        <GameplayBrickpilotLite actions={gameplayActions} runtime={state} />
      )}
    </div>
  );
}
