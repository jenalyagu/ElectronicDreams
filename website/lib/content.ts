/**
 * ============================================================
 * PAGE CONTENT — EDIT ME
 * All homepage copy lives here: paths, issue cards, services,
 * support plans, FAQ. Edit text freely; components render it.
 *
 * Icon names come from lucide-react (https://lucide.dev/icons).
 * To change an icon, import it in the component that renders
 * this content and add it to the icon map there.
 * ============================================================
 */

/* ---------- Google reviews (social proof) ----------
   IMPORTANT: real reviews only — copy them verbatim from the Google
   Business profile. The section renders nothing while this is empty.
   `stars` is per-review (1–5); GOOGLE_RATING is the profile aggregate. */
export const GOOGLE_RATING: { stars: number; count: number; url: string } | null =
  null; /* TODO: e.g. { stars: 4.9, count: 87, url: "https://g.page/..." } */

export const REVIEWS: {
  /** Reviewer's name as shown on Google (first name + last initial is fine) */
  name: string;
  stars: number;
  text: string;
  /** Optional context shown under the name, e.g. "Memorial · Theater rescue" */
  detail?: string;
}[] = [
  /* Verbatim from the Google Business profile (July 2026) */
  {
    name: "Edward Schafman",
    stars: 5,
    text: "The owner, Rick, was very helpful in planning and selecting the right equipment to perfectly match our Audio/Video vision. Electronic Dreams has the cutting edge technology needed in this fast paced world. His team was very helpful and took charge when the Xfinity contractor didn't want to do his job. I am very impressed with their professionalism and punctuality. They have done two locations for me and I definitely would recommend them.",
  },
  {
    name: "Travis Burnett",
    stars: 5,
    text: "Awesome customer service! They do it all. They can help you set up your home entertainment system and figure out what TV or streaming service is best for you! 1 stop shop!",
  },
  {
    name: "Brandon Patin",
    stars: 5,
    text: "The team is a great bunch of people that professionally know what they are doing. I personally recommend this company to anyone or business. They stand by their guarantee of making sure the products work and customer satisfaction!",
  },
  {
    name: "Casey Minshew",
    stars: 5,
    text: "We are so happy with our entertainment system. It’s beautiful and the team that installed were amazing.",
  },
  {
    name: "Wendy Jenson",
    stars: 5,
    text: "Great company, does a high quality job!",
  },
  {
    name: "Eric Lynch",
    stars: 5,
    text: "What a fantastic experience from a knowledgeable group!!",
  },
];

/* ---------- Choose Your Path (top-of-page splitter) ---------- */
export type PathIntent = "new-project" | "fix-system" | "walkthrough";

export const PATHS: {
  intent: PathIntent;
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}[] = [
  {
    intent: "new-project",
    icon: "Sparkles",
    title: "I want a new smart home or theater",
    description:
      "Design a whole-home system from scratch — automation, cinema, audio, lighting, and a network that holds it all together.",
    cta: "Design my smart home",
    href: "#new-project",
  },
  {
    intent: "fix-system",
    icon: "Wrench",
    title: "I need help fixing an existing system",
    description:
      "Something stopped working — Control4, theater, cameras, Wi-Fi, audio. Start with the Rescue Desk and we'll route you to the fastest fix.",
    cta: "Fix my system",
    href: "/rescue-desk",
  },
  {
    intent: "walkthrough",
    icon: "KeyRound",
    title: "I bought a home with smart technology",
    description:
      "You inherited someone else's system. We'll walk the house, document what you have, hand you the controls, and simplify what you don't need.",
    cta: "Book a walkthrough",
    href: "#service-request",
  },
];

/* ---------- Smart Home Rescue Desk issue cards ---------- */
export type IssueCard = {
  /** Slug used to pre-fill the "problem category" in the form */
  slug: string;
  icon: string;
  title: string;
  symptom: string;
  /** One quick self-check the visitor can try before booking */
  quickCheck: string;
};

