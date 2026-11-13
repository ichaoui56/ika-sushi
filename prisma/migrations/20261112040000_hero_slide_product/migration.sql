ALTER TABLE "HeroSlide" ADD COLUMN "productId" TEXT;

CREATE INDEX "HeroSlide_productId_idx" ON "HeroSlide"("productId");

ALTER TABLE "HeroSlide"
ADD CONSTRAINT "HeroSlide_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;