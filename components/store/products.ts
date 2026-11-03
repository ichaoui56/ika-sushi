import type { StoreProduct } from "./StoreProvider";

export interface CatalogProduct extends StoreProduct {
  description: string;
  tags: string[];
  categories: string[];
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "salmon-nigiri",
    name: "Salmon Nigiri",
    price: 12,
    image: "/assets/img/shop/Shushi.png",
    quantity: 1,
    description: "Hand-pressed seasoned rice topped with fresh salmon and citrus.",
    tags: ["Salmon", "Nigiri"],
    categories: ["sushi", "nigiri"],
  },
  {
    id: "dragon-roll",
    name: "Dragon Roll",
    price: 16,
    image: "/assets/img/shop/Shushi.png",
    quantity: 1,
    description: "A signature sushi roll layered with salmon, avocado, and tobiko.",
    tags: ["Signature", "Roll"],
    categories: ["sushi", "rolls"],
  },
  {
    id: "spicy-tuna-roll",
    name: "Spicy Tuna Roll",
    price: 14,
    image: "/assets/img/shop/Shushi.png",
    quantity: 1,
    description: "Fresh tuna, crisp cucumber, and a gentle kick of house spice.",
    tags: ["Tuna", "Spicy"],
    categories: ["sushi", "rolls"],
  },
  {
    id: "tempura-prawn-roll",
    name: "Tempura Prawn Roll",
    price: 15,
    image: "/assets/img/shop/Prawns-Fry.png",
    quantity: 1,
    description: "Crisp golden prawns rolled with rice, nori, and creamy avocado.",
    tags: ["Prawn", "Tempura"],
    categories: ["sushi", "rolls", "seafood"],
  },
  {
    id: "salmon-sashimi",
    name: "Salmon Sashimi",
    price: 18,
    image: "/assets/img/shop/Shushi.png",
    quantity: 1,
    description: "Delicate slices of sashimi-grade salmon, simply prepared.",
    tags: ["Salmon", "Sashimi"],
    categories: ["sashimi", "seafood"],
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    price: 19,
    image: "/assets/img/shop/Salmon-Fry.png",
    quantity: 1,
    description: "Flame-seared salmon finished with lemon and fresh herbs.",
    tags: ["Salmon", "Grilled"],
    categories: ["seafood", "grilled"],
  },
  {
    id: "lobster-sushi-platter",
    name: "Lobster Sushi Platter",
    price: 25,
    image: "/assets/img/shop/Crustaceans-such-as-lobsters.png",
    quantity: 1,
    description: "A celebratory platter with sweet lobster and chef-selected sushi.",
    tags: ["Lobster", "Platter"],
    categories: ["sushi", "seafood"],
  },
  {
    id: "crispy-white-fish",
    name: "Crispy White Fish",
    price: 17,
    image: "/assets/img/shop/Pangasius-or-Basa.png",
    quantity: 1,
    description: "Golden, tender white fish served with fresh herbs and lemon.",
    tags: ["White Fish", "Crispy"],
    categories: ["seafood"],
  },
];
