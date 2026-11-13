ALTER TABLE "Category"
ADD COLUMN "translations" JSONB NOT NULL DEFAULT '{}'::jsonb;