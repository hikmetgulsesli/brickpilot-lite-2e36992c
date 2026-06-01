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

export interface BrickPilotBrick {
  id: number;
  x: number;
  y: number;
  strength: number;
}

export interface BrickPilotPaddle {
  x: number;
  width: number;
}

export interface BrickPilotBall {
  x: number;
  y: number;
  dx: number;
  dy: number;
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
  bricks: BrickPilotBrick[];
  paddle: BrickPilotPaddle;
  ball: BrickPilotBall;
  lives: number;
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
const BRICK_ROWS = 5;
const BRICK_POINTS = 25;
const STARTING_LIVES = 3;

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

export function createBricks(level = 1): BrickPilotBrick[] {
  const rows = Math.min(BRICK_ROWS + Math.floor((level - 1) / 2), 8);

  return Array.from({ length: rows * BOARD_WIDTH }, (_, index) => ({
    id: index + level * 100,
    x: index % BOARD_WIDTH,
    y: Math.floor(index / BOARD_WIDTH),
    strength: 1 + Math.floor((level - 1) / 3),
  }));
}

function createBoardFromBricks(bricks: BrickPilotBrick[]): BrickPilotCell[][] {
  const board = createEmptyBoard();

  for (const brick of bricks) {
    if (brick.y >= 0 && brick.y < BOARD_HEIGHT && brick.x >= 0 && brick.x < BOARD_WIDTH) {
      board[brick.y][brick.x] = brick.strength > 1 ? 'strong-brick' : 'brick';
    }
  }

  return board;
}

export function createInitialBrickPilotState(): BrickPilotState {
  const bricks = createBricks();

  return {
    view: 'gameplay',
    status: 'ready',
    board: createBoardFromBricks(bricks),
    activePiece: createPiece(0),
    nextPiece: createPiece(1),
    bricks,
    paddle: { x: Math.floor(BOARD_WIDTH / 2) - 1, width: 3 },
    ball: { x: Math.floor(BOARD_WIDTH / 2), y: BOARD_HEIGHT - 4, dx: 1, dy: -1 },
    lives: STARTING_LIVES,
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

function resetBall(): BrickPilotBall {
  return { x: Math.floor(BOARD_WIDTH / 2), y: BOARD_HEIGHT - 4, dx: 1, dy: -1 };
}

function resetRound(state: BrickPilotState): BrickPilotState {
  const nextState = {
    ...state,
    paddle: { ...state.paddle, x: Math.floor(BOARD_WIDTH / 2) - 1 },
    ball: resetBall(),
  };

  return { ...nextState, activePiece: pieceFromRuntime(nextState) };
}

function pieceFromRuntime(state: Pick<BrickPilotState, 'ball' | 'paddle' | 'tick'>): BrickPilotPiece {
  return {
    id: state.tick,
    type: 'O',
    x: Math.round(state.ball.x),
    y: Math.round(state.ball.y),
    rotation: state.paddle.x,
  };
}

function applyScore(state: BrickPilotState, score: number): Pick<BrickPilotState, 'score' | 'highScore'> {
  return {
    score,
    highScore: Math.max(state.highScore, score),
  };
}

function advanceBreakout(state: BrickPilotState): BrickPilotState {
  if (state.status !== 'running') {
    return { ...state, lastAction: 'tick' };
  }

  let ball: BrickPilotBall = {
    x: state.ball.x + state.ball.dx,
    y: state.ball.y + state.ball.dy,
    dx: state.ball.dx,
    dy: state.ball.dy,
  };

  if (ball.x <= 0 || ball.x >= BOARD_WIDTH - 1) {
    ball = { ...ball, x: clamp(ball.x, 0, BOARD_WIDTH - 1), dx: -ball.dx };
  }

  if (ball.y <= 0) {
    ball = { ...ball, y: 0, dy: Math.abs(ball.dy) };
  }

  const paddleY = BOARD_HEIGHT - 2;
  const paddleLeft = state.paddle.x;
  const paddleRight = state.paddle.x + state.paddle.width - 1;
  const ballColumn = Math.round(ball.x);

  if (ball.dy > 0 && Math.round(ball.y) >= paddleY && ballColumn >= paddleLeft && ballColumn <= paddleRight) {
    const offset = ballColumn - (paddleLeft + Math.floor(state.paddle.width / 2));
    ball = { ...ball, y: paddleY - 1, dx: clamp(offset, -1, 1) || ball.dx, dy: -Math.abs(ball.dy) };
  }

  if (ball.y >= BOARD_HEIGHT - 1) {
    const lives = state.lives - 1;
    const missedState: BrickPilotState = {
      ...state,
      lives,
      status: lives > 0 ? state.status : 'game-over',
      tick: state.tick + 1,
      lastAction: lives > 0 ? 'life-lost' : 'game-over',
    };

    return resetRound(missedState);
  }

  const hitIndex = state.bricks.findIndex((brick) => brick.x === ballColumn && brick.y === Math.round(ball.y));

  if (hitIndex >= 0) {
    const hitBrick = state.bricks[hitIndex];
    const damagedBrick = { ...hitBrick, strength: hitBrick.strength - 1 };
    const bricks =
      damagedBrick.strength > 0
        ? state.bricks.map((brick, index) => (index === hitIndex ? damagedBrick : brick))
        : state.bricks.filter((_, index) => index !== hitIndex);
    const score = state.score + BRICK_POINTS * state.level;
    const clearedBricks = state.linesCleared + (damagedBrick.strength > 0 ? 0 : 1);
    const levelComplete = bricks.length === 0;
    const level = levelComplete ? state.level + 1 : Math.max(state.level, Math.floor(clearedBricks / 20) + 1);
    const nextBricks = levelComplete ? createBricks(level) : bricks;
    const scoredState = {
      ...state,
      ...applyScore(state, score),
      bricks: nextBricks,
      board: createBoardFromBricks(nextBricks),
      ball: { ...ball, dy: -ball.dy },
      level,
      linesCleared: clearedBricks,
      tick: state.tick + 1,
      lastAction: levelComplete ? 'level-complete' : 'brick-hit',
    };

    return { ...scoredState, activePiece: pieceFromRuntime(scoredState) };
  }

  const nextState = { ...state, ball, tick: state.tick + 1, lastAction: 'tick' };

  return { ...nextState, activePiece: pieceFromRuntime(nextState) };
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
    case 'move-right': {
      const direction = action.type === 'move-left' ? -1 : 1;
      const nextState = {
        ...state,
        paddle: { ...state.paddle, x: clamp(state.paddle.x + direction, 0, BOARD_WIDTH - state.paddle.width) },
        lastAction: action.type,
      };

      return { ...nextState, activePiece: pieceFromRuntime(nextState) };
    }
    case 'rotate':
      return {
        ...state,
        activePiece: { ...state.activePiece, rotation: (state.activePiece.rotation + 1) % 4 },
        lastAction: action.type,
      };
    case 'soft-drop':
    case 'hard-drop': {
      if (state.status !== 'running') {
        return { ...state, lastAction: action.type };
      }

      const steps = action.type === 'hard-drop' ? 4 : 1;
      let nextState = state;

      for (let step = 0; step < steps; step += 1) {
        nextState = advanceBreakout(nextState);
        if (nextState.status === 'game-over') break;
      }

      return {
        ...nextState,
        lastAction: action.type,
      };
    }
    case 'tick':
      return advanceBreakout(state);
    default:
      return state;
  }
}