export const ISSUES: IssueCard[] = [
  {
    slug: "control4-down",
    icon: "MonitorSmartphone",
    title: "Control4 not working",
    symptom: "Touchscreens frozen, app won't connect, scenes unresponsive.",
    quickCheck:
      "Find your Control4 controller (small black box, usually in the AV closet). Unplug power for 30 seconds, plug back in, wait 3 minutes.",
  },
  {
    slug: "theater-no-sound",
    icon: "Volume2",
    title: "Home theater has no sound",
    symptom: "Picture is fine but speakers are silent, or audio cuts in and out.",
    quickCheck:
      "Check the receiver is on and set to the right input. Try one volume tap up from the remote that controls the receiver — not the TV.",
  },
  {
    slug: "wifi-dead-zones",
    icon: "WifiOff",
    title: "Wi-Fi dead zones",
    symptom: "Streaming buffers upstairs, video calls drop in the office.",
    quickCheck:
      "Reboot your router AND any access points, then retest in the dead zone after 5 minutes. If it's still slow, the layout needs a survey.",
  },
  {
    slug: "cameras-offline",
    icon: "Cctv",
    title: "Security cameras offline",
    symptom: "Camera feeds show black screens or 'disconnected' in the app.",
    quickCheck:
      "Check whether ALL cameras are down (recorder/network issue) or just one (camera or cable issue). That answer routes the repair.",
  },
  {
    slug: "audio-down",
    icon: "Speaker",
    title: "Whole-home audio not working",
    symptom: "Some rooms play, others don't, or sources won't switch.",
    quickCheck:
      "Power-cycle the audio matrix or amplifier in your equipment rack. Wait 2 minutes and try the quietest room first.",
  },
  {
    slug: "lighting-scenes",
    icon: "Lightbulb",
    title: "Smart lighting scenes broken",
    symptom: "Keypads do nothing, scenes trigger the wrong lights, schedules drift.",
    quickCheck:
      "Test the physical keypad AND the app. If the app works but keypads don't, it's a programming fix — usually remote, no truck needed.",
  },
  {
    slug: "too-many-remotes",
    icon: "Layers",
    title: "Too many apps and remotes",
    symptom: "Five remotes, six apps, and nobody in the house knows the order.",
    quickCheck:
      "Count your daily-use apps and remotes. More than two? That's a consolidation project, not a repair — and it's very fixable.",
  },
  {
    slug: "inherited-system",
    icon: "Home",
    title: "Bought a home with an existing system",
    symptom: "Racks of equipment, no passwords, no documentation, no idea.",
    quickCheck:
      "Gather anything the sellers left: remotes, manuals, binder, sticky notes with passwords. Then book a walkthrough — we'll map the rest.",
  },
];

/* ---------- Scene Builder (interactive project estimator) ----------
   TODO: tune ranges to real Houston project pricing before launch.
   Ranges are intentionally wide — the goal is honest ballparking that
   earns the consultation, not a quote. */
export const BUILDER_ROOMS: { id: string; icon: string; name: string }[] = [
  { id: "living", icon: "Sofa", name: "Living Room" },
  { id: "kitchen", icon: "UtensilsCrossed", name: "Kitchen" },
  { id: "suite", icon: "BedDouble", name: "Primary Suite" },
  { id: "office", icon: "Laptop", name: "Home Office" },
  { id: "media", icon: "Gamepad2", name: "Media / Game Room" },
  { id: "outdoor", icon: "Trees", name: "Patio & Outdoor" },
];

export type BuilderUpgrade = {
  id: string;
  icon: string;
  title: string;
  blurb: string;
  /** "room" prices multiply by rooms selected; "home" prices once */
  per: "room" | "home";
  range: [number, number];
};

