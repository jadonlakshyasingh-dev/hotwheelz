import classic from "@/assets/car-classic.jpg";
import classicBlue from "@/assets/car-classic-blue.jpg";
import classicBlack from "@/assets/car-classic-black.jpg";
import supercar from "@/assets/car-supercar.jpg";
import superGreen from "@/assets/car-super-green.jpg";
import superPurple from "@/assets/car-super-purple.jpg";
import limited from "@/assets/car-limited.jpg";
import limitedGold from "@/assets/car-limited-gold.jpg";
import limitedChrome from "@/assets/car-limited-chrome.jpg";

export type Category = "Classic" | "Supercar" | "Limited";

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
  // Classics
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

  // Supercars
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

  // Limited Edition
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
];

export const newArrivals: Product[] = [
  products.find((p) => p.id === "venom-strike")!,
  products.find((p) => p.id === "chrome-fury")!,
  products.find((p) => p.id === "violet-vortex")!,
  products.find((p) => p.id === "midnight-marauder")!,
  products.find((p) => p.id === "golden-rally-7")!,
  products.find((p) => p.id === "blackout-rod")!,
];
