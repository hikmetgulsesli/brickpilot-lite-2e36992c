import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { BOARD_HEIGHT, brickPilotReducer, createInitialBrickPilotState } from './game/game-runtime';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    globalThis.app = undefined;
  });

  it('renders an application root', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('hydrates the saved high score into the runtime bridge', async () => {
    window.localStorage.setItem('brickpilot-lite:snapshot', JSON.stringify({ highScore: 425 }));

    render(<App />);

    await waitFor(() => expect(globalThis.app?.state.highScore).toBe(425));
  });

  it('scores brick collisions and keeps high score in sync', () => {
    const initialState = brickPilotReducer(createInitialBrickPilotState(), { type: 'start' });
    const targetBrick = initialState.bricks[0];
    const collisionState = {
      ...initialState,
      ball: { x: targetBrick.x, y: targetBrick.y + 1, dx: 0, dy: -1 },
    };

    const nextState = brickPilotReducer(collisionState, { type: 'tick' });

    expect(nextState.bricks).toHaveLength(initialState.bricks.length - 1);
    expect(nextState.score).toBeGreaterThan(initialState.score);
    expect(nextState.highScore).toBe(nextState.score);
    expect(nextState.lastAction).toBe('brick-hit');
  });

  it('decrements lives and reaches game over when the final ball is missed', () => {
    const runningState = brickPilotReducer(createInitialBrickPilotState(), { type: 'start' });
    const finalLifeState = {
      ...runningState,
      lives: 1,
      ball: { x: 0, y: BOARD_HEIGHT - 1, dx: 0, dy: 1 },
    };

    const nextState = brickPilotReducer(finalLifeState, { type: 'tick' });

    expect(nextState.lives).toBe(0);
    expect(nextState.status).toBe('game-over');
    expect(nextState.lastAction).toBe('game-over');
  });
});
