// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Settings - BrickPilot Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { AudioWaveform, CircleHelp, FastForward, Gamepad2, Gauge, Grid3X3, Keyboard, Music, Save, Settings, TriangleAlert, Volume2 } from "lucide-react";


export type GameSettingsBrickpilotLiteActionId = "settings-1" | "help-2" | "exit-to-menu-3" | "easy-4" | "med-5" | "hard-6" | "button-7-7" | "button-8-8" | "purge-high-score-9" | "return-to-gameplay-10" | "save-preferences-11" | "dashboard-1" | "controls-2" | "audio-3" | "support-4";

export interface GameSettingsBrickpilotLiteProps {
  actions?: Partial<Record<GameSettingsBrickpilotLiteActionId, () => void>>;
}

export function GameSettingsBrickpilotLite({ actions }: GameSettingsBrickpilotLiteProps) {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-background/80 backdrop-blur-xl fixed top-0 w-full border-b border-primary/30 shadow-[0_0_15px_rgba(0,219,233,0.3)] flex justify-between items-center px-hud-padding h-16 z-50">
      <div className="font-display-arcade text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter glow-text">
                  BRICKPILOT // LITE
              </div>
      <div className="flex gap-gutter">
      <button className="text-primary hover:bg-primary/10 transition-colors active:scale-95 duration-100 p-2 rounded" type="button" aria-label="Settings" data-action-id="settings-1" onClick={actions?.["settings-1"]}>
      <Settings  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      </button>
      <button className="text-outline hover:bg-primary/10 transition-colors active:scale-95 duration-100 p-2 rounded" type="button" aria-label="Help" data-action-id="help-2" onClick={actions?.["help-2"]}>
      <CircleHelp aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* SideNavBar (Hidden on Mobile, Visible on md+) */}
      <nav className="hidden md:flex bg-surface-container-lowest/95 backdrop-blur-md fixed left-0 top-0 h-full w-64 border-r border-primary/20 shadow-2xl shadow-primary/10 flex-col py-safe-area pt-20 z-40 transition-colors duration-200 ease-in-out">
      <div className="px-hud-padding mb-8 border-b border-primary/20 pb-4">
      <div className="font-display-arcade text-primary text-headline-lg-mobile glow-text">SYSTEM CONFIG</div>
      <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">V1.0.4-STABLE</div>
      </div>
      <ul className="flex-1 space-y-2">
      <li>
      <a className="flex items-center gap-3 px-hud-padding py-3 text-on-surface-variant hover:text-primary hover:bg-surface-variant/30 transition-colors duration-200" href="#" data-action-id="dashboard-1" onClick={(event) => { event.preventDefault(); actions?.["dashboard-1"]?.(); }}>
      <Grid3X3 aria-hidden={true} focusable="false" />
      <span className="font-label-caps text-label-caps">DASHBOARD</span>
      </a>
      </li>
      <li>
      <a className="flex items-center gap-3 px-hud-padding py-3 text-primary border-r-2 border-primary bg-primary/5 transition-colors duration-200 glow-text" href="#" data-action-id="controls-2" onClick={(event) => { event.preventDefault(); actions?.["controls-2"]?.(); }}>
      <Gamepad2  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="font-label-caps text-label-caps">CONTROLS</span>
      </a>
      </li>
      <li>
      <a className="flex items-center gap-3 px-hud-padding py-3 text-on-surface-variant hover:text-primary hover:bg-surface-variant/30 transition-colors duration-200" href="#" data-action-id="audio-3" onClick={(event) => { event.preventDefault(); actions?.["audio-3"]?.(); }}>
      <Volume2 aria-hidden={true} focusable="false" />
      <span className="font-label-caps text-label-caps">AUDIO</span>
      </a>
      </li>
      <li>
      <a className="flex items-center gap-3 px-hud-padding py-3 text-on-surface-variant hover:text-primary hover:bg-surface-variant/30 transition-colors duration-200" href="#" data-action-id="support-4" onClick={(event) => { event.preventDefault(); actions?.["support-4"]?.(); }}>
      <CircleHelp aria-hidden={true} focusable="false" />
      <span className="font-label-caps text-label-caps">SUPPORT</span>
      </a>
      </li>
      </ul>
      <div className="mt-auto px-hud-padding">
      <button className="w-full border border-primary text-primary font-label-caps text-label-caps py-3 hover:bg-primary/10 transition-colors uppercase neon-border" type="button" data-action-id="exit-to-menu-3" onClick={actions?.["exit-to-menu-3"]}>
                      EXIT TO MENU
                  </button>
      </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-1 mt-16 md:ml-64 p-playfield-margin md:p-safe-area flex items-center justify-center relative bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&amp;fit=crop&amp;q=80&amp;w=2070')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-background/90" data-alt="A dark, abstract digital landscape featuring glowing grid lines converging towards a vanishing point. The overall aesthetic is heavily influenced by 1980s synthwave and cyberpunk visuals. Deep blacks and charcoal greys dominate the background, overlaid with an intense, neon cyan and magenta glow. The scene evokes a sense of high-speed digital traversal through a retro-futuristic arcade environment.">
      <div className="crt-overlay absolute inset-0"></div>
      {/* Settings Modal / Overlay */}
      <div className="relative z-10 w-full max-w-2xl bg-surface-container/80 backdrop-blur-xl border-t border-primary p-6 md:p-8 neon-border shadow-[0_10px_30px_rgba(0,219,233,0.15)] rounded-DEFAULT">
      <div className="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
      <h1 className="font-display-arcade text-headline-lg-mobile md:text-headline-lg text-primary glow-text uppercase">Parameters</h1>
      <div className="font-stats-md text-stats-md text-primary-fixed bg-surface-variant/50 px-2 py-1 border border-primary/30">
                          SYS.OP // ACTIVE
                      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Gameplay & Audio */}
      <div className="space-y-6">
      {/* Difficulty */}
      <div className="space-y-2">
      <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
      <Gauge className="text-[16px]" aria-hidden={true} focusable="false" />
                                  DIFFICULTY_LEVEL
                              </label>
      <div className="flex bg-surface-variant/50 border border-outline-variant rounded p-1">
      <button className="flex-1 py-1 font-label-caps text-label-caps text-on-surface hover:text-primary hover:bg-surface-bright transition-colors" type="button" data-action-id="easy-4" onClick={actions?.["easy-4"]}>EASY</button>
      <button className="flex-1 py-1 font-label-caps text-label-caps text-background bg-primary neon-border shadow-none" type="button" data-action-id="med-5" onClick={actions?.["med-5"]}>MED</button>
      <button className="flex-1 py-1 font-label-caps text-label-caps text-on-surface hover:text-error hover:bg-surface-bright transition-colors" type="button" data-action-id="hard-6" onClick={actions?.["hard-6"]}>HARD</button>
      </div>
      </div>
      {/* Game Speed */}
      <div className="space-y-2">
      <label className="font-label-caps text-label-caps text-on-surface-variant flex justify-between">
      <span className="flex items-center gap-2"><FastForward className="text-[16px]" aria-hidden={true} focusable="false" /> VELOCITY_MULTIPLIER</span>
      <span className="text-primary font-stats-md">1.2x</span>
      </label>
      <input className="w-full" max="2.0" min="0.5" step="0.1" type="range" defaultValue="1.2" />
      </div>
      {/* Audio Toggles */}
      <div className="space-y-4 pt-2 border-t border-outline-variant/50">
      <div className="flex justify-between items-center">
      <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
      <Music className="text-[16px]" aria-hidden={true} focusable="false" />
                                      SYNTH_TRACKS
                                  </label>
      <button aria-pressed="true" className="w-12 h-6 bg-primary/20 border border-primary rounded-full relative transition-colors duration-300" type="button" aria-label="Button 7" data-action-id="button-7-7" onClick={actions?.["button-7-7"]}>
      <span className="absolute right-1 top-1 w-4 h-4 bg-primary shadow-[0_0_5px_theme('colors.primary')] rounded-full"></span>
      </button>
      </div>
      <div className="flex justify-between items-center">
      <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
      <AudioWaveform className="text-[16px]" aria-hidden={true} focusable="false" />
                                      SFX_FEEDBACK
                                  </label>
      <button aria-pressed="false" className="w-12 h-6 bg-surface-variant border border-outline rounded-full relative transition-colors duration-300" type="button" aria-label="Button 8" data-action-id="button-8-8" onClick={actions?.["button-8-8"]}>
      <span className="absolute left-1 top-1 w-4 h-4 bg-outline rounded-full"></span>
      </button>
      </div>
      </div>
      </div>
      {/* Right Column: Controls & Danger Zone */}
      <div className="space-y-6">
      {/* Input Help */}
      <div className="bg-surface-container-low border border-primary/30 p-4 rounded-DEFAULT">
      <h3 className="font-label-caps text-label-caps text-primary mb-4 flex items-center gap-2 glow-text">
      <Keyboard className="text-[16px]" aria-hidden={true} focusable="false" />
                                  INPUT_MAPPING
                              </h3>
      <ul className="space-y-3 font-body-md text-body-md text-on-surface">
      <li className="flex justify-between items-center">
      <span className="text-on-surface-variant">PADDLE_L/R</span>
      <div className="flex gap-1">
      <span className="px-2 py-1 bg-surface-variant border border-outline-variant rounded font-stats-md text-[12px]">←</span>
      <span className="px-2 py-1 bg-surface-variant border border-outline-variant rounded font-stats-md text-[12px]">→</span>
      </div>
      </li>
      <li className="flex justify-between items-center">
      <span className="text-on-surface-variant">PAUSE_EXEC</span>
      <span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded font-stats-md text-[12px] uppercase">Space</span>
      </li>
      <li className="flex justify-between items-center">
      <span className="text-on-surface-variant">SYS_CONFIG</span>
      <span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded font-stats-md text-[12px] uppercase">Esc</span>
      </li>
      </ul>
      </div>
      {/* Danger Zone */}
      <div className="pt-4 border-t border-error/30">
      <button className="w-full border border-error text-error font-label-caps text-label-caps py-2 hover:bg-error/10 transition-colors uppercase flex items-center justify-center gap-2" type="button" data-action-id="purge-high-score-9" onClick={actions?.["purge-high-score-9"]}>
      <TriangleAlert className="text-[16px]" aria-hidden={true} focusable="false" />
                                  PURGE_HIGH_SCORE
                              </button>
      </div>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col-reverse md:flex-row justify-end gap-4">
      <button className="px-6 py-3 font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface border border-transparent hover:border-outline-variant transition-colors uppercase" type="button" data-action-id="return-to-gameplay-10" onClick={actions?.["return-to-gameplay-10"]}>
                          RETURN TO GAMEPLAY
                      </button>
      <button className="px-6 py-3 font-label-caps text-label-caps text-background bg-primary hover:bg-primary-container neon-border transition-colors uppercase flex items-center justify-center gap-2" type="button" data-action-id="save-preferences-11" onClick={actions?.["save-preferences-11"]}>
      <Save className="text-[16px]" aria-hidden={true} focusable="false" />
                          SAVE PREFERENCES
                      </button>
      </div>
      </div>
      </main>
    </>
  );
}
