import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import { BOARD_HEIGHT, brickPilotReducer, createInitialBrickPilotState } from './game/game-runtime';

const STORAGE_KEY = 'brickpilot-lite:snapshot';

afterEach(() => {
  window.localStorage.clear();
});

describe('App', () => {
  it('renders an application root', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('loads a persisted high score before saving the current snapshot', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ highScore: 9876 }));

    render(<App />);

    expect(screen.getByText('Best // 09876')).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')).toMatchObject({ highScore: 9876 });
  });

  it('scores brick collisions and advances the clear counter', () => {
    const state = {
      ...createInitialBrickPilotState(),
      status: 'running' as const,
      ball: { x: 0.5, y: 0.5, dx: 0, dy: 0 },
    };

    const nextState = brickPilotReducer(state, { type: 'tick' });

    expect(nextState.bricks[0].alive).toBe(false);
    expect(nextState.score).toBeGreaterThan(0);
    expect(nextState.linesCleared).toBe(1);
    expect(nextState.highScore).toBe(nextState.score);
  });

  it('spends the last life and enters game over when the ball escapes the paddle', () => {
    const state = {
      ...createInitialBrickPilotState(),
      status: 'running' as const,
      lives: 1,
      ball: { x: 0, y: BOARD_HEIGHT + 1, dx: 0, dy: 1 },
    };

    const nextState = brickPilotReducer(state, { type: 'tick' });

    expect(nextState.status).toBe('game-over');
    expect(nextState.lives).toBe(0);
    expect(nextState.lastAction).toBe('game-over');
  });
});