export const BUILDER_UPGRADES: BuilderUpgrade[] = [
  {
    id: "lighting",
    icon: "Lightbulb",
    title: "Smart lighting & scenes",
    blurb: "Keypads, dimmers, and one-tap scenes like Morning or Movie Night.",
    per: "room",
    range: [800, 2500],
  },
  {
    id: "audio",
    icon: "Music4",
    title: "Room audio",
    blurb: "Architectural speakers you hear but never see, one app for all of it.",
    per: "room",
    range: [1000, 3000],
  },
  {
    id: "shades",
    icon: "Blinds",
    title: "Motorized shades",
    blurb: "Shades that follow the sun — and disappear for movie night.",
    per: "room",
    range: [1200, 3500],
  },
  {
    id: "climate",
    icon: "Thermometer",
    title: "Climate & comfort",
    blurb: "Smart thermostats and zones tied into your scenes and schedule.",
    per: "home",
    range: [1500, 4000],
  },
  {
    id: "cameras",
    icon: "Cctv",
    title: "Cameras & security",
    blurb: "4K cameras, video doorbell, smart locks — see what matters, anywhere.",
    per: "home",
    range: [3000, 9000],
  },
  {
    id: "network",
    icon: "Router",
    title: "Whole-home network",
    blurb: "Enterprise Wi-Fi and structured wiring — the foundation of everything.",
    per: "home",
    range: [2500, 6000],
  },
  {
    id: "theater",
    icon: "Clapperboard",
    title: "Dedicated theater",
    blurb: "Projection, surround sound, acoustics, seating — the full cinema.",
    per: "home",
    range: [15000, 75000],
  },
];

/** Control4 controller + programming — included in every plan. */
export const BUILDER_CORE = {
  title: "Control4 core system & programming",
  range: [3500, 8000] as [number, number],
};

/* ---------- Rescue Desk triage wizard ----------
   One clarifying question per issue; each answer maps to a verdict
   that sets expectations (remote fix / visit / project / walkthrough)
   BEFORE we ask for contact info. supportType matches SUPPORT_TYPES. */
export type TriageVerdictKind = "remote" | "visit" | "project" | "walkthrough";

export type TriageVerdict = {
  kind: TriageVerdictKind;
  headline: string;
  body: string;
  supportType: string;
};

export const TRIAGE: Record<
  string,
  { question: string; options: { label: string; verdict: TriageVerdict }[] }
> = {
  "control4-down": {
    question: "Open the Control4 app on your phone — what happens?",
    options: [
      {
        label: "App works, but touchscreens or keypads don't",
        verdict: {
          kind: "remote",
          headline: "Sounds like a programming or sync issue",
          body: "When the app responds but wall hardware doesn't, the system usually needs a remote re-sync or reprogram. Most of these never need a truck roll.",
          supportType: "remote",
        },
      },
      {
        label: "Nothing connects — app, screens, or remotes",
        verdict: {
          kind: "visit",
          headline: "Your controller or network is likely down",
          body: "If you've already power-cycled the controller (unplug 30 seconds, allow 3 minutes to boot), this usually needs hands on the rack. We'll come to you.",
          supportType: "visit",
        },
      },
      {
        label: "It works, then randomly drops",
        verdict: {
          kind: "remote",
          headline: "Intermittent drops usually point to the network",
          body: "That on-again-off-again pattern is almost always network, not Control4. We can run remote diagnostics first and only schedule a visit if the results say so.",
          supportType: "remote",
        },
      },
    ],
  },
  "theater-no-sound": {
    question: "Is the picture still fine?",
    options: [
      {
        label: "Yes — picture's perfect, just no sound",
        verdict: {
          kind: "remote",
          headline: "Audio routing is the usual suspect",
          body: "A receiver input or audio path that lost its place — often fixable remotely or with a ten-minute guided check before anyone drives.",
          supportType: "remote",
        },
      },
      {
        label: "No — picture and sound are both out",
        verdict: {
          kind: "visit",
          headline: "The rack needs eyes on it",
          body: "When the whole chain is dark, it's usually power, an HDMI handshake, or a failed component. One visit typically finds and fixes it.",
          supportType: "visit",
        },
      },
      {
        label: "Sound cuts in and out",
        verdict: {
          kind: "visit",
          headline: "Likely cabling or the receiver",
          body: "Intermittent audio is usually an HDMI/cable or receiver issue. A visit gets it diagnosed and fixed in one trip.",
          supportType: "visit",
        },
      },
    ],
  },
  "wifi-dead-zones": {
    question: "Where is the Wi-Fi bad?",
    options: [
      {
        label: "Just certain rooms or floors",
        verdict: {
          kind: "visit",
          headline: "That's a coverage problem — you need a survey",
          body: "Dead zones are a layout problem, not a provider problem. We'll survey the house and place access points where they actually belong.",
          supportType: "visit",
        },
      },
      {
        label: "Everywhere — the whole house is slow",
        verdict: {
          kind: "remote",
          headline: "Might be your ISP or router",
          body: "Whole-house slowness usually starts at the modem or router. We can check remotely before anyone drives anywhere.",
          supportType: "remote",
        },
      },
      {
        label: "Only when lots of devices are on",
        verdict: {
          kind: "project",
          headline: "Your network needs capacity, not luck",
          body: "A house full of streams, cameras, and smart devices outgrows consumer gear. An enterprise-grade network upgrade fixes this for good.",
          supportType: "consult",
        },
      },
    ],
  },
  "cameras-offline": {
    question: "Are all cameras down, or just some?",
    options: [
      {
        label: "All of them",
        verdict: {
          kind: "remote",
          headline: "Recorder or network — check remotely first",
          body: "When every feed drops at once it's the recorder or its network connection, not the cameras. That's often diagnosable remotely.",
          supportType: "remote",
        },
      },
      {
        label: "Just one or two",
        verdict: {
          kind: "visit",
          headline: "Camera or cable — that needs a visit",
          body: "A single dead feed is usually the camera itself or its cable run. We'll bring the right replacement the first time.",
          supportType: "visit",
        },
      },
    ],
  },
  "audio-down": {
    question: "Do any rooms still play music?",
    options: [
      {
        label: "Some rooms work, others don't",
        verdict: {
          kind: "remote",
          headline: "Zone or matrix issue — often remote-fixable",
          body: "Partial outages usually mean a zone or matrix setting lost its place. Many of these resolve remotely in one session.",
          supportType: "remote",
        },
      },
      {
        label: "No rooms work at all",
        verdict: {
          kind: "visit",
          headline: "Amp or rack power — book a visit",
          body: "A silent house points at the amplifier or rack power. If a power-cycle didn't wake it up, it needs hands on the equipment.",
          supportType: "visit",
        },
      },
    ],
  },
  "lighting-scenes": {
    question: "Quick test: does the app control the lights? Do the wall keypads?",
    options: [
      {
        label: "App works, keypads don't",
        verdict: {
          kind: "remote",
          headline: "Programming fix — usually no truck roll",
          body: "When the app works but keypads don't, it's programming, not hardware. These are typically fixed remotely.",
          supportType: "remote",
        },
      },
      {
        label: "Neither works",
        verdict: {
          kind: "visit",
          headline: "The lighting processor may be down",
          body: "When both paths fail, the lighting processor or its power is the likely culprit — that's a service visit.",
          supportType: "visit",
        },
      },
      {
        label: "Scenes fire wrong lights or wrong times",
        verdict: {
          kind: "remote",
          headline: "Schedule drift — a remote reprogram",
          body: "Time changes, outages, and firmware updates knock schedules out of sync. A remote session puts everything back where it belongs.",
          supportType: "remote",
        },
      },
    ],
  },
  "too-many-remotes": {
    question: "How many remotes or apps does movie night take?",
    options: [
      {
        label: "Two — and it mostly works",
        verdict: {
          kind: "project",
          headline: "You're one remote away from simple",
          body: "You're close. One universal control pass consolidates everything into a single remote or app the whole house can use.",
          supportType: "consult",
        },
      },
      {
        label: "Three or more — it's chaos",
        verdict: {
          kind: "project",
          headline: "That's a consolidation project — and very fixable",
          body: "This isn't a repair, it's a design fix: one controller, one interface, everything else disappears into the rack. It's our favorite transformation.",
          supportType: "consult",
        },
      },
    ],
  },
  "inherited-system": {
    question: "Do you have the passwords and documentation?",
    options: [
      {
        label: "Some or none — the sellers left a mystery",
        verdict: {
          kind: "walkthrough",
          headline: "Book a system walkthrough",
          body: "We'll inventory the equipment, recover the accounts, document everything, and hand you the controls. Then you decide what to keep or simplify.",
          supportType: "walkthrough",
        },
      },
      {
        label: "Yes, but I don't know what it all does",
        verdict: {
          kind: "walkthrough",
          headline: "A walkthrough turns keys into control",
          body: "You have the paperwork — now get the confidence. One walkthrough and you'll know what every box does and what's worth keeping.",
          supportType: "walkthrough",
        },
      },
    ],
  },
};

/* ---------- Services ----------
   `logos` are the brand marks from the old site's "Brands We Trust"
   page (public/brands/), grouped by that page's sections. They render
   as a white-mark row under each service's bullets in the scroll film. */
export const SERVICES: {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  logos?: { src: string; alt: string }[];
}[] = [
  {
    icon: "House",
    title: "Smart Home Automation",
    description:
      "One-touch control of lighting, climate, shades, fans, and security — designed around how your family actually lives.",
    bullets: [
      "Control4 design & programming (Gold Dealer)",
      "Smart lighting, scenes & schedules",
      "Climate, shades & comfort control",
    ],
    /* Old site section: Comfort & Convenience (4Sight product photo
       swapped for the proper Control4 wordmark) */
    logos: [
      { src: "/brands/white/control4.webp", alt: "Control4" },
      { src: "/brands/white/qmotion.webp", alt: "QMotion shades" },
      { src: "/brands/white/amazon-alexa.webp", alt: "Amazon Alexa" },
      { src: "/brands/white/amazon-echo.webp", alt: "Amazon Echo" },
    ],
  },
  {
    icon: "Clapperboard",
    title: "Home Theater & Media Rooms",
    description:
      "Dedicated theaters and living-room cinemas with calibrated picture and sound that disappears into the room.",
    bullets: ["4K/8K projection & displays", "Surround sound calibration", "Acoustic treatment & seating"],
    /* Old site section: Home Theater */
    logos: [
      { src: "/brands/white/control4.webp", alt: "Control4" },
      { src: "/brands/white/klipsch.webp", alt: "Klipsch" },
      { src: "/brands/white/paradigm.webp", alt: "Paradigm" },
      { src: "/brands/white/sonance.webp", alt: "Sonance" },
      { src: "/brands/white/origin-acoustics.webp", alt: "Origin Acoustics" },
      { src: "/brands/white/integra.webp", alt: "Integra" },
      /* episode.jpg on the old site is a speaker product photo, not a
         logo mark — Episode stays credited on /brands instead */
      { src: "/brands/white/lg.webp", alt: "LG" },
      { src: "/brands/white/samsung.webp", alt: "Samsung" },
    ],
  },
  {
    icon: "Music4",
    title: "Whole-Home Audio",
    description:
      "Music in every room from one app — architectural speakers you hear but never see.",
    bullets: ["Multi-room audio systems", "Outdoor & patio audio", "Streaming service integration"],
    /* Old site section: Entertainment */
    logos: [
      { src: "/brands/white/sonos.webp", alt: "Sonos" },
      { src: "/brands/white/sony.webp", alt: "Sony" },
      { src: "/brands/white/apple.webp", alt: "Apple" },
      { src: "/brands/white/roku.webp", alt: "Roku" },
      { src: "/brands/white/spotify.webp", alt: "Spotify" },
      { src: "/brands/white/tidal.webp", alt: "Tidal" },
      { src: "/brands/white/pandora.webp", alt: "Pandora" },
      { src: "/brands/white/amazon-music.webp", alt: "Amazon Music" },
      { src: "/brands/white/klh.webp", alt: "KLH" },
    ],
  },
  {
    icon: "ShieldCheck",
    title: "Security & Cameras",
    description:
      "Cameras, doorbells, and smart locks that show you what matters and alert you when it matters.",
    bullets: [
      "4K camera systems & NVRs",
      "Video doorbells & Intercom Anywhere",
      "Smart locks & access control",
    ],
    /* Old site section: Safety & Security */
    logos: [
      { src: "/brands/white/alarm-com.webp", alt: "Alarm.com" },
      { src: "/brands/white/security-partners.webp", alt: "Security Partners monitoring" },
      { src: "/brands/white/nest.webp", alt: "Nest" },
    ],
  },
  {
    icon: "Router",
    title: "Networking & Wi-Fi",
    description:
      "Enterprise-grade wired and wireless networks — the foundation every smart home stands on.",
    bullets: [
      "Whole-home Wi-Fi coverage (Pakedge)",
      "Structured wiring, fiber & racks",
      "Network security & VLANs",
    ],
    /* Old site section: Networking */
    logos: [
      { src: "/brands/white/araknis.webp", alt: "Araknis Networks" },
      { src: "/brands/white/ubiquiti.webp", alt: "Ubiquiti" },
      { src: "/brands/white/tejas-fiber.webp", alt: "Tejas Fiber" },
    ],
  },
  {
    icon: "LifeBuoy",
    title: "Control4 Support & Rescue",
    description:
      "Repairs, reprogramming, and upgrades for Control4 and other systems — even if someone else installed them.",
    bullets: ["Troubleshooting & repair", "System takeovers", "Upgrades & modernization"],
  },
];

