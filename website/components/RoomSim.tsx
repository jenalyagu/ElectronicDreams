import {
  Blinds,
  Clapperboard,
  Columns3,
  Film,
  Home,
  Lamp,
  Lightbulb,
  MonitorPlay,
  MoonStar,
  Music2,
  Palette,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";

/**
 * ROOM SIMULATOR DATA — the Smart Home Control panel in the hero reads
 * these rooms. Rooms with a `states` photo set (public/rooms/) crossfade
 * between real photographs of each control combination; rooms without
 * one fall back to a flythrough still with a CSS brightness change.
 *
 * `photoControls` lists the controls that change the photo, in key
 * order. A state key is those controls' values joined with "-", where
 * "on" = toggle active (for shades/curtains, active = closed).
 * e.g. kitchen "on-off" = lights on, shades open.
 *
 * (The old inline RoomView/viewport component lived here until the
 * panel moved to full-bleed backgrounds — see git history.)
 */

export type RoomId = "living" | "kitchen" | "theater" | "backyard";
export type ControlId =
  | "lights"
  | "shades"
  | "curtains"
  | "screen"
  | "music"
  | "pool"
  | "path";

export type RoomControls = Record<ControlId, boolean>;

export const DEFAULT_CONTROLS: RoomControls = {
  lights: true,
  shades: false,
  curtains: false,
  screen: false,
  music: false,
  pool: true,
  path: true,
};

export const CONTROL_META: Record<ControlId, { label: string; icon: LucideIcon }> = {
  lights: { label: "Lights", icon: Lightbulb },
  shades: { label: "Shades", icon: Blinds },
  curtains: { label: "Curtains", icon: Columns3 },
  screen: { label: "Screen", icon: MonitorPlay },
  music: { label: "Music", icon: Music2 },
  pool: { label: "Pool Light", icon: Waves },
  path: { label: "Outdoor Lights", icon: Lamp },
};

/** One-tap scene: overrides the state matrix with its own photo.
    Toggling any control exits the scene. */
export type RoomScene = {
  id: string;
  label: string;
  icon: LucideIcon;
  src: string;
  /** Control states the scene implies — applied to the toggles when it
      engages, so the chips never contradict the photo. */
  sets?: Partial<RoomControls>;
  /** Chip color: "glow" (amber scene styling), "signal" to match the
      standard control chips, "rgb" for a color-spectrum chip, or
      "purple" for a soft night-purple chip. Defaults to "glow". */
  accent?: "glow" | "signal" | "rgb" | "purple";
};

export const ROOM_SIMS: {
  id: RoomId;
  name: string;
  icon: LucideIcon;
  temp: number;
  frame: string;
  controls: ControlId[];
  /** Per-room chip label overrides (e.g. kitchen's Lights reads "Scenes") */
  controlLabels?: Partial<Record<ControlId, string>>;
  /** Turning a control ON forces these controls OFF (e.g. the theater
      screen opens the curtains; backyard house lights raise the shades) */
  excludes?: Partial<Record<ControlId, ControlId[]>>;
  /** Controls that drive the photo, in state-key order */
  photoControls?: ControlId[];
  /** Photo per control combination, keyed per `photoControls` */
  states?: Record<string, string>;
  scenes?: RoomScene[];
}[] = [
  {
    // Four one-tap lighting scenes — no manual toggles; each swaps the
    // full-bleed living-room photo. "Active" is the default warm scene.
    id: "living",
    name: "Living Room",
    icon: Home,
    temp: 72,
    frame: "/rooms/living-active.webp",
    controls: [],
    scenes: [
      {
        id: "active",
        label: "Active",
        icon: Lightbulb,
        src: "/rooms/living-active.webp",
        accent: "signal",
      },
      {
        id: "rgb",
        label: "RGB",
        icon: Palette,
        src: "/rooms/living-rgb.webp",
        accent: "rgb",
      },
      {
        id: "movie-night",
        label: "Movie Night",
        icon: Clapperboard,
        src: "/rooms/living-movie-night.webp",
      },
      {
        id: "goodnight",
        label: "Goodnight",
        icon: MoonStar,
        src: "/rooms/living-goodnight.webp",
        accent: "purple",
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: UtensilsCrossed,
    temp: 73,
    frame: "/sequence/hero-sm/frame-058.webp",
    controls: ["lights", "shades", "music"],
    controlLabels: { lights: "Scenes" },
    photoControls: ["lights", "shades"],
    states: {
      "on-off": "/rooms/kitchen-lights-on-shades-open.webp",
      "on-on": "/rooms/kitchen-lights-on-shades-closed.webp",
      "off-off": "/rooms/kitchen-lights-off-shades-open.webp",
      "off-on": "/rooms/kitchen-lights-off-shades-closed.webp",
    },
    /* "Electronic Dreams Kitchen 5" — everything eased down to a warm glow */
    scenes: [
      {
        id: "goodnight",
        label: "Goodnight",
        icon: MoonStar,
        src: "/rooms/kitchen-goodnight.webp",
        sets: { lights: false },
      },
    ],
  },
  {
    // Curtains closed hides the screen, so both screen states share the
    // curtains-closed photo for each lighting level.
    id: "theater",
    name: "Theater",
    icon: Film,
    temp: 68,
    frame: "/sequence/hero-sm/frame-085.webp",
    // Button order: Lights, Curtains, Screen. photoControls keeps its own
    // order — it defines the state-key layout below, don't reorder it.
    controls: ["lights", "curtains", "screen"],
    // The screen can't show through closed curtains — engaging it opens them
    excludes: { screen: ["curtains"] },
    photoControls: ["lights", "screen", "curtains"],
    states: {
      "on-off-off": "/rooms/theater-lights-on-blank.webp",
      "on-on-off": "/rooms/theater-lights-on-movie.webp",
      "off-off-off": "/rooms/theater-lights-off-blank.webp",
      "off-on-off": "/rooms/theater-lights-off-movie.webp",
      "on-off-on": "/rooms/theater-lights-on-curtains.webp",
      "on-on-on": "/rooms/theater-lights-on-curtains.webp",
      "off-off-on": "/rooms/theater-lights-off-curtains.webp",
      "off-on-on": "/rooms/theater-lights-off-curtains.webp",
    },
    /* "Electronic Dreams home theater 3" — pitch dark, movie rolling */
    scenes: [
      {
        id: "movie-night",
        label: "Movie Night",
        icon: Clapperboard,
        src: "/rooms/theater-movie-night.webp",
        sets: { lights: false, screen: false, curtains: false },
      },
    ],
  },
  {
    id: "backyard",
    name: "Backyard",
    icon: Waves,
    temp: 82,
    frame: "/sequence/hero-sm/frame-000.webp",
    controls: ["path", "shades"],
    controlLabels: { path: "House Lights" },
    // House lights are for enjoying the view — turning them on opens the shades
    excludes: { path: ["shades"] },
    photoControls: ["path", "shades"],
    states: {
      "on-off": "/rooms/backyard-lights-on-shades-open.webp",
      "on-on": "/rooms/backyard-lights-on-shades-closed.webp",
      "off-off": "/rooms/backyard-lights-off-shades-open.webp",
      "off-on": "/rooms/backyard-lights-off-shades-closed.webp",
    },
    /* "Electronic Dreams backyard 5" — full architectural house lighting */
    scenes: [
      {
        id: "house-lights",
        label: "House Lights",
        icon: Home,
        src: "/rooms/backyard-house-lights.webp",
        sets: { path: true },
        accent: "signal",
      },
    ],
  },
];
