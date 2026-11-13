ALTER TABLE "Location"
ADD COLUMN "translations" JSONB NOT NULL DEFAULT '{}'::jsonb;