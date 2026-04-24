import classic from "@/assets/car-classic.jpg";
import classicBlue from "@/assets/car-classic-blue.jpg";
import classicBlack from "@/assets/car-classic-black.jpg";
import supercar from "@/assets/car-supercar.jpg";
import superGreen from "@/assets/car-super-green.jpg";
import superPurple from "@/assets/car-super-purple.jpg";
import limited from "@/assets/car-limited.jpg";
import limitedGold from "@/assets/car-limited-gold.jpg";
import limitedChrome from "@/assets/car-limited-chrome.jpg";
import twinMill from "@/assets/car-twin-mill.jpg";
import boneShaker from "@/assets/car-bone-shaker.jpg";
import mustangGreen from "@/assets/car-mustang-green.jpg";
import camaroYellow from "@/assets/car-camaro-yellow.jpg";
import lamboOrange from "@/assets/car-lambo-orange.jpg";
import ferrariRed from "@/assets/car-ferrari-red.jpg";
import bugattiBlue from "@/assets/car-bugatti-blue.jpg";
import f1Red from "@/assets/car-f1-red.jpg";
import rallyBlue from "@/assets/car-rally-blue.jpg";
import monsterTruck from "@/assets/car-monster-truck.jpg";
import skylineBlue from "@/assets/car-skyline-blue.jpg";
import porscheSilver from "@/assets/car-porsche-silver.jpg";
import ffSupra from "@/assets/car-ff-supra.jpg";
import ffSkyline from "@/assets/car-ff-skyline.jpg";
import ffCharger from "@/assets/car-ff-charger.jpg";
import ffEclipse from "@/assets/car-ff-eclipse.jpg";
import ffRx7 from "@/assets/car-ff-rx7.jpg";
import ffGtr from "@/assets/car-ff-gtr.jpg";
import ffRoadrunner from "@/assets/car-ff-roadrunner.jpg";
import ffHellcat from "@/assets/car-ff-hellcat.jpg";

export type Category = "Classic" | "Supercar" | "Limited" | "Track" | "Fast & Furious";

export type Product = {
  id: string;
  name: string;
  series: Category;
  price: number;
  speed: number;
  badge?: string;
  img: string;
  desc: string;
};

