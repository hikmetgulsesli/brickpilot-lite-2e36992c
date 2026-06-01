// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Gameplay - BrickPilot Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Heart, Play, RefreshCw } from "lucide-react";
import { type BrickPilotState } from "../features/brickpilot-lite/brickpilot-lite.store";


export type GameplayBrickpilotLiteActionId = "resume-session-1" | "restart-2";

export interface GameplayBrickpilotLiteProps {
  actions?: Partial<Record<GameplayBrickpilotLiteActionId, () => void>>;
  runtime?: Pick<BrickPilotState, "status" | "score" | "highScore" | "level" | "linesCleared">;
}

function formatScore(score: number): string {
  return score.toString().padStart(5, "0");
}

function statusLabel(status: BrickPilotState["status"]): string {
  if (status === "ready") return "System Ready";
  if (status === "running") return "Session Live";
  if (status === "game-over") return "Game Over";
  return "System Paused";
}

export function GameplayBrickpilotLite({ actions, runtime }: GameplayBrickpilotLiteProps) {
  const status = runtime?.status ?? "paused";
  const score = runtime?.score ?? 450;
  const level = runtime?.level ?? 1;
  const linesCleared = runtime?.linesCleared ?? 0;
  const highScore = runtime?.highScore ?? 0;
  const isRunning = status === "running";

  return (
    <>
      {/* Playfield Container */}
      <main className="relative w-full max-w-[1200px] aspect-video max-h-[921px] bg-surface-container-lowest border-2 border-primary/40 neon-border rounded flex flex-col m-playfield-margin overflow-hidden" data-game-status={status}>
      {/* HUD */}
      <header className="absolute top-0 left-0 w-full hud-blur bg-background/50 border-b border-primary/20 p-hud-padding flex justify-between items-center z-20">
      <div className="flex gap-gutter items-center">
      <div className="bg-surface-variant/80 border border-primary/30 rounded px-3 py-1 flex items-center gap-2">
      <span className="font-label-caps text-label-caps text-on-surface-variant">SCORE //</span>
      <span className="font-stats-md text-stats-md text-primary">{formatScore(score)}</span>
      </div>
      </div>
      <div className="flex gap-gutter items-center">
      <div className="bg-surface-variant/80 border border-primary/30 rounded px-3 py-1 flex items-center gap-2">
      <span className="font-label-caps text-label-caps text-on-surface-variant">LVL //</span>
      <span className="font-stats-md text-stats-md text-primary">{level.toString().padStart(2, "0")}</span>
      </div>
      </div>
      <div className="flex gap-gutter items-center">
      <div className="bg-surface-variant/80 border border-error/30 rounded px-3 py-1 flex items-center gap-2">
      <span className="font-label-caps text-label-caps text-on-surface-variant">LINES //</span>
      <div className="flex gap-1 text-error">
      <Heart  style={{fontVariationSettings: "'FILL' 1"}} className="text-[18px]" aria-hidden={true} focusable="false" />
      <span className="font-stats-md text-stats-md text-error">{linesCleared.toString().padStart(2, "0")}</span>
      </div>
      </div>
      </div>
      </header>
      {/* Game Canvas Area */}
      <div className="flex-1 relative mt-16 p-4">
      {/* Bricks */}
      <div className="grid grid-cols-10 gap-2 mb-12">
      {/* Row 1: Pink */}
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary opacity-0"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary opacity-0"></div>
      <div className="h-6 bg-secondary/80 rounded-[2px] brick-glow-pink border border-secondary"></div>
      {/* Row 2: Orange */}
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container opacity-0"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container opacity-0"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      <div className="h-6 bg-tertiary-container/80 rounded-[2px] brick-glow-orange border border-tertiary-container"></div>
      {/* Row 3: Blue */}
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container opacity-0"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container opacity-0"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      <div className="h-6 bg-primary-container/80 rounded-[2px] brick-glow-blue border border-primary-container"></div>
      </div>
      {/* Ball */}
      <div className="absolute w-4 h-4 bg-white rounded-full neon-glow-strong top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
      {/* Paddle */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-primary rounded-[2px] neon-glow-strong z-10 overflow-hidden">
      <div className="w-full h-[2px] bg-white absolute top-1/2 -translate-y-1/2 opacity-80"></div>
      </div>
      </div>
      {/* Pause Overlay (Active in this state) */}
      {!isRunning && (
      <div className="absolute inset-0 bg-surface-container-lowest/80 hud-blur flex items-center justify-center z-30">
      <div className="bg-surface-charcoal/90 border-t border-primary p-8 flex flex-col items-center rounded-lg shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
      {/* Background decorative lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <h2 className="font-display-arcade text-headline-lg text-primary mb-6 tracking-widest uppercase">{statusLabel(status)}</h2>
      <div className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase">Best // {formatScore(highScore)}</div>
      <div className="flex flex-col gap-4 w-full mb-8">
      <button className="w-full py-3 border border-primary text-primary font-label-caps text-label-caps uppercase hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,219,233,0.3)] transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2" type="button" data-action-id="resume-session-1" onClick={actions?.["resume-session-1"]}>
      <Play className="text-[18px]" aria-hidden={true} focusable="false" />
                              Resume Session
                          </button>
      <button className="w-full py-3 border border-outline text-outline font-label-caps text-label-caps uppercase hover:bg-outline/10 hover:text-on-surface transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2" type="button" data-action-id="restart-2" onClick={actions?.["restart-2"]}>
      <RefreshCw className="text-[18px]" aria-hidden={true} focusable="false" />
                              Restart
                          </button>
      </div>
      <div className="flex gap-6 text-on-surface-variant/60 font-body-md text-[12px]">
      <div className="flex items-center gap-2">
      <kbd className="px-2 py-1 bg-surface-variant rounded border border-outline-variant font-label-caps text-[10px]">SPACE</kbd>
      <span>to Resume</span>
      </div>
      <div className="flex items-center gap-2">
      <kbd className="px-2 py-1 bg-surface-variant rounded border border-outline-variant font-label-caps text-[10px]">R</kbd>
      <span>to Restart</span>
      </div>
      </div>
      </div>
      </div>
      )}
      </main>
    </>
  );
}
