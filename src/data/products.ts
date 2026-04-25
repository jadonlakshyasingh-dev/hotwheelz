import classic from "@/assets/car-classic.jpg";
import classicBlue from "@/assets/car-classic-blue.jpg";
import classicBlack from "@/assets/car-classic-black.jpg";
import supercar from "@/assets/car-supercar.jpg";
import superGreen from "@/assets/car-super-green.jpg";
import superPurple from "@/assets/car-super-purple.jpg";
import limited from "@/assets/car-limited.jpg";
import limitedGold from "@/assets/car-limited-gold.jpg";

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

// Chrome line assets — one render per product
import chromeFury from "@/assets/car-chrome-fury.jpg";
import chromePhantom from "@/assets/car-chrome-phantom.jpg";
import chromeBull from "@/assets/car-chrome-bull.jpg";
import chromeSpider from "@/assets/car-chrome-spider.jpg";
import chromeVeyron from "@/assets/car-chrome-veyron.jpg";
import chromeSinger from "@/assets/car-chrome-singer.jpg";
import chromeCharger from "@/assets/car-chrome-charger.jpg";
import chromeStallion from "@/assets/car-chrome-stallion.jpg";
import chromeBlackbird from "@/assets/car-chrome-blackbird.jpg";
import chromeTwinMill from "@/assets/car-chrome-twin-mill.jpg";
import chromeBoneShaker from "@/assets/car-chrome-bone-shaker.jpg";
import chromeDeuce from "@/assets/car-chrome-deuce.jpg";
import chromeSkyline from "@/assets/car-chrome-skyline.jpg";
import chromeSupra from "@/assets/car-chrome-supra.jpg";
import chromeRx7 from "@/assets/car-chrome-rx7.jpg";
import chromeRally from "@/assets/car-chrome-rally.jpg";
import chromeF1 from "@/assets/car-chrome-f1.jpg";
import chromePrototype from "@/assets/car-chrome-prototype.jpg";
import chromeStomper from "@/assets/car-chrome-stomper.jpg";
import chromeVault from "@/assets/car-chrome-vault.jpg";

export type Category = "Classic" | "Supercar" | "Limited" | "Track" | "Fast & Furious";
export type Material = "Metallic" | "Chrome";

export type Product = {
  id: string;
  name: string;
  series: Category;
  material: Material;
  price: number;
  speed: number;
  badge?: string;
  img: string;
  desc: string;
};

const metallicProducts: Product[] = [
  // ─── Classics ─────────────────────────────────────────
  {
    id: "crimson-charger",
    name: "Crimson Charger",
    series: "Classic",
    material: "Metallic",
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
    material: "Metallic",
    price: 16,
    speed: 230,
    img: classicBlue,
    desc: "Deep blue 1969 fastback with white racing stripes.",
  },
  {
    id: "blackout-rod",
    name: "Blackout Rod",
    series: "Classic",
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
    price: 17,
    speed: 240,
    img: camaroYellow,
    desc: "1969 SS muscle in solar yellow with twin black race stripes.",
  },
  {
    id: "twin-mill-ii",
    name: "Twin Mill II",
    series: "Classic",
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
    price: 26,
    speed: 360,
    img: superGreen,
    desc: "Electric-green track beast with active rear wing.",
  },
  {
    id: "violet-vortex",
    name: "Violet Vortex",
    series: "Supercar",
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
    price: 30,
    speed: 365,
    img: ferrariRed,
    desc: "Italian flagship in racing red with gold five-spoke rims.",
  },
  {
    id: "veyron-strike",
    name: "Hyperion Chiron",
    series: "Supercar",
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
    price: 54,
    speed: 290,
    badge: "1 of 500",
    img: limitedGold,
    desc: "Matte gold rally collectible. Numbered & boxed.",
  },

  // ─── Fast & Furious ───────────────────────────────────
  {
    id: "ff-supra-mk4",
    name: "Brian's Supra MK4",
    series: "Fast & Furious",
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
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
    material: "Metallic",
    price: 39,
    speed: 340,
    img: ffGtr,
    desc: "Deep-blue R35 with twin white stripes, blacked-out RAYS-style wheels and rubber tires.",
  },
  {
    id: "ff-roadrunner",
    name: "Letty's Plymouth Road Runner",
    series: "Fast & Furious",
    material: "Metallic",
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
    material: "Metallic",
    price: 44,
    speed: 350,
    badge: "Saga",
    img: ffHellcat,
    desc: "Modern blacked-out Hellcat die-cast with red-lip wheels and aggressive widebody stance.",
  },
];