export const products: Product[] = [
  // ─── Classics ─────────────────────────────────────────
  {
    id: "crimson-charger",
    name: "Crimson Charger",
    series: "Classic",
    price: 14,
    speed: 220,
    badge: "Bestseller",
    img: classic,
    desc: "1970 muscle icon, hand-painted crimson with chrome trim.",
  },
  {
    id: "midnight-marauder",
    name: "Midnight Marauder",
    series: "Classic",
    price: 16,
    speed: 230,
    img: classicBlue,
    desc: "Deep blue 1969 fastback with white racing stripes.",
  },
  {
    id: "blackout-rod",
    name: "Blackout Rod",
    series: "Classic",
    price: 18,
    speed: 210,
    badge: "Hot",
    img: classicBlack,
    desc: "Glossy black hot rod with red flame decals.",
  },
  {
    id: "emerald-stallion",
    name: "Emerald Stallion '67",
    series: "Classic",
    price: 19,
    speed: 235,
    badge: "New",
    img: mustangGreen,
    desc: "Iconic 1967 fastback in emerald green with twin white stripes.",
  },
  {
    id: "sunstrike-ss",
    name: "Sunstrike SS",
    series: "Classic",
    price: 17,
    speed: 240,
    img: camaroYellow,
    desc: "1969 SS muscle in solar yellow with twin black race stripes.",
  },
  {
    id: "twin-mill-ii",
    name: "Twin Mill II",
    series: "Classic",
    price: 20,
    speed: 260,
    badge: "Iconic",
    img: twinMill,
    desc: "Dual-engine custom legend. Chrome blowers bursting through the hood.",
  },
  {
    id: "bone-shaker",
    name: "Bone Shaker",
    series: "Classic",
    price: 22,
    speed: 245,
    badge: "Cult",
    img: boneShaker,
    desc: "Skull-faced black hot rod with orange flames and oversized rears.",
  },

  // ─── Supercars ────────────────────────────────────────
  {
    id: "neon-phantom-gt",
    name: "Neon Phantom GT",
    series: "Supercar",
    price: 22,
    speed: 340,
    badge: "New",
    img: supercar,
    desc: "Aero-body hypercar with carbon-fiber accents.",
  },
  {
    id: "venom-strike",
    name: "Venom Strike",
    series: "Supercar",
    price: 26,
    speed: 360,
    img: superGreen,
    desc: "Electric-green track beast with active rear wing.",
  },
  {
    id: "violet-vortex",
    name: "Violet Vortex",
    series: "Supercar",
    price: 28,
    speed: 355,
    badge: "Trending",
    img: superPurple,
    desc: "Pearlescent purple hypercar with gold-spoked rims.",
  },
  {
    id: "solar-bull",
    name: "Solar Bull V12",
    series: "Supercar",
    price: 32,
    speed: 370,
    badge: "Top Speed",
    img: lamboOrange,
    desc: "Scissor-door brawler in pearl orange with carbon splitter.",
  },
  {
    id: "rosso-corsa",
    name: "Rosso Corsa 488",
    series: "Supercar",
    price: 30,
    speed: 365,
    img: ferrariRed,
    desc: "Italian flagship in racing red with gold five-spoke rims.",
  },
  {
    id: "veyron-strike",
    name: "Hyperion Chiron",
    series: "Supercar",
    price: 38,
    speed: 420,
    badge: "Hypercar",
    img: bugattiBlue,
    desc: "1500 hp two-tone hypercar in carbon black & electric blue.",
  },
  {
    id: "silver-singer",
    name: "Silver Singer 911",
    series: "Supercar",
    price: 27,
    speed: 320,
    img: porscheSilver,
    desc: "Restomod 911 in liquid silver with deep-dish black turbofans.",
  },

  // ─── Track / Race ─────────────────────────────────────
  {
    id: "scuderia-f1",
    name: "Scuderia F1-24",
    series: "Track",
    price: 34,
    speed: 380,
    badge: "Race",
    img: f1Red,
    desc: "Open-wheel formula racer in deep crimson livery.",
  },
  {
    id: "rally-warrior",
    name: "Rally Warrior STi",
    series: "Track",
    price: 24,
    speed: 270,
    badge: "WRC",
    img: rallyBlue,
    desc: "World Rally blue with gold rims, mud-splashed and ready.",
  },
  {
    id: "skyline-r34",
    name: "Skyline R34 Nismo",
    series: "Track",
    price: 29,
    speed: 310,
    badge: "JDM",
    img: skylineBlue,
    desc: "Bayside blue legend with bronze Nismo wheels and neon underglow.",
  },
  {
    id: "stomper-4x4",
    name: "Stomper 4x4",
    series: "Track",
    price: 25,
    speed: 180,
    badge: "Off-road",
    img: monsterTruck,
    desc: "Lifted lime-green monster on knobby tires with full light bar.",
  },

  // ─── Limited Edition ──────────────────────────────────
  {
    id: "inferno-blaze",
    name: "Inferno Blaze",
    series: "Limited",
    price: 48,
    speed: 280,
    badge: "Rare",
    img: limited,
    desc: "Numbered drop, hand-finished with metallic flake.",
  },
  {
    id: "golden-rally-7",
    name: "Golden Rally 7",
    series: "Limited",
    price: 54,
    speed: 290,
    badge: "1 of 500",
    img: limitedGold,
    desc: "Matte gold rally collectible. Numbered & boxed.",
  },
  {
    id: "chrome-fury",
    name: "Chrome Fury",
    series: "Limited",
    price: 62,
    speed: 300,
    badge: "1 of 250",
    img: limitedChrome,
    desc: "Mirror-chrome plating with red stripe accents.",
  },

  // ─── Fast & Furious ───────────────────────────────────
  {
    id: "ff-supra-mk4",
    name: "Brian's Supra MK4",
    series: "Fast & Furious",
    price: 36,
    speed: 320,
    badge: "Movie Icon",
    img: ffSupra,
    desc: "Orange 2JZ legend with black race stripes — full metal body, chrome 5-spokes & rubber tires.",
  },
  {
    id: "ff-skyline-r34",
    name: "Brian's Skyline R34",
    series: "Fast & Furious",
    price: 38,
    speed: 330,
    badge: "2 Fast",
    img: ffSkyline,
    desc: "Bayside silver-blue R34 GT-R die-cast with tampo decals and detailed Nismo wing.",
  },
  {
    id: "ff-charger-rt",
    name: "Dom's Charger R/T",
    series: "Fast & Furious",
    price: 42,
    speed: 290,
    badge: "Bestseller",
    img: ffCharger,
    desc: "Blacked-out 1970 Charger with chrome blower bursting through the hood. Heavy metal.",
  },
  {
    id: "ff-eclipse",
    name: "Brian's Eclipse GSX",
    series: "Fast & Furious",
    price: 32,
    speed: 260,
    badge: "OG",
    img: ffEclipse,
    desc: "Lime-green Eclipse with purple tribal tampos — the car that started it all.",
  },
  {
    id: "ff-rx7-veilside",
    name: "Han's RX-7 Veilside",
    series: "Fast & Furious",
    price: 40,
    speed: 310,
    badge: "Tokyo Drift",
    img: ffRx7,
    desc: "Silver & red Veilside Fortune RX-7 die-cast with widebody flares and rear wing.",
  },
  {
    id: "ff-gtr-r35",
    name: "Brian's GT-R R35",
    series: "Fast & Furious",
    price: 39,
    speed: 340,
    img: ffGtr,
    desc: "Deep-blue R35 with twin white stripes, blacked-out RAYS-style wheels and rubber tires.",
  },
  {
    id: "ff-roadrunner",
    name: "Letty's Plymouth Road Runner",
    series: "Fast & Furious",
    price: 35,
    speed: 270,
    badge: "Rare",
    img: ffRoadrunner,
    desc: "Matte gunmetal '70 Road Runner — raw muscle in heavy-cast metal.",
  },
  {
    id: "ff-hellcat",
    name: "Dom's Charger Hellcat",
    series: "Fast & Furious",
    price: 44,
    speed: 350,
    badge: "Saga",
    img: ffHellcat,
    desc: "Modern blacked-out Hellcat die-cast with red-lip wheels and aggressive widebody stance.",
  },
];

export const newArrivals: Product[] = [
  products.find((p) => p.id === "ff-supra-mk4")!,
  products.find((p) => p.id === "ff-charger-rt")!,
  products.find((p) => p.id === "ff-skyline-r34")!,
  products.find((p) => p.id === "ff-rx7-veilside")!,
  products.find((p) => p.id === "twin-mill-ii")!,
  products.find((p) => p.id === "ff-gtr-r35")!,
  products.find((p) => p.id === "veyron-strike")!,
  products.find((p) => p.id === "bone-shaker")!,
];
