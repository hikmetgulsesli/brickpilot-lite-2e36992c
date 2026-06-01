export type BrickPilotDifficulty = 'easy' | 'medium' | 'hard';

export type BrickPilotView = 'gameplay' | 'settings';

export type BrickPilotStatus = 'ready' | 'running' | 'paused' | 'game-over';

export interface BrickPilotBall {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface BrickPilotPaddle {
  x: number;
  width: number;
}

export interface BrickPilotBrick {
  id: number;
  row: number;
  col: number;
  alive: boolean;
  points: number;
}

export interface BrickPilotPiece {
  id: number;
  type: 'ball';
  x: number;
  y: number;
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
  ball: BrickPilotBall;
  paddle: BrickPilotPaddle;
  bricks: BrickPilotBrick[];
  activePiece: BrickPilotPiece;
  score: number;
  highScore: number;
  level: number;
  linesCleared: number;
  lives: number;
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
export const BOARD_HEIGHT = 16;

const PADDLE_WIDTH = 2.25;
const STARTING_LIVES = 3;
const BRICK_ROWS = 4;
const BRICK_COLS = 10;

function createBall(level = 1): BrickPilotBall {
  const velocity = 0.65 + Math.min(level - 1, 4) * 0.08;
  return {
    x: BOARD_WIDTH / 2,
    y: BOARD_HEIGHT - 3,
    dx: velocity,
    dy: -velocity,
  };
}

function createPaddle(): BrickPilotPaddle {
  return {
    x: BOARD_WIDTH / 2 - PADDLE_WIDTH / 2,
    width: PADDLE_WIDTH,
  };
}

function createBrickWall(level = 1): BrickPilotBrick[] {
  return Array.from({ length: BRICK_ROWS * BRICK_COLS }, (_, index) => {
    const row = Math.floor(index / BRICK_COLS);
    return {
      id: index,
      row,
      col: index % BRICK_COLS,
      alive: true,
      points: (BRICK_ROWS - row) * 10 * level,
    };
  });
}

export function createPiece(id: number): BrickPilotPiece {
  return {
    id,
    type: 'ball',
    x: BOARD_WIDTH / 2,
    y: BOARD_HEIGHT - 3,
  };
}

export function createInitialBrickPilotState(): BrickPilotState {
  return {
    view: 'gameplay',
    status: 'ready',
    ball: createBall(),
    paddle: createPaddle(),
    bricks: createBrickWall(),
    activePiece: createPiece(0),
    score: 0,
    highScore: 0,
    level: 1,
    linesCleared: 0,
    lives: STARTING_LIVES,
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

function paddleStep(difficulty: BrickPilotDifficulty): number {
  if (difficulty === 'hard') return 0.8;
  if (difficulty === 'easy') return 1.35;
  return 1.05;
}

function resetBall(state: BrickPilotState): Pick<BrickPilotState, 'ball' | 'activePiece'> {
  const ball = createBall(state.level);
  return {
    ball,
    activePiece: { ...state.activePiece, x: ball.x, y: ball.y },
  };
}

function resetRound(state: BrickPilotState, nextLives: number): BrickPilotState {
  if (nextLives <= 0) {
    return {
      ...state,
      ...resetBall(state),
      lives: 0,
      status: 'game-over',
      highScore: Math.max(state.highScore, state.score),
      lastAction: 'game-over',
    };
  }

  return {
    ...state,
    ...resetBall(state),
    lives: nextLives,
    status: 'paused',
    lastAction: 'life-lost',
  };
}

function advanceLevel(state: BrickPilotState): BrickPilotState {
  const level = state.level + 1;
  return {
    ...state,
    level,
    bricks: createBrickWall(level),
    ...resetBall({ ...state, level }),
    status: 'paused',
    lastAction: 'level-complete',
  };
}

function progressBall(state: BrickPilotState): BrickPilotState {
  if (state.status !== 'running') return { ...state, tick: state.tick + 1, lastAction: 'tick' };

  let ball: BrickPilotBall = {
    ...state.ball,
    x: state.ball.x + state.ball.dx,
    y: state.ball.y + state.ball.dy,
  };

  if (ball.x <= 0 || ball.x >= BOARD_WIDTH) {
    ball = { ...ball, x: clamp(ball.x, 0, BOARD_WIDTH), dx: -ball.dx };
  }

  if (ball.y <= 0) {
    ball = { ...ball, y: 0, dy: Math.abs(ball.dy) };
  }

  const paddleTop = BOARD_HEIGHT - 1.5;
  const paddleEnd = state.paddle.x + state.paddle.width;
  const hitsPaddle = ball.dy > 0 && ball.y >= paddleTop && ball.x >= state.paddle.x && ball.x <= paddleEnd;
  if (hitsPaddle) {
    const impact = (ball.x - (state.paddle.x + state.paddle.width / 2)) / (state.paddle.width / 2);
    ball = { ...ball, y: paddleTop, dx: clamp(ball.dx + impact * 0.18, -1.1, 1.1), dy: -Math.abs(ball.dy) };
  }

  let score = state.score;
  let bricks = state.bricks;
  let linesCleared = state.linesCleared;
  const hitBrick = state.bricks.find(
    (brick) =>
      brick.alive &&
      ball.y >= brick.row &&
      ball.y < brick.row + 1 &&
      ball.x >= brick.col &&
      ball.x < brick.col + 1,
  );

  if (hitBrick) {
    bricks = state.bricks.map((brick) => (brick.id === hitBrick.id ? { ...brick, alive: false } : brick));
    score += hitBrick.points;
    linesCleared += 1;
    ball = { ...ball, dy: Math.abs(ball.dy) };
  }

  const nextState: BrickPilotState = {
    ...state,
    ball,
    activePiece: { ...state.activePiece, x: ball.x, y: ball.y },
    bricks,
    score,
    highScore: Math.max(state.highScore, score),
    linesCleared,
    tick: state.tick + 1,
    lastAction: 'tick',
  };

  if (ball.y > BOARD_HEIGHT) return resetRound(nextState, state.lives - 1);
  if (bricks.every((brick) => !brick.alive)) return advanceLevel(nextState);
  return nextState;
}

export function brickPilotReducer(state: BrickPilotState, action: BrickPilotAction): BrickPilotState {
  switch (action.type) {
    case 'start':
    case 'resume':
      return {
        ...state,
        view: 'gameplay',
        status: state.status === 'game-over' ? 'game-over' : 'running',
        lastAction: action.type,
      };
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
        paddle: { ...state.paddle, x: clamp(state.paddle.x - paddleStep(state.preferences.difficulty), 0, BOARD_WIDTH - state.paddle.width) },
        lastAction: action.type,
      };
    case 'move-right':
      return {
        ...state,
        paddle: { ...state.paddle, x: clamp(state.paddle.x + paddleStep(state.preferences.difficulty), 0, BOARD_WIDTH - state.paddle.width) },
        lastAction: action.type,
      };
    case 'rotate':
      return { ...state, lastAction: action.type };
    case 'soft-drop':
      return progressBall({ ...state, lastAction: action.type });
    case 'hard-drop':
      return progressBall(progressBall({ ...state, lastAction: action.type }));
    case 'tick':
      return progressBall(state);
    default:
      return state;
  }
}
