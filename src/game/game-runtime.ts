export type BrickPilotCell = string | null;

export type BrickPilotDifficulty = 'easy' | 'medium' | 'hard';

export type BrickPilotView = 'gameplay' | 'settings';

export type BrickPilotStatus = 'ready' | 'running' | 'paused' | 'game-over';

export interface BrickPilotPiece {
  id: number;
  type: 'I' | 'O' | 'T' | 'L';
  x: number;
  y: number;
  rotation: number;
}

export interface BrickPilotPreferences {
  difficulty: BrickPilotDifficulty;
  audioEnabled: boolean;
  ghostPiece: boolean;
  speed: number;
}

export interface BrickPilotState {
  view: BrickPilotView;
  status: BrickPilotStatus;
  board: BrickPilotCell[][];
  activePiece: BrickPilotPiece;
  nextPiece: BrickPilotPiece;
  score: number;
  highScore: number;
  level: number;
  linesCleared: number;
  tick: number;
  preferences: BrickPilotPreferences;
  lastAction: string;
}

export type BrickPilotAction =
  | { type: 'start' }
  | { type: 'resume' }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'open-settings' }
  | { type: 'return-to-gameplay' }
  | { type: 'set-difficulty'; difficulty: BrickPilotDifficulty }
  | { type: 'toggle-audio' }
  | { type: 'toggle-ghost-piece' }
  | { type: 'set-speed'; speed: number }
  | { type: 'save-preferences' }
  | { type: 'purge-high-score' }
  | { type: 'move-left' }
  | { type: 'move-right' }
  | { type: 'rotate' }
  | { type: 'soft-drop' }
  | { type: 'hard-drop' }
  | { type: 'tick' };

export interface BrickPilotActions {
  start: () => void;
  resume: () => void;
  pause: () => void;
  restart: () => void;
  openSettings: () => void;
  returnToGameplay: () => void;
  setDifficulty: (difficulty: BrickPilotDifficulty) => void;
  toggleAudio: () => void;
  toggleGhostPiece: () => void;
  setSpeed: (speed: number) => void;
  savePreferences: () => void;
  purgeHighScore: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  tick: () => void;
}

export interface BrickPilotRuntimeBridge {
  state: BrickPilotState;
  actions: BrickPilotActions;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

const PIECES: BrickPilotPiece['type'][] = ['I', 'O', 'T', 'L'];

export function createEmptyBoard(): BrickPilotCell[][] {
  return Array.from({ length: BOARD_HEIGHT }, () => Array.from<BrickPilotCell>({ length: BOARD_WIDTH }).fill(null));
}

export function createPiece(id: number): BrickPilotPiece {
  return {
    id,
    type: PIECES[id % PIECES.length],
    x: Math.floor(BOARD_WIDTH / 2) - 1,
    y: 0,
    rotation: 0,
  };
}

export function createInitialBrickPilotState(): BrickPilotState {
  return {
    view: 'gameplay',
    status: 'ready',
    board: createEmptyBoard(),
    activePiece: createPiece(0),
    nextPiece: createPiece(1),
    score: 0,
    highScore: 0,
    level: 1,
    linesCleared: 0,
    tick: 0,
    preferences: {
      difficulty: 'medium',
      audioEnabled: true,
      ghostPiece: true,
      speed: 5,
    },
    lastAction: 'initialized',
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function scoreForDrop(difficulty: BrickPilotDifficulty): number {
  if (difficulty === 'hard') return 120;
  if (difficulty === 'easy') return 60;
  return 90;
}

function advancePiece(state: BrickPilotState): Pick<BrickPilotState, 'activePiece' | 'nextPiece'> {
  return {
    activePiece: { ...state.nextPiece, x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    nextPiece: createPiece(state.nextPiece.id + 1),
  };
}

export function brickPilotReducer(state: BrickPilotState, action: BrickPilotAction): BrickPilotState {
  switch (action.type) {
    case 'start':
    case 'resume':
      return { ...state, view: 'gameplay', status: 'running', lastAction: action.type };
    case 'pause':
      return { ...state, status: 'paused', lastAction: action.type };
    case 'restart':
      return {
        ...createInitialBrickPilotState(),
        highScore: state.highScore,
        preferences: state.preferences,
        status: 'running',
        lastAction: 'restart',
      };
    case 'open-settings':
      return { ...state, view: 'settings', status: state.status === 'running' ? 'paused' : state.status, lastAction: action.type };
    case 'return-to-gameplay':
      return { ...state, view: 'gameplay', lastAction: action.type };
    case 'set-difficulty':
      return {
        ...state,
        preferences: { ...state.preferences, difficulty: action.difficulty },
        lastAction: `difficulty:${action.difficulty}`,
      };
    case 'toggle-audio':
      return {
        ...state,
        preferences: { ...state.preferences, audioEnabled: !state.preferences.audioEnabled },
        lastAction: action.type,
      };
    case 'toggle-ghost-piece':
      return {
        ...state,
        preferences: { ...state.preferences, ghostPiece: !state.preferences.ghostPiece },
        lastAction: action.type,
      };
    case 'set-speed':
      return {
        ...state,
        preferences: { ...state.preferences, speed: clamp(Math.round(action.speed), 1, 10) },
        lastAction: `speed:${action.speed}`,
      };
    case 'save-preferences':
      return { ...state, view: 'gameplay', lastAction: action.type };
    case 'purge-high-score':
      return { ...state, highScore: 0, lastAction: action.type };
    case 'move-left':
      return {
        ...state,
        activePiece: { ...state.activePiece, x: clamp(state.activePiece.x - 1, 0, BOARD_WIDTH - 1) },
        lastAction: action.type,
      };
    case 'move-right':
      return {
        ...state,
        activePiece: { ...state.activePiece, x: clamp(state.activePiece.x + 1, 0, BOARD_WIDTH - 1) },
        lastAction: action.type,
      };
    case 'rotate':
      return {
        ...state,
        activePiece: { ...state.activePiece, rotation: (state.activePiece.rotation + 1) % 4 },
        lastAction: action.type,
      };
    case 'soft-drop':
      return {
        ...state,
        activePiece: { ...state.activePiece, y: clamp(state.activePiece.y + 1, 0, BOARD_HEIGHT - 1) },
        score: state.score + 1,
        highScore: Math.max(state.highScore, state.score + 1),
        lastAction: action.type,
      };
    case 'hard-drop': {
      const score = state.score + scoreForDrop(state.preferences.difficulty);
      return {
        ...state,
        ...advancePiece(state),
        score,
        highScore: Math.max(state.highScore, score),
        linesCleared: state.linesCleared + 1,
        level: Math.max(state.level, Math.floor((state.linesCleared + 1) / 5) + 1),
        lastAction: action.type,
      };
    }
    case 'tick':
      return {
        ...state,
        tick: state.tick + 1,
        activePiece: { ...state.activePiece, y: clamp(state.activePiece.y + 1, 0, BOARD_HEIGHT - 1) },
        lastAction: action.type,
      };
    default:
      return state;
  }
}