// ─── Chrome Line — 20 mirror-plated collectibles ─────────
const chromeProducts: Product[] = [
  {
    id: "chrome-fury",
    name: "Chrome Fury",
    series: "Limited",
    material: "Chrome",
    price: 62,
    speed: 300,
    badge: "1 of 250",
    img: chromeFury,
    desc: "Mirror-chrome plating with red stripe accents. The OG of the chrome line.",
  },
  {
    id: "chrome-phantom",
    name: "Chrome Phantom GT",
    series: "Supercar",
    material: "Chrome",
    price: 36,
    speed: 345,
    badge: "Mirror",
    img: chromePhantom,
    desc: "Aero hypercar plated in mirror chrome — reflects every angle of the garage.",
  },
  {
    id: "chrome-bull",
    name: "Chrome Bull V12",
    series: "Supercar",
    material: "Chrome",
    price: 44,
    speed: 372,
    badge: "Top Plate",
    img: chromeBull,
    desc: "Scissor-door V12 brawler in liquid chrome with carbon splitter.",
  },
  {
    id: "chrome-spider",
    name: "Chrome Spider R8",
    series: "Supercar",
    material: "Chrome",
    price: 40,
    speed: 330,
    img: chromeSpider,
    desc: "Mid-engine spyder polished to a mirror, blacked-out 5-spoke wheels.",
  },
  {
    id: "chrome-veyron",
    name: "Chrome Veyron W16",
    series: "Supercar",
    material: "Chrome",
    price: 52,
    speed: 415,
    badge: "Hypercar",
    img: chromeVeyron,
    desc: "Quad-turbo W16 hypercar wrapped in seamless mirror plating.",
  },
  {
    id: "chrome-singer",
    name: "Chrome Singer 911",
    series: "Supercar",
    material: "Chrome",
    price: 38,
    speed: 318,
    img: chromeSinger,
    desc: "Restomod 911 silhouette in liquid chrome with deep-dish turbofans.",
  },
  {
    id: "chrome-charger",
    name: "Chrome Charger '69",
    series: "Classic",
    material: "Chrome",
    price: 34,
    speed: 240,
    badge: "Bestseller",
    img: chromeCharger,
    desc: "1969 muscle icon dipped in mirror chrome with twin black stripes.",
  },
  {
    id: "chrome-stallion",
    name: "Chrome Stallion '67",
    series: "Classic",
    material: "Chrome",
    price: 32,
    speed: 235,
    img: chromeStallion,
    desc: "Fastback legend re-skinned in flawless chrome plating.",
  },
  {
    id: "chrome-blackbird",
    name: "Chrome Blackbird SS",
    series: "Classic",
    material: "Chrome",
    price: 35,
    speed: 248,
    badge: "Hot",
    img: chromeBlackbird,
    desc: "1970 SS in mirror chrome — twin chrome side pipes, chrome side mirrors.",
  },
  {
    id: "chrome-twin-mill",
    name: "Chrome Twin Mill",
    series: "Classic",
    material: "Chrome",
    price: 46,
    speed: 265,
    badge: "Iconic",
    img: chromeTwinMill,
    desc: "Dual-engine custom plated head-to-toe in chrome. Reflective everywhere.",
  },
  {
    id: "chrome-bone-shaker",
    name: "Chrome Bone Shaker",
    series: "Classic",
    material: "Chrome",
    price: 48,
    speed: 250,
    badge: "Cult",
    img: chromeBoneShaker,
    desc: "Skull-faced hot rod fully chromed — exposed engine, chrome blower & pipes.",
  },
  {
    id: "chrome-deuce",
    name: "Chrome Deuce Coupe",
    series: "Classic",
    material: "Chrome",
    price: 42,
    speed: 230,
    img: chromeDeuce,
    desc: "1932 hot rod silhouette in liquid chrome with red interior pop.",
  },
  {
    id: "chrome-skyline",
    name: "Chrome Skyline R34",
    series: "Track",
    material: "Chrome",
    price: 41,
    speed: 312,
    badge: "JDM",
    img: chromeSkyline,
    desc: "Mirror-chrome R34 GT-R with bronze TE37-style wheels and Nismo wing.",
  },
  {
    id: "chrome-supra",
    name: "Chrome Supra MK4",
    series: "Track",
    material: "Chrome",
    price: 43,
    speed: 322,
    badge: "JDM",
    img: chromeSupra,
    desc: "2JZ legend dipped in mirror chrome with carbon-look rear wing.",
  },
  {
    id: "chrome-rx7",
    name: "Chrome RX-7 FD",
    series: "Track",
    material: "Chrome",
    price: 39,
    speed: 305,
    img: chromeRx7,
    desc: "Rotary widebody coupe plated in seamless mirror chrome.",
  },
  {
    id: "chrome-rally",
    name: "Chrome Rally STi",
    series: "Track",
    material: "Chrome",
    price: 37,
    speed: 268,
    badge: "WRC",
    img: chromeRally,
    desc: "WRC-spec sedan in chrome plating — gold rims and mud-splash decals.",
  },
  {
    id: "chrome-f1",
    name: "Chrome Scuderia F1",
    series: "Track",
    material: "Chrome",
    price: 49,
    speed: 385,
    badge: "Race",
    img: chromeF1,
    desc: "Open-wheel formula racer in full mirror chrome with chrome wings.",
  },
  {
    id: "chrome-prototype",
    name: "Chrome LMP1 Prototype",
    series: "Track",
    material: "Chrome",
    price: 47,
    speed: 360,
    img: chromePrototype,
    desc: "Le Mans prototype in seamless chrome — closed cockpit and giant rear wing.",
  },
  {
    id: "chrome-stomper",
    name: "Chrome Stomper 4x4",
    series: "Track",
    material: "Chrome",
    price: 45,
    speed: 185,
    badge: "Off-road",
    img: chromeStomper,
    desc: "Lifted off-road truck plated in chrome — knobby tires and roof light bar.",
  },
  {
    id: "chrome-vault",
    name: "Chrome Vault Edition",
    series: "Limited",
    material: "Chrome",
    price: 78,
    speed: 360,
    badge: "1 of 100",
    img: chromeVault,
    desc: "Numbered vault drop — display-grade chrome plating, signed certificate.",
  },
];

export const products: Product[] = [...metallicProducts, ...chromeProducts];

export const newArrivals: Product[] = [
  products.find((p) => p.id === "ff-supra-mk4")!,
  products.find((p) => p.id === "chrome-phantom")!,
  products.find((p) => p.id === "ff-charger-rt")!,
  products.find((p) => p.id === "chrome-twin-mill")!,
  products.find((p) => p.id === "ff-skyline-r34")!,
  products.find((p) => p.id === "chrome-bone-shaker")!,
  products.find((p) => p.id === "twin-mill-ii")!,
  products.find((p) => p.id === "chrome-f1")!,
];
