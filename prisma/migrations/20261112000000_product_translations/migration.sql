ALTER TABLE "Product"
ADD COLUMN "translations" JSONB NOT NULL DEFAULT '{}'::jsonb;