/* ---------- Why customers call ---------- */
export const CALL_REASONS: { icon: string; title: string; text: string }[] = [
  {
    icon: "PhoneOff",
    title: "The installer vanished",
    text: "The company that installed the system doesn't answer anymore. We take over orphaned systems every week.",
  },
  {
    icon: "TimerReset",
    title: "It worked… until it didn't",
    text: "Systems drift out of sync after power outages, ISP swaps, and firmware updates. Most fixes are faster than you'd think.",
  },
  {
    icon: "Puzzle",
    title: "Too complicated to live with",
    text: "Technology should reduce steps, not add them. We simplify controls so everyone in the house can use them.",
  },
  {
    icon: "TrendingUp",
    title: "Ready for an upgrade",
    text: "A 2015-era system can feel new again with the right controller, remote, and streaming updates — without ripping out the walls.",
  },
];

/* ---------- How the support system reduces phone calls ---------- */
export const SUPPORT_FLOW: { step: string; title: string; text: string }[] = [
  {
    step: "01",
    title: "Identify the issue",
    text: "Pick your symptom at the Rescue Desk. Each card includes the same first checks our technicians run — many issues end right here.",
  },
  {
    step: "02",
    title: "Route to the right fix",
    text: "The guided form captures your system, symptom, and urgency, so your request lands with the right answer — not a game of phone tag.",
  },
  {
    step: "03",
    title: "Escalate only when needed",
    text: "Remote fix when possible, scheduled visit when necessary. You get a confirmed plan instead of waiting on a call back.",
  },
];

/* ---------- Support / service tiers ----------
   TODO: set real pricing before launch. */
export const PLANS: {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}[] = [
  {
    name: "One-Time Rescue",
    price: "$149",
    period: "per visit + parts",
    tagline: "For a single stubborn problem",
    features: [
      "Diagnostic service visit",
      "Same-week scheduling",
      "Works on systems we didn't install",
      "Written repair recommendation",
    ],
    cta: "Book a rescue visit",
  },
  {
    name: "Priority Care",
    price: "$49",
    period: "per month",
    tagline: "For homes that depend on their system",
    features: [
      "Remote support & monitoring",
      "Priority scheduling — front of the line",
      "Discounted service visits",
      "Proactive updates & health checks",
      "Direct support line (skip the queue)",
    ],
    cta: "Get priority care",
    featured: true,
  },
  {
    name: "Estate Care",
    price: "Custom",
    period: "quoted per property",
    tagline: "For large or multi-property systems",
    features: [
      "Everything in Priority Care",
      "Quarterly on-site health checks",
      "Dedicated technician",
      "Vendor & ISP coordination",
      "24/7 emergency response",
    ],
    cta: "Request a quote",
  },
];

/* ---------- FAQ ---------- */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you service systems you didn't install?",
    a: "Yes — this is one of the most common calls we get. We fix, simplify, and upgrade smart homes even if we didn't install the original system, including Control4, home theaters, camera systems, and whole-home audio installed by other companies.",
  },
  {
    q: "What parts of Houston do you serve?",
    a: "We serve the greater Houston area including The Heights, River Oaks, Memorial, Katy, Sugar Land, The Woodlands, Cypress, Pearland, and Bellaire. Outside that area? Ask — we take on select projects further out.",
  },
  {
    q: "Can you fix issues remotely?",
    a: "Often, yes. Many Control4, network, and programming issues can be resolved remotely, which is faster for you and cheaper than a truck roll. The guided form helps us determine whether your issue qualifies before anyone drives anywhere.",
  },
  {
    q: "I just bought a home with a smart system and I'm lost. Where do I start?",
    a: "Book a system walkthrough. We'll inventory the equipment, recover or reset the accounts and passwords, document everything, and teach you how to use it. Then you decide what to keep, simplify, or upgrade.",
  },
  {
    q: "How much does a new smart home or theater cost?",
    a: "Projects range widely — a media room refresh is very different from a whole-home Control4 build. Every project starts with a free consultation and a written proposal, so you'll know the number before any work begins.",
  },
  {
    q: "Do I have to replace my old system to get it working again?",
    a: "Usually not. Most 'dead' systems need reprogramming, a network fix, or one component replaced — not a rip-and-replace. We'll always give you the repair option before proposing an upgrade.",
  },
  {
    q: "How fast can you get here?",
    a: "Urgent issues are typically scheduled within 1–2 business days, and Priority Care members go to the front of the line. Submitting the guided form (instead of calling) gets you scheduled fastest because we arrive knowing your system and symptom.",
  },
];

/* ---------- Form option lists ---------- */
export const SYSTEM_TYPES = [
  "New build — no system yet",
  "Control4",
  "Crestron",
  "Savant",
  "Lutron lighting",
  "Home theater / AV",
  "Sonos / whole-home audio",
  "Security cameras / alarm",
  "Wi-Fi / networking",
  "Mixed / multiple systems",
  "Not sure",
];

export const PROBLEM_CATEGORIES = [
  { slug: "control4-down", label: "Control4 not working" },
  { slug: "theater-no-sound", label: "Home theater has no sound" },
  { slug: "wifi-dead-zones", label: "Wi-Fi dead zones" },
  { slug: "cameras-offline", label: "Security cameras offline" },
  { slug: "audio-down", label: "Whole-home audio not working" },
  { slug: "lighting-scenes", label: "Smart lighting scenes broken" },
  { slug: "too-many-remotes", label: "Too many apps / remotes" },
  { slug: "inherited-system", label: "Bought a home with an existing system" },
  { slug: "new-project", label: "New project / installation" },
  { slug: "other", label: "Something else" },
];

export const URGENCY_LEVELS = [
  { value: "emergency", label: "Urgent — nothing works" },
  { value: "soon", label: "This week if possible" },
  { value: "flexible", label: "Flexible — whenever works" },
  { value: "planning", label: "Just planning ahead" },
];

/* Shown instead of URGENCY_LEVELS when the request is a new project —
   "how urgent is it" reads wrong for someone with no system yet. */
export const TIMELINE_LEVELS = [
  { value: "ready-now", label: "Ready to start now" },
  { value: "this-month", label: "Within the next month" },
  { value: "this-year", label: "Later this year" },
  { value: "exploring", label: "Just exploring ideas" },
];

export const SUPPORT_TYPES = [
  { value: "remote", label: "Remote support (fastest)" },
  { value: "visit", label: "On-site service visit" },
  { value: "walkthrough", label: "New-homeowner walkthrough" },
  { value: "consult", label: "New project consultation" },
  { value: "unsure", label: "Not sure — recommend one" },
];
