import "dotenv/config";
import argon2 from "argon2";
import { PrismaClient, UserRole } from "@prisma/client";
import { catalogProducts, menuCategories } from "../components/store/products";
import { normalizePhoneNumber } from "../features/auth/schemas";

const prisma = new PrismaClient();
const heroSlides = [
  {
    title: "SUSHI FAÇONNÉ À LA MAIN",
    subtitle: "TOUT DROIT VENU DE LA MER · CHAQUE JOUR",
    description: "Des gestes précis, des produits frais, une histoire de goût.",
    imageUrl: "/assets/img/food/sushi1.PNG",
  },
  {
    title: "LA MER EN MAKI",
    subtitle: "ROULÉ AVEC SOIN · SERVI BIEN FRAIS",
    description: "Des rouleaux généreux, préparés à la commande avec soin.",
    imageUrl: "/assets/img/food/sushi-platter.png",
  },
  {
    title: "UN GOÛT DU JAPON",
    subtitle: "SÉLECTION DU CHEF · FRAÎCHEUR GARANTIE",
    description: "Une sélection de sushi et de fruits de mer à partager.",
    imageUrl: "/assets/img/food/sushi-boat.PNG",
  },
];

const deliveryNeighborhoods = [
  "Maarif", "Gauthier", "Racine", "Bourgogne", "Palmier", "Anfa", "Oasis",
  "CIL", "Ain Diab", "Hay Hassani", "Sidi Maarouf", "Californie", "Ain Sebaa",
  "Hay Mohammadi", "Sidi Bernoussi", "Bouskoura", "Dar Bouazza",
];

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const name = process.env.ADMIN_NAME?.trim();
  const phone = process.env.ADMIN_PHONE?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL?.trim() || null;

  if (password) {
    if (!name || !phone) throw new Error("Set ADMIN_NAME and ADMIN_PHONE before seeding the administrator.");
    if (password.length < 8) throw new Error("ADMIN_PASSWORD must contain at least 8 characters.");

    const normalizedPhone = normalizePhoneNumber(phone);
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19_456,
      timeCost: 2,
      parallelism: 1,
    });

    await prisma.user.upsert({
      where: { normalizedPhone },
      create: {
        name,
        phone,
        normalizedPhone,
        email,
        passwordHash,
        role: UserRole.ADMIN,
      },
      update: {
        name,
        email,
        passwordHash,
        role: UserRole.ADMIN,
        status: "ACTIVE",
      },
    });
  } else {
    console.warn("Skipping administrator seed. Set a strong ADMIN_PASSWORD to create the initial admin account.");
  }

  const city = await prisma.location.upsert({
    where: { slug: "casablanca" },
    create: {
      name: "Casablanca",
      slug: "casablanca",
      type: "CITY",
      deliveryAvailable: false,
      sortOrder: 0,
    },
    update: {},
  });

  for (const [index, name] of deliveryNeighborhoods.entries()) {
    await prisma.location.upsert({
      where: { slug: slugify(name) },
      create: {
        name,
        slug: slugify(name),
        type: "NEIGHBORHOOD",
        parentId: city.id,
        deliveryAvailable: false,
        sortOrder: index,
      },
      update: {},
    });
  }

  for (const [index, category] of menuCategories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.id },
      create: {
        name: category.name,
        slug: category.id,
        sortOrder: index,
      },
      update: {},
    });
  }

  const usedSlugs = new Set<string>();
  for (const [index, product] of catalogProducts.entries()) {
    const baseSlug = slugify(product.name);
    const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-${slugify(product.id)}` : baseSlug;
    usedSlugs.add(baseSlug);

    const originalPriceMinor = product.originalPrice === undefined
      ? null
      : Math.round(product.originalPrice * 100);
    const priceMinor = Math.round(product.price * 100);
    const discountPercent = originalPriceMinor && originalPriceMinor > priceMinor
      ? ((originalPriceMinor - priceMinor) / originalPriceMinor) * 100
      : null;

    await prisma.product.upsert({
      where: { slug },
      create: {
        id: product.id,
        name: product.name,
        slug,
        description: product.description,
        shortDescription: product.description.slice(0, 500),
        tags: product.tags,
        priceMinor,
        originalPriceMinor,
        discountPercent,
        isOnPromotion: discountPercent !== null,
        isFeaturedBestSeller: product.isBestSeller ?? false,
        sortOrder: index,
        categories: {
          create: product.categories.map((categoryId) => ({
            category: { connect: { slug: categoryId } },
          })),
        },
        images: {
          create: [{
            url: product.image,
            alt: product.name,
            isPrimary: true,
            sortOrder: 0,
          }],
        },
      },
      update: {},
    });
  }

  for (const [index, slide] of heroSlides.entries()) {
    const existing = await prisma.heroSlide.findFirst({ where: { title: slide.title } });
    if (existing) continue;
    await prisma.heroSlide.create({
      data: {
        ...slide,
        ctaText: "COMMANDER",
        ctaDestination: "/shop",
        sortOrder: index,
        isActive: true,
      },
    });
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });