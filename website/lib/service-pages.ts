/**
 * ============================================================
 * SERVICE PILLAR PAGES — EDIT ME
 * One entry per service page. Slugs intentionally match the
 * old electronicdreams.biz URLs so existing Google rankings
 * carry over with no redirects.
 *
 * Copy sourced from data/site-content-brief.md (July 2026 crawl)
 * and rewritten outcome-first for the premium rebuild.
 * Icon names come from lucide-react; the icon map lives in
 * components/ServicePage.tsx.
 * ============================================================
 */

export type ServicePage = {
  /** URL slug at site root, e.g. /home-theater */
  slug: string;
  /** Short label for nav menus and cross-links */
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** Hero paragraph under the H1 */
  intro: string;
  icon: string;
  features: { icon: string; title: string; text: string }[];
  /** "What a project includes" checklist */
  deliverables: string[];
  /** Brand names shown on the page (must exist in lib/brands.ts) */
  brands: string[];
  faqs: { q: string; a: string }[];
  /** Slugs of related service pages for cross-linking */
  related: string[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "whole-home-automation",
    navLabel: "Whole-Home Automation",
    metaTitle: "Whole-Home Automation & Control4 Installation in Houston",
    metaDescription:
      "Control4 Gold Dealer designing whole-home automation in Houston — lighting, audio, climate, security, and theater in one app. Free design consultation.",
    eyebrow: "Whole-Home Automation",
    h1: "One home. One app. Everything works together.",
    intro:
      "Lighting, music, climate, shades, cameras, and cinema — designed as one system instead of a drawer full of apps. As a Control4 Gold Dealer with the Pinnacle distinction, we design around how your family actually lives, then program it so anyone in the house can use it.",
    icon: "House",
    features: [
      {
        icon: "Blocks",
        title: "Start small, go big",
        text: "Begin with one room or one system and expand on your schedule. Control4 scales from a single media room to a full estate without starting over.",
      },
      {
        icon: "Smartphone",
        title: "Every way to control",
        text: "Touch screens, engraved keypads, handheld remotes, the app, or just your voice — the system meets every member of the household where they are.",
      },
      {
        icon: "Plug",
        title: "12,000+ devices, one interface",
        text: "Control4 orchestrates the brands you already trust — Sonos, Nest, Kwikset, Sony, Alexa — under a single roof, with no app-juggling.",
      },
      {
        icon: "PenTool",
        title: "Designed, not assembled",
        text: "Certified Control4 programmers and designers plan scenes, schedules, and interfaces around your routines — never a cookie-cutter install.",
      },
      {
        icon: "CalendarClock",
        title: "You're in control",
        text: "Adjust scenes and schedules yourself from the app. Your system adapts to your life without a service call for every tweak.",
      },
      {
        icon: "LifeBuoy",
        title: "Support long after the sale",
        text: "We're not here for a one-time install. Remote support, updates, and a team that answers the phone — for decades, not months.",
      },
    ],
    deliverables: [
      "In-home design consultation & written proposal",
      "Control4 core controller, programming & app setup",
      "Scene design (Good Morning, Movie Night, Away…)",
      "Integration of lighting, audio, climate, shades & security",
      "Family walkthrough & training on handover",
      "Remote support & system health checks after launch",
    ],
    brands: ["Control4", "Amazon Alexa", "Apple", "Sonos", "Nest", "Kwikset"],
    faqs: [
      {
        q: "Do I have to automate the whole house at once?",
        a: "No — most clients start with one or two systems (lighting and audio are common) and expand over time. Control4 is built to grow, so nothing you buy today gets thrown away later.",
      },
      {
        q: "What makes a Gold Dealer different?",
        a: "Control4 tiers its dealers by certification, project volume, and customer satisfaction. Gold status with the Pinnacle distinction means factory-certified programmers and a track record Control4 itself audits — not a handyman with a dealer login.",
      },
      {
        q: "What does whole-home automation cost?",
        a: "It scales with the home and the ambition — a single-room start costs a fraction of a full estate. Every project begins with a free in-home consultation and a written proposal, so you'll know the exact number before any work begins.",
      },
      {
        q: "Someone else installed my system. Can you take it over?",
        a: "Yes — rescuing orphaned systems is a specialty. We'll assess what you have, recover or rebuild the programming, and get it supported again, even if the original installer is long gone.",
      },
    ],
    related: ["smart-lighting", "multi-room-audio", "safety-security"],
  },
  {
    slug: "smart-lighting",
    navLabel: "Smart Lighting",
    metaTitle: "Smart Lighting Control & Installation in Houston",
    metaDescription:
      "Smart lighting design and installation in Houston — one-touch scenes, engraved keypads, schedules, and energy savings on Control4. Free estimates.",
    eyebrow: "Smart Lighting",
    h1: "Light that follows your life",
    intro:
      "One tap sets the whole house for dinner, movie night, or bedtime. Elegant engraved keypads replace banks of switches, schedules follow the sun, and the house lights your way home before you reach the driveway.",
    icon: "Lightbulb",
    features: [
      {
        icon: "Sparkles",
        title: "Scenes, not switches",
        text: "\"Entertain\" dims the dining room, warms the patio, and lowers the gallery lights — one button, every room right.",
      },
      {
        icon: "SquareStack",
        title: "Keypads that declutter walls",
        text: "A single engraved keypad replaces a six-gang bank of switches. Backlit, custom-labeled, and configurable 38 ways.",
      },
      {
        icon: "SunMoon",
        title: "Schedules that track the sun",
        text: "Lights ease on at dusk and off at sunrise — automatically adjusting through the seasons without you touching a thing.",
      },
      {
        icon: "Leaf",
        title: "Lower energy bills",
        text: "Dimming, occupancy logic, and schedules cut wasted wattage. Premium comfort that pays some of its own way.",
      },
      {
        icon: "ShieldCheck",
        title: "Looks-lived-in security",
        text: "Away from home, Mockupancy varies your lights (and shades and TVs) in natural patterns so the house never looks empty.",
      },
      {
        icon: "Mic",
        title: "Hands-free control",
        text: "\"Alexa, movie time.\" Voice control for single lights, whole floors, or full scenes — no phone required.",
      },
    ],
    deliverables: [
      "Lighting design walk-through, room by room",
      "Control4 dimmers, switches & smart outlets (no rewiring for outlets)",
      "Custom-engraved, backlit keypads",
      "Scene & schedule programming you can adjust yourself",
      "Voice control setup (Alexa)",
      "Vacation / Mockupancy security programming",
    ],
    brands: ["Control4", "Amazon Alexa"],
    faqs: [
      {
        q: "Do you have to rewire my house?",
        a: "Usually not. Control4 dimmers and keypads replace your existing switches in the same boxes, and smart outlets convert standard outlets with no special wiring. New construction gets centralized lighting options too — our founder is a Certified Control4 Centralized Lighting Technician.",
      },
      {
        q: "Can I change the scenes myself later?",
        a: "Yes. The Control4 app lets you tune scenes, schedules, and timers yourself. For bigger changes, we handle most reprogramming remotely — no truck roll needed.",
      },
      {
        q: "What happens to my lights if the internet goes out?",
        a: "They keep working. Control4 lighting runs locally in the house — keypads, dimmers, and schedules don't depend on the cloud. You only lose remote access from outside until the connection returns.",
      },
      {
        q: "Do smart dimmers work with my existing fixtures and LED bulbs?",
        a: "Almost always. Control4 dimmers replace your current switches and drive the fixtures you already own; we verify LED compatibility during the design walk-through so nothing flickers or hums after install.",
      },
    ],
    related: ["whole-home-automation", "comfort", "safety-security"],
  },
  {
    slug: "multi-room-audio",
    navLabel: "Whole-Home Audio",
    metaTitle: "Whole-Home & Multi-Room Audio Installation in Houston",
    metaDescription:
      "Multi-room audio installation in Houston — architectural speakers you hear but never see, hi-res streaming in every room, indoors and out. Free estimates.",
    eyebrow: "Whole-Home Audio",
    h1: "Music in every room. Speakers in none.",
    intro:
      "Flush-mounted architectural speakers disappear into ceilings and walls — even painted to match — while high-resolution audio fills the kitchen, the patio, and the primary suite. One app, every streaming service, any room or all of them.",
    icon: "Music4",
    features: [
      {
        icon: "EyeOff",
        title: "Heard, never seen",
        text: "In-ceiling and in-wall speakers from Sonance, Origin Acoustics, Klipsch, and Paradigm — flush, paintable, and invisible until the music starts.",
      },
      {
        icon: "AudioLines",
        title: "High-resolution everywhere",
        text: "Dedicated multi-zone amplifiers deliver music the way it was recorded — not the thin sound of a portable speaker on a countertop.",
      },
      {
        icon: "ListMusic",
        title: "All your services built in",
        text: "Spotify, Tidal, Pandora, Amazon Music, TuneIn and more — native on the system, so anyone can play anything without casting from a phone.",
      },
      {
        icon: "Rows3",
        title: "Zones that follow you",
        text: "Jazz in the study, cartoons in the game room, the same playlist flowing through the whole first floor for a party — each zone independent or grouped.",
      },
      {
        icon: "TreePalm",
        title: "Outdoor listening, done right",
        text: "Landscape and patio speakers engineered for Houston weather, tuned to fill the backyard without broadcasting to the neighbors.",
      },
      {
        icon: "Boxes",
        title: "Electronics out of sight",
        text: "Amplifiers and sources live in a tidy equipment rack — not stacked under the TV. The room stays a room.",
      },
    ],
    deliverables: [
      "Room-by-room listening design & speaker placement",
      "Architectural speakers (in-ceiling, in-wall, outdoor, subwoofers)",
      "Multi-zone amplification in a clean equipment rack",
      "Streaming service integration & app setup",
      "Touch screen, keypad, remote & voice control",
      "Calibration and family walkthrough",
    ],
    brands: ["Sonance", "Origin Acoustics", "Klipsch", "Paradigm", "Sonos", "Triad", "Episode", "Control4"],
    faqs: [
      {
        q: "Can you add audio to a finished house?",
        a: "Yes — retrofit is our specialty. Our team has decades of experience fishing wire through existing walls cleanly, and where wire truly can't go, premium wireless zones fill the gap.",
      },
      {
        q: "Is this different from buying a few Sonos speakers?",
        a: "Portable speakers are great — until you want sound in ten rooms, no clutter on the counters, and one system the whole family can run. Architectural audio is built into the home, sounds dramatically better, and adds value that moves with the house.",
      },
      {
        q: "Can everyone listen to something different at the same time?",
        a: "Yes — every zone is independent. Jazz in the study, a podcast in the kitchen, cartoons in the game room, all at once; then one tap groups the whole first floor for a party, in perfect sync.",
      },
      {
        q: "Will outdoor speakers survive Houston weather?",
        a: "The ones we install will. Landscape and patio speakers are engineered for heat, humidity, and rain, and we aim and tune them to fill your backyard without broadcasting to the neighbors.",
      },
    ],
    related: ["home-theater", "whole-home-automation", "networking"],
  },
  {
    slug: "home-theater",
    navLabel: "Home Theater",
    metaTitle: "Custom Home Theater Design & Installation in Houston",
    metaDescription:
      "Custom home theater design and installation in Houston — 4K projection, surround sound, acoustics, and one-remote control. 27+ years of craftsmanship.",
    eyebrow: "Custom Home Theater",
    h1: "Your best seat isn't at the cineplex anymore",
    intro:
      "Lights fade, the screen descends, and the room disappears into the movie. We design and build dedicated theaters and living-room cinemas with reference-grade picture, surround sound tuned to the room, and a single remote that runs it all.",
    icon: "Clapperboard",
    features: [
      {
        icon: "Projector",
        title: "Reference-grade picture",
        text: "4K projection and premium displays, sized and calibrated to your room — not just the biggest panel that fit in the truck.",
      },
      {
        icon: "Speaker",
        title: "Sound tuned to the room",
        text: "Klipsch, Paradigm, and Triad surround systems, calibrated seat by seat, with bass you feel in the second act.",
      },
      {
        icon: "Theater",
        title: "Designed like a room, not a rack",
        text: "Acoustic treatment, lighting design, riser seating, and finishes that make the theater feel inevitable — craftsmanship is the difference.",
      },
      {
        icon: "Wand2",
        title: "One-touch showtime",
        text: "Press \"Movie\": shades drop, lights dim, the projector warms, and sound comes up. One remote replaces the coffee-table pile.",
      },
      {
        icon: "MonitorPlay",
        title: "4K to every room",
        text: "Video distribution sends your sources to any display in the house — game in the media room, movie in the theater, ballgame on the patio.",
      },
      {
        icon: "Armchair",
        title: "Media rooms too",
        text: "No spare room to dedicate? We build stunning living-room cinemas that hide completely when the credits roll.",
      },
    ],
    deliverables: [
      "Theater design consultation & 3D room planning",
      "Projector / display selection & professional calibration",
      "Surround sound design, installation & tuning",
      "Acoustic treatment & lighting design",
      "Seating layout & riser planning",
      "Single-remote automation of the whole experience",
    ],
    brands: ["Sony", "Samsung", "LG", "Klipsch", "Paradigm", "Triad", "Integra", "Episode", "Roku", "Control4"],
    faqs: [
      {
        q: "What does a home theater cost?",
        a: "Living-room cinema upgrades often land in the five figures; dedicated theaters range from $15,000 to well beyond $75,000 depending on the room and ambition. Every project starts with a free consultation and a written proposal — you'll know the number before work begins.",
      },
      {
        q: "Can you upgrade the theater I already have?",
        a: "Absolutely — and often for far less than a rebuild. A new projector, receiver, or control system can make a 2015-era theater feel new without touching the walls. We service and upgrade theaters other companies installed, too.",
      },
      {
        q: "I don't have a spare room — dedicated theater or media room?",
        a: "A media room. We build living-room cinemas with serious picture and surround sound that disappear when the credits roll — hidden speakers, a display that fits the room, and lighting that resets itself. If you later finish out a dedicated space, everything carries forward.",
      },
      {
        q: "Will my family actually be able to run it?",
        a: "That's the design goal. One remote (or one button labeled \"Movie\") starts the projector, drops the shades, dims the lights, and sets the sound — no input-switching ritual. If grandma can't start a movie, we haven't finished the job.",
      },
    ],
    related: ["multi-room-audio", "comfort", "whole-home-automation"],
  },
  {
    slug: "comfort",
    navLabel: "Climate & Shades",
    metaTitle: "Smart Climate Control & Motorized Shades in Houston",
    metaDescription:
      "Smart thermostats, motorized shades, and comfort automation in Houston — schedules, voice control, pool & spa, and energy savings in one system.",
    eyebrow: "Comfort & Convenience",
    h1: "The battle of the thermostat, finally won",
    intro:
      "Rooms that are the right temperature before you walk in. Shades that track the Texas sun to keep the heat out and the view in. Pool, spa, and fireplace ready when you are — all on schedule, all in one app.",
    icon: "Thermometer",
    features: [
      {
        icon: "Thermometer",
        title: "Climate that thinks ahead",
        text: "Smart thermostats with presets and schedules — cool the bedroom before sleep, ease off while you're at work, never argue over the dial again.",
      },
      {
        icon: "Blinds",
        title: "Motorized shades",
        text: "Raise, lower, or tilt individually or in groups. Shades follow the sun automatically — blackout for movie night, glare-free for the home office.",
      },
      {
        icon: "Waves",
        title: "Pool & spa on demand",
        text: "Start heating the spa from the dinner table. Pool and spa control folds into the same app as everything else.",
      },
      {
        icon: "Flame",
        title: "Fireplace at a touch",
        text: "Light the fireplace from the couch — or make it part of your \"Evening\" scene along with the lights and music.",
      },
      {
        icon: "Ruler",
        title: "Sensors that disappear",
        text: "Flush-mount, paintable temperature sensors read each room accurately without a plastic box on your designer wall.",
      },
      {
        icon: "Leaf",
        title: "Comfort that saves energy",
        text: "Shades blocking afternoon sun and schedules trimming runtime mean a Houston summer that's easier on the AC — and the bill.",
      },
    ],
    deliverables: [
      "Comfort audit: climate zones, sun exposure & problem rooms",
      "Smart thermostat installation & scene integration",
      "Motorized shade measurement, fabric selection & installation",
      "Pool, spa & fireplace control integration",
      "Flush-mount room sensors",
      "Schedules and voice control (Alexa)",
    ],
    brands: ["Control4", "QMotion", "Nest", "Amazon Alexa"],
    faqs: [
      {
        q: "Do motorized shades work in existing windows?",
        a: "Yes. Battery and wired options fit existing frames, and we handle measurement, fabric selection, and installation. New construction lets us hide wiring completely, but retrofits look just as clean.",
      },
      {
        q: "Will this actually lower my energy bill?",
        a: "In Houston, yes — solar heat gain through windows is a major AC load. Shades that track the sun plus climate schedules routinely trim summer usage, and you'll feel the comfort difference immediately.",
      },
      {
        q: "How are motorized shades powered?",
        a: "Two ways: discreet battery motors that install with no wiring at all, or wired shades for new construction and remodels where we can hide the power completely. We'll recommend the right mix window by window during the comfort audit.",
      },
      {
        q: "Can the shades and thermostat work together on their own?",
        a: "Yes — that's where the magic is. Shades drop automatically as the afternoon sun swings around, the thermostat eases off while you're out, and one \"Goodnight\" scene closes the house down. You set the routine once; the house runs it daily.",
      },
    ],
    related: ["smart-lighting", "whole-home-automation", "safety-security"],
  },
  {
    slug: "safety-security",
    navLabel: "Security & Cameras",
    metaTitle: "Home Security Systems & Camera Installation in Houston",
    metaDescription:
      "Licensed Texas security contractor (#B09380601) installing cameras, smart locks, alarms, and 24/7 monitoring in Houston. One-touch arming, alerts anywhere.",
    eyebrow: "Safety & Security",
    h1: "Watch over home from anywhere on earth",
    intro:
      "See the front door from the office. Unlock the side door for the dog sitter and get a note when she leaves. Arm the whole house with one touch on your way out. Installed by a Texas-licensed security contractor — not a subcontracted crew.",
    icon: "ShieldCheck",
    features: [
      {
        icon: "Cctv",
        title: "Cameras with a clear picture",
        text: "Indoor and outdoor IP cameras with crisp feeds on your phone, touch screens, or the theater screen — live or recorded.",
      },
      {
        icon: "Lock",
        title: "Smart locks & access",
        text: "Grant or revoke entry from anywhere, give every family member their own code, and get notified the moment a door opens.",
      },
      {
        icon: "BellRing",
        title: "Alerts that matter",
        text: "Water leak under the sink, garage left open, package at the door — the house tells you what's wrong while it's still small.",
      },
      {
        icon: "Power",
        title: "One-touch Away",
        text: "A single tap arms the alarm, locks the doors, sets the cameras, and drops the shades. Coming home reverses it just as easily.",
      },
      {
        icon: "Lamp",
        title: "Mockupancy™ occupancy simulation",
        text: "While you travel, lights, shades, and TVs vary in lifelike patterns so the house never advertises that you're gone.",
      },
      {
        icon: "BadgeCheck",
        title: "Licensed, monitored, insured",
        text: "Texas Security Contractor license #B09380601, professional 24/7 monitoring via Alarm.com, and a bonded, background-checked team.",
      },
    ],
    deliverables: [
      "Security assessment of entries, sight lines & risks",
      "IP camera system design & installation (indoor/outdoor)",
      "Smart locks, video doorbell & access control",
      "Alarm system with 24/7 professional monitoring",
      "Leak, garage & environmental alerts",
      "One-touch Away/Home scenes & Mockupancy programming",
    ],
    brands: ["Alarm.com", "Control4", "Kwikset"],
    faqs: [
      {
        q: "Why does the Texas license matter?",
        a: "Security work in Texas legally requires a licensed contractor — and many AV companies quietly skip it. Electronic Dreams holds Texas Security Contractor, Electronic Access, and Burglar Alarm Company licenses (#B09380601), with registered, background-checked installers on staff.",
      },
      {
        q: "Can my cameras and alarm join my smart home?",
        a: "That's the point. Security on Control4 means the alarm, locks, lights, and shades act together — arming at night, simulating occupancy on vacation, and flashing lights on an alarm event instead of living in a separate app.",
      },
      {
        q: "What happens if the power or internet goes out?",
        a: "The system is built for it: battery backup keeps the alarm alive through an outage, and monitored systems report over cellular — not just your Wi-Fi — so a cut line doesn't mean a blind house.",
      },
      {
        q: "Can you take over cameras or an alarm another company installed?",
        a: "Usually, yes. Quality IP cameras and standard alarm panels can often be folded into the new system instead of landfilled. We'll assess what's worth keeping during the security walkthrough — you only replace what actually needs replacing.",
      },
    ],
    related: ["intercom-anywhere", "smart-lighting", "networking"],
  },
  {
    slug: "networking",
    navLabel: "Networking & Wi-Fi",
    metaTitle: "Home Network & Wi-Fi Installation in Houston",
    metaDescription:
      "Enterprise-grade home networks in Houston — whole-home Wi-Fi, structured wiring, fiber by certified technicians, and network security. Free estimates.",
    eyebrow: "Networking & Wi-Fi",
    h1: "The invisible system everything else stands on",
    intro:
      "Streaming in 4K, cameras recording, thirty smart devices talking, video calls upstairs — all at once, without a stutter. A smart home is only as good as its network, so we build yours like the infrastructure it is.",
    icon: "Router",
    features: [
      {
        icon: "Wifi",
        title: "Wi-Fi in every corner",
        text: "Professionally surveyed access point placement kills dead zones — strong signal in the primary suite, the garage gym, and out by the pool.",
      },
      {
        icon: "Cable",
        title: "Structured wiring & fiber",
        text: "Certified fiber optic technicians (and one certified fiber instructor) run the backbone your home deserves — wired where it matters, ready for tomorrow's speeds.",
      },
      {
        icon: "ServerCog",
        title: "Enterprise gear, tidy racks",
        text: "Araknis, Ubiquiti, and Pakedge routers, switches, and access points in a clean, labeled equipment rack — not a blinking pile in a closet.",
      },
      {
        icon: "ShieldHalf",
        title: "Secure by design",
        text: "Segmented networks keep cameras, guests, and IoT gadgets isolated from your personal devices. Your smart home shouldn't be a back door.",
      },
      {
        icon: "Activity",
        title: "Monitored & self-healing",
        text: "Remote monitoring spots trouble early; smart power management can reboot a hung device before you ever notice it was down.",
      },
      {
        icon: "Globe",
        title: "Your home, from anywhere",
        text: "Control4 4Sight gives you secure remote access to the whole house — cameras, locks, lights, climate — from anywhere on earth.",
      },
    ],
    deliverables: [
      "On-site wireless survey & coverage design",
      "Enterprise router, switches & access points, professionally configured",
      "Structured wiring, Cat6 & fiber runs by certified techs",
      "Clean, labeled equipment rack",
      "Network segmentation for cameras, guests & IoT",
      "Remote monitoring & 4Sight remote access setup",
    ],
    brands: ["Araknis", "Ubiquiti", "Pakedge", "Control4"],
    faqs: [
      {
        q: "My Wi-Fi is slow — do I need all this?",
        a: "Maybe not all of it. Sometimes the fix is two well-placed access points; sometimes a house full of streams and cameras has simply outgrown consumer gear. We survey first and propose only what the house actually needs.",
      },
      {
        q: "Why not just use the router from my internet provider?",
        a: "ISP routers are built for a couple of laptops, not for 4K streams, camera recording, and dozens of smart devices at once. Enterprise gear handles the load, reaches the whole property, and can be monitored and fixed remotely.",
      },
      {
        q: "Do I have to change internet providers?",
        a: "No. We work with whatever service you have — fiber, cable, or fixed wireless. Your provider's modem hands off to our network, and everything from the router inward is built, secured, and supported by us.",
      },
      {
        q: "Why do my cameras and smart gadgets need their own network?",
        a: "Segmentation keeps a cheap IoT gadget or a guest's laptop from ever touching your personal computers and files. Cameras, guests, and smart devices each live in their own lane — it's the difference between a home network and a back door.",
      },
    ],
    related: ["whole-home-automation", "safety-security", "multi-room-audio"],
  },
  {
    slug: "intercom-anywhere",
    navLabel: "Video Intercom",
    metaTitle: "Video Intercom & Smart Doorbell Installation in Houston",
    metaDescription:
      "Video intercom and smart doorbell installation in Houston — answer the door from anywhere, room-to-room calling, and whole-house announcements.",
    eyebrow: "Intercom Anywhere",
    h1: "Answer the door from anywhere on earth",
    intro:
      "The doorbell rings and you answer from your phone — at work, at dinner, or at 30,000 feet. Inside, touch screens call room to room, and one tap broadcasts \"dinner's ready\" to the whole house. Connect, communicate, and control.",
    icon: "MessageSquare",
    features: [
      {
        icon: "DoorOpen",
        title: "See who's there — anywhere",
        text: "HD video and clear two-way audio at the front door, answered from a touch screen, your TV, or your phone across the globe.",
      },
      {
        icon: "PackageCheck",
        title: "Deliveries, handled",
        text: "Talk to the courier, watch the drop-off, and unlock the door remotely if needed — with a record of the whole exchange.",
      },
      {
        icon: "PhoneCall",
        title: "Room-to-room calling",
        text: "Call the game room from the kitchen on in-wall or tabletop touch screens — no shouting up the stairs.",
      },
      {
        icon: "Megaphone",
        title: "Whole-house announcements",
        text: "One touch broadcasts to every screen: dinner's ready, time for school, movie starting in five.",
      },
      {
        icon: "ShieldCheck",
        title: "Part of your security",
        text: "The intercom ties into locks, cameras, and lighting — see the porch, light it up, and let someone in, all in one motion.",
      },
      {
        icon: "Globe",
        title: "Powered by 4Sight",
        text: "Control4's secure 4Sight service keeps you connected to home from anywhere, with the same app you use on the couch.",
      },
    ],
    deliverables: [
      "Video doorbell installation & configuration",
      "In-wall & tabletop touch screen placement",
      "Room-to-room and broadcast intercom programming",
      "Door lock & camera integration",
      "4Sight remote access setup",
      "Mobile app configuration for every family member",
    ],
    brands: ["Control4", "Kwikset", "Alarm.com"],
    faqs: [
      {
        q: "How is this better than a consumer video doorbell?",
        a: "A consumer doorbell rings your phone. Intercom Anywhere rings your phone, your touch screens, and your TV — and ties into your locks, cameras, and lights, with no monthly subscription creep across four different apps.",
      },
      {
        q: "Does it work when I'm out of the country?",
        a: "Yes. With 4Sight, distance doesn't matter — answer the door and check the house from anywhere with an internet connection.",
      },
      {
        q: "Can intercom be added to my existing Control4 system?",
        a: "Yes — if you already run Control4, the video doorbell and touch screens drop right into the system you have. It's one of the most popular upgrades for existing clients.",
      },
      {
        q: "Is it simple enough for the kids to use?",
        a: "That's half the fun. Touch screens make room-to-room calls with a tap — \"dinner's ready\" reaches the game room without anyone shouting up the stairs — and the interface is the same one the family already uses for lights and music.",
      },
    ],
    related: ["safety-security", "whole-home-automation", "networking"],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
