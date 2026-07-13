/**
 * Scene data for the <SceneKeypad /> service-page demos. Plain data
 * (icon is a string key resolved inside the client component) so it can
 * be passed from the server ServicePage across the RSC boundary.
 */
export type SceneDemo = {
  id: string;
  label: string;
  sub: string;
  icon: string; // key into SceneKeypad's ICONS map
  src: string;
  caption: string;
};

/** Smart Lighting — reuses the living-room lighting photos. */
export const LIVING_LIGHTING_SCENES: SceneDemo[] = [
  {
    id: "warm",
    label: "Warm",
    sub: "Everyday",
    icon: "Sun",
    src: "/rooms/living-active.webp",
    caption: "One tap warms the whole room — cove lighting, lamps, and the fireplace glow.",
  },
  {
    id: "party",
    label: "Party",
    sub: "Entertain",
    icon: "Palette",
    src: "/rooms/living-rgb.webp",
    caption: "Color washes the coves and the landscape for a night with friends.",
  },
  {
    id: "movie",
    label: "Movie",
    sub: "Watch",
    icon: "Clapperboard",
    src: "/rooms/living-movie-night.webp",
    caption: "Lights dim, shades drop, the screen takes over — all from one button.",
  },
  {
    id: "goodnight",
    label: "Goodnight",
    sub: "Sleep",
    icon: "MoonStar",
    src: "/rooms/living-goodnight.webp",
    caption: "Everything eases off to a soft path glow on your way to bed.",
  },
];

/** Home Theater — lights, curtains, feature, and full movie-night mode. */
export const THEATER_SCENES: SceneDemo[] = [
  {
    id: "lights-up",
    label: "Lights Up",
    sub: "Room lit",
    icon: "Lightbulb",
    src: "/rooms/theater-lights-on-curtains.webp",
    caption: "House lights up, curtains drawn — the screen stays hidden until showtime.",
  },
  {
    id: "curtains",
    label: "Curtains",
    sub: "Reveal screen",
    icon: "Columns3",
    src: "/rooms/theater-lights-on-blank.webp",
    caption: "Motorized curtains part to unveil the screen — lights still up.",
  },
  {
    id: "movie",
    label: "Movie",
    sub: "Watch",
    icon: "Film",
    src: "/rooms/theater-lights-off-movie.webp",
    caption: "Lights fade down and the feature rolls — curtains stay open.",
  },
  {
    id: "movie-night",
    label: "Movie Night",
    sub: "Cinema",
    icon: "Clapperboard",
    src: "/rooms/theater-movie-night.webp",
    caption: "Pitch black, screen glowing — the full cinema, one button away.",
  },
];
