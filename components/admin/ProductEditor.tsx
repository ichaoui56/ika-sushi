"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  attachProductImage,
  createProduct,
  deleteProductImage,
  setPrimaryProductImage,
  updateProduct,
} from "../../features/products/actions";
import type {
  LocalizedProductText,
  ProductLocale,
  ProductTranslationField,
  ProductTranslations,
} from "../../features/products/translations";
import { uploadAdminImage } from "./uploadImage";
import { toLocalImageUrl } from "../../lib/image-url";
import type { AdminCategoryOption, AdminProductRecord } from "./product-types";
import "./ProductManagement.css";

type TranslationDraft = Record<ProductTranslationField, Record<ProductLocale, string>>;

interface FormValues {
  translations: TranslationDraft;
  slug: string;
  tags: string;
  price: string;
  originalPrice: string;
  discountPercent: string;
  isOnPromotion: boolean;
  isFeaturedBestSeller: boolean;
  isAvailable: boolean;
  sortOrder: string;
  categoryIds: string[];
}

interface StagedImage {
  id: string;
  file: File;
  previewUrl: string;
}

const locales: Array<{ id: ProductLocale; label: string; caption: string }> = [
  { id: "fr", label: "Français", caption: "Par défaut" },
  { id: "en", label: "English", caption: "Optional" },
  { id: "ar", label: "العربية", caption: "اختياري" },
];

const contentCopy: Record<ProductLocale, {
  name: string;
  namePlaceholder: string;
  shortDescription: string;
  optionalPlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  requiredFallback: string;
}> = {
  fr: {
    name: "Nom du produit",
    namePlaceholder: "Ex. Saumon croustillant",
    shortDescription: "Description courte",
    optionalPlaceholder: "Facultatif",
    description: "Description",
    descriptionPlaceholder: "Décrivez le produit",
    requiredFallback: "Obligatoire · Le français est la langue de secours",
  },
  en: {
    name: "Product name",
    namePlaceholder: "e.g. Crispy salmon",
    shortDescription: "Short description",
    optionalPlaceholder: "Optional translation",
    description: "Description",
    descriptionPlaceholder: "Describe the product",
    requiredFallback: "Required · French is the fallback",
  },
  ar: {
    name: "اسم المنتج",
    namePlaceholder: "مثال: سلمون مقرمش",
    shortDescription: "وصف مختصر",
    optionalPlaceholder: "ترجمة اختيارية",
    description: "الوصف",
    descriptionPlaceholder: "اكتب وصف المنتج",
    requiredFallback: "مطلوب · الفرنسية هي اللغة الاحتياطية",
  },
};

const emptyTranslations: TranslationDraft = {
  name: { fr: "", en: "", ar: "" },
  description: { fr: "", en: "", ar: "" },
  shortDescription: { fr: "", en: "", ar: "" },
};

function valueFor(translations: ProductTranslations | undefined, field: ProductTranslationField, locale: ProductLocale, fallback = "") {
  return translations?.[field]?.[locale] ?? (locale === "fr" ? fallback : "");
}

function createFormValues(product?: AdminProductRecord): FormValues {
  const translations = product?.translations;
  return {
    translations: {
      name: {
        fr: valueFor(translations, "name", "fr", product?.name),
        en: valueFor(translations, "name", "en"),
        ar: valueFor(translations, "name", "ar"),
      },
      description: {
        fr: valueFor(translations, "description", "fr", product?.description),
        en: valueFor(translations, "description", "en"),
        ar: valueFor(translations, "description", "ar"),
      },
      shortDescription: {
        fr: valueFor(translations, "shortDescription", "fr", product?.shortDescription ?? ""),
        en: valueFor(translations, "shortDescription", "en"),
        ar: valueFor(translations, "shortDescription", "ar"),
      },
    },
    slug: product?.slug ?? "",
    tags: product?.tags.join(", ") ?? "",
    price: product ? (product.priceMinor / 100).toFixed(2) : "",
    originalPrice: product?.originalPriceMinor ? (product.originalPriceMinor / 100).toFixed(2) : "",
    discountPercent: product?.discountPercent ?? "",
    isOnPromotion: product?.isOnPromotion ?? false,
    isFeaturedBestSeller: product?.isFeaturedBestSeller ?? false,
    isAvailable: product?.isAvailable ?? true,
    sortOrder: String(product?.sortOrder ?? 0),
    categoryIds: product?.categories.map(({ category }) => category.id) ?? [],
  };
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatInputPrice(value: number) {
  return Number.isFinite(value) ? (Math.round(value * 100) / 100).toFixed(2) : "";
}

function getDiscountPercent(price: number, originalPrice: number) {
  if (originalPrice <= 0 || price < 0 || price > originalPrice) return "";
  return ((Math.round(((originalPrice - price) / originalPrice) * 10000) / 100) || 0).toString();
}

function getOriginalPrice(price: number, discountPercent: number) {
  if (price < 0 || discountPercent <= 0 || discountPercent >= 100) return "";
  return formatInputPrice(price / (1 - discountPercent / 100));
}

function normalizedTranslations(translations: TranslationDraft): ProductTranslations {
  const normalize = (field: ProductTranslationField): LocalizedProductText => {
    const values = translations[field];
    return {
      fr: values.fr.trim(),
      ...(values.en.trim() ? { en: values.en.trim() } : {}),
      ...(values.ar.trim() ? { ar: values.ar.trim() } : {}),
    };
  };
  return {
    name: normalize("name"),
    description: normalize("description"),
    shortDescription: normalize("shortDescription"),
  };
}

export default function ProductEditor({
  categories,
  product,
  onSaved,
}: {
  categories: AdminCategoryOption[];
  product?: AdminProductRecord;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState(() => createFormValues(product));
  const [activeLocale, setActiveLocale] = useState<ProductLocale>("fr");
  const [slugEdited, setSlugEdited] = useState(Boolean(product));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [stagedImages, setStagedImages] = useState<StagedImage[]>([]);
  const [coverImageId, setCoverImageId] = useState<string | null>(null);
  const stagedImagesRef = useRef(stagedImages);
  stagedImagesRef.current = stagedImages;

  useEffect(() => () => {
    stagedImagesRef.current.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
  }, []);

  const updateText = (field: ProductTranslationField, locale: ProductLocale, value: string) => {
    setValues((current) => ({
      ...current,
      translations: { ...current.translations, [field]: { ...current.translations[field], [locale]: value } },
      ...(field === "name" && locale === "fr" && !slugEdited ? { slug: slugify(value) } : {}),
    }));
  };

  const updatePrice = (price: string) => {
    setValues((current) => {
      const priceValue = Number(price);
      const originalValue = Number(current.originalPrice);
      const discountValue = Number(current.discountPercent);
      if (current.originalPrice && priceValue <= originalValue) {
        const discountPercent = getDiscountPercent(priceValue, originalValue);
        return { ...current, price, discountPercent, isOnPromotion: Number(discountPercent) > 0 || current.isOnPromotion };
      }
      if (current.discountPercent && discountValue < 100 && priceValue >= 0) {
        const originalPrice = getOriginalPrice(priceValue, discountValue);
        return { ...current, price, originalPrice, isOnPromotion: discountValue > 0 || current.isOnPromotion };
      }
      return { ...current, price };
    });
  };

  const updateOriginalPrice = (originalPrice: string) => {
    setValues((current) => {
      const priceValue = Number(current.price);
      const originalValue = Number(originalPrice);
      const discountPercent = current.price && originalPrice
        ? getDiscountPercent(priceValue, originalValue)
        : "";
      return {
        ...current,
        originalPrice,
        discountPercent,
        isOnPromotion: Number(discountPercent) > 0 || current.isOnPromotion,
      };
    });
  };

  const updateDiscount = (discountPercent: string) => {
    setValues((current) => {
      const percent = Number(discountPercent);
      const originalPrice = current.price && discountPercent
        ? getOriginalPrice(Number(current.price), percent)
        : "";
      return {
        ...current,
        discountPercent,
        originalPrice,
        isOnPromotion: percent > 0 || current.isOnPromotion,
      };
    });
  };

  const toggleCategory = (categoryId: string, checked: boolean) => {
    setValues((current) => ({
      ...current,
      categoryIds: checked
        ? [...current.categoryIds, categoryId]
        : current.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");

    const priceMinor = Math.round(Number(values.price) * 100);
    const originalPriceMinor = values.originalPrice ? Math.round(Number(values.originalPrice) * 100) : undefined;
    const translations = normalizedTranslations(values.translations);
    const payload = {
      ...(product ? { id: product.id } : {}),
      name: translations.name?.fr || "",
      slug: values.slug || undefined,
      description: translations.description?.fr || "",
      shortDescription: translations.shortDescription?.fr || undefined,
      translations,
      tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      pricingMode: originalPriceMinor === undefined ? "SELLING_ONLY" as const : "SELLING_AND_ORIGINAL" as const,
      priceMinor,
      ...(originalPriceMinor !== undefined ? { originalPriceMinor } : {}),
      isOnPromotion: values.isOnPromotion,
      isFeaturedBestSeller: values.isFeaturedBestSeller,
      isAvailable: values.isAvailable,
      sortOrder: Number(values.sortOrder),
      categoryIds: values.categoryIds,
    };

    try {
      let result;
      if (product) {
        result = await updateProduct(payload);
      } else {
        const orderedImages = [...stagedImages].sort((first, second) => {
          if (first.id === coverImageId) return -1;
          if (second.id === coverImageId) return 1;
          return 0;
        });
        const imageUrls = await Promise.all(orderedImages.map(({ file }) => uploadAdminImage(file)));
        result = await createProduct({ ...payload, imageUrls });
      }
      if (!result.success) {
        setError(result.message);
        return;
      }
      setMessage(result.message);
      if (onSaved) {
        onSaved();
        router.refresh();
      } else {
        router.push("/admin/products");
        router.refresh();
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save the product.");
    } finally {
      setPending(false);
    }
  };

  const uploadImage = async (file?: File) => {
    if (!product || !file) return;
    setPending(true);
    setError("");
    try {
      const url = await uploadAdminImage(file);
      const result = await attachProductImage(product.id, url);
      if (!result.success) setError(result.message);
      else {
        setMessage("Product image added.");
        router.refresh();
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setPending(false);
    }
  };

  const selectImages = (files: FileList | null) => {
    if (!files?.length) return;
    const availableSlots = Math.max(0, 12 - stagedImages.length);
    const selectedFiles = Array.from(files).slice(0, availableSlots);
    if (!selectedFiles.length) return;
    const nextImages = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setStagedImages((current) => [...current, ...nextImages]);
    setCoverImageId((current) => current ?? nextImages[0].id);
    setError(selectedFiles.length < files.length ? "A product can have up to 12 images." : "");
  };

  const removeStagedImage = (imageId: string) => {
    const removedImage = stagedImages.find((image) => image.id === imageId);
    if (removedImage) URL.revokeObjectURL(removedImage.previewUrl);
    setStagedImages((current) => {
      const nextImages = current.filter((image) => image.id !== imageId);
      if (coverImageId === imageId) setCoverImageId(nextImages[0]?.id ?? null);
      return nextImages;
    });
  };

  const removeImage = async (imageId: string) => {
    setPending(true);
    setError("");
    try {
      const result = await deleteProductImage(imageId);
      if (!result.success) setError(result.message);
      else router.refresh();
    } finally {
      setPending(false);
    }
  };

  const setPrimaryImage = async (imageId: string) => {
    setPending(true);
    setError("");
    try {
      const result = await setPrimaryProductImage(imageId);
      if (!result.success) setError(result.message);
      else {
        setMessage("Cover image updated.");
        router.refresh();
      }
    } catch (primaryError) {
      setError(primaryError instanceof Error ? primaryError.message : "Unable to update the cover image.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="Ika-product-editor" onSubmit={submit}>
      <section className="Ika-product-editor-section Ika-product-content-section">
        <div className="Ika-product-content-heading">
          <div><span>PRODUCT CONTENT</span><strong>Product text</strong></div>
          <p>Write the product details for each storefront language.</p>
        </div>
        <div className="Ika-product-language-tabs" role="tablist" aria-label="Product language">
          {locales.map((locale) => (
            <button
              key={locale.id}
              type="button"
              role="tab"
              aria-selected={activeLocale === locale.id}
              className={activeLocale === locale.id ? "is-active" : ""}
              onClick={() => setActiveLocale(locale.id)}
            >
              <span className="Ika-product-language-code">{locale.id.toUpperCase()}</span>
              <span className="Ika-product-language-name">{locale.label}<small>{locale.caption}</small></span>
            </button>
          ))}
        </div>
        <div className="Ika-product-editor-fields" lang={activeLocale} dir={activeLocale === "ar" ? "rtl" : "ltr"}>
          <label className="Ika-product-editor-wide">
            {contentCopy[activeLocale].name} {activeLocale === "fr" && <span className="Ika-product-required">{contentCopy[activeLocale].requiredFallback}</span>}
            <input
              value={values.translations.name[activeLocale]}
              onChange={(event) => updateText("name", activeLocale, event.target.value)}
              required={activeLocale === "fr"}
              maxLength={160}
              placeholder={activeLocale === "en" ? contentCopy[activeLocale].optionalPlaceholder : contentCopy[activeLocale].namePlaceholder}
            />
          </label>
          <label>
            {contentCopy[activeLocale].shortDescription}
            <input
              value={values.translations.shortDescription[activeLocale]}
              onChange={(event) => updateText("shortDescription", activeLocale, event.target.value)}
              maxLength={500}
              placeholder={activeLocale === "ar" ? contentCopy[activeLocale].optionalPlaceholder : contentCopy[activeLocale].optionalPlaceholder}
            />
          </label>
          <label className="Ika-product-editor-wide">
            {contentCopy[activeLocale].description} {activeLocale === "fr" && <span className="Ika-product-required">{contentCopy[activeLocale].requiredFallback}</span>}
            <textarea
              value={values.translations.description[activeLocale]}
              onChange={(event) => updateText("description", activeLocale, event.target.value)}
              required={activeLocale === "fr"}
              rows={4}
              maxLength={5000}
              placeholder={activeLocale === "en" ? contentCopy[activeLocale].optionalPlaceholder : contentCopy[activeLocale].descriptionPlaceholder}
            />
          </label>
        </div>
      </section>

      <section className="Ika-product-editor-section">
        <div className="Ika-product-editor-section-heading"><span>CATALOG</span><strong>Product details</strong></div>
        <div className="Ika-product-editor-fields">
          <label className="Ika-product-editor-wide">
            URL slug
            <div className="Ika-product-slug-field">
              <input value={values.slug} onChange={(event) => { setSlugEdited(true); setValues({ ...values, slug: event.target.value }); }} maxLength={180} placeholder="Generated from the French name" />
              <button type="button" onClick={() => { setSlugEdited(false); setValues((current) => ({ ...current, slug: slugify(current.translations.name.fr) })); }}>Auto</button>
            </div>
          </label>
          <label>Tags<input value={values.tags} onChange={(event) => setValues({ ...values, tags: event.target.value })} placeholder="Saumon, croustillant" /></label>
          <label>Display order<input type="number" step="1" value={values.sortOrder} onChange={(event) => setValues({ ...values, sortOrder: event.target.value })} /></label>
        </div>
      </section>

      <section className="Ika-product-editor-section">
        <div className="Ika-product-editor-section-heading"><span>PRICING</span><strong>Prices in MAD</strong></div>
        <div className="Ika-product-price-fields">
          <label>Selling price<input type="number" min="0" step="0.01" value={values.price} onChange={(event) => updatePrice(event.target.value)} required /></label>
          <label>Previous price<input type="number" min="0" step="0.01" value={values.originalPrice} onChange={(event) => updateOriginalPrice(event.target.value)} placeholder="Optional" /></label>
          <label>Discount<input type="number" min="0" max="100" step="0.01" value={values.discountPercent} onChange={(event) => updateDiscount(event.target.value)} placeholder="%" /></label>
        </div>
        <p className="Ika-product-pricing-hint">Enter a previous price or a discount; the other value is calculated automatically.</p>
        {values.originalPrice && Number(values.price) > Number(values.originalPrice) && <p className="Ika-product-form-error">Selling price cannot exceed the previous price.</p>}
      </section>

      <section className="Ika-product-editor-section">
        <div className="Ika-product-editor-section-heading"><span>VISIBILITY</span><strong>Storefront settings</strong></div>
        <div className="Ika-product-flag-grid">
          <label className={`Ika-product-flag${values.isAvailable ? " is-on" : ""}`}>
            <input type="checkbox" checked={values.isAvailable} onChange={(event) => setValues({ ...values, isAvailable: event.target.checked })} />
            <span className="Ika-product-flag-icon"><i className="fas fa-store" aria-hidden="true" /></span>
            <span><strong>Available</strong><small>Visible and orderable</small></span>
            <span className="Ika-product-switch" aria-hidden="true" />
          </label>
          <label className={`Ika-product-flag${values.isOnPromotion ? " is-on" : ""}`}>
            <input type="checkbox" checked={values.isOnPromotion} onChange={(event) => setValues({ ...values, isOnPromotion: event.target.checked })} />
            <span className="Ika-product-flag-icon is-promotion"><i className="fas fa-bolt" aria-hidden="true" /></span>
            <span><strong>Promotion</strong><small>Feature in offers</small></span>
            <span className="Ika-product-switch" aria-hidden="true" />
          </label>
          <label className={`Ika-product-flag${values.isFeaturedBestSeller ? " is-on" : ""}`}>
            <input type="checkbox" checked={values.isFeaturedBestSeller} onChange={(event) => setValues({ ...values, isFeaturedBestSeller: event.target.checked })} />
            <span className="Ika-product-flag-icon is-best"><i className="fas fa-star" aria-hidden="true" /></span>
            <span><strong>Best seller</strong><small>Feature on homepage</small></span>
            <span className="Ika-product-switch" aria-hidden="true" />
          </label>
        </div>
      </section>

      <section className="Ika-product-editor-section">
        <div className="Ika-product-editor-section-heading"><span>ORGANIZATION</span><strong>Categories</strong></div>
        <div className="Ika-product-category-grid">
          {categories.map((category) => {
            const selected = values.categoryIds.includes(category.id);
            return (
              <label key={category.id} className={selected ? "is-selected" : ""}>
                <input type="checkbox" checked={selected} onChange={(event) => toggleCategory(category.id, event.target.checked)} />
                <span className="Ika-product-category-check"><i className="fas fa-check" aria-hidden="true" /></span>
                <span>{category.name}</span>
              </label>
            );
          })}
        </div>
        {categories.length === 0 && <p className="Ika-product-pricing-hint">Create a category before adding products.</p>}
      </section>

      <section className="Ika-product-editor-section">
        <div className="Ika-product-editor-section-heading"><span>MEDIA</span><strong>Product images</strong></div>
        {product ? (
          <div className="Ika-product-image-manager">
            {product.images.map((image) => (
              <div className={`Ika-product-image-manager-item${image.isPrimary ? " is-primary" : ""}`} key={image.id}>
                <img src={toLocalImageUrl(image.url)} alt={image.alt ?? product.name} />
                {image.isPrimary && <span className="Ika-product-image-cover-tag">Cover</span>}
                {!image.isPrimary && (
                  <button type="button" className="Ika-product-image-primary-toggle" disabled={pending} onClick={() => void setPrimaryImage(image.id)}>
                    Set as cover
                  </button>
                )}
                <button type="button" className="Ika-product-image-delete" aria-label="Delete image" disabled={pending} onClick={() => void removeImage(image.id)}>
                  <i className="fas fa-times" aria-hidden="true" />
                </button>
              </div>
            ))}
            <label className="Ika-product-image-add">
              <i className="fas fa-plus" aria-hidden="true" /><span>Add image</span>
              <input type="file" accept="image/*" disabled={pending} onChange={(event) => { void uploadImage(event.target.files?.[0]); event.currentTarget.value = ""; }} />
            </label>
          </div>
        ) : (
          <div className="Ika-product-image-manager">
            {stagedImages.map((image) => (
              <div className={`Ika-product-image-manager-item${image.id === coverImageId ? " is-primary" : ""}`} key={image.id}>
                <img src={image.previewUrl} alt={image.file.name} />
                {image.id === coverImageId ? (
                  <span className="Ika-product-image-cover-tag">Cover</span>
                ) : (
                  <button type="button" className="Ika-product-image-primary-toggle" onClick={() => setCoverImageId(image.id)}>Set as cover</button>
                )}
                <button type="button" className="Ika-product-image-delete" aria-label={`Remove ${image.file.name}`} onClick={() => removeStagedImage(image.id)}>
                  <i className="fas fa-times" aria-hidden="true" />
                </button>
              </div>
            ))}
            <label className="Ika-product-image-add">
              <i className="fas fa-plus" aria-hidden="true" /><span>Add images</span>
              <input type="file" accept="image/*" multiple disabled={pending || stagedImages.length >= 12} onChange={(event) => { selectImages(event.currentTarget.files); event.currentTarget.value = ""; }} />
            </label>
            <p className="Ika-product-pricing-hint">{stagedImages.length >= 12 ? "Maximum of 12 images reached." : "Choose a cover image. The first image is used by default."}</p>
          </div>
        )}
      </section>

      {(error || message) && <p className={error ? "Ika-product-form-error" : "Ika-product-form-success"} role={error ? "alert" : "status"}>{error || message}</p>}
      <footer className="Ika-product-editor-footer">
        <button className="Ika-product-save" type="submit" disabled={pending || categories.length === 0}>
          <i className={`fas ${pending ? "fa-spinner fa-spin" : "fa-check"}`} aria-hidden="true" />
          {pending ? "Saving…" : product ? "Save changes" : "Create product"}
        </button>
        {onSaved && <button className="Ika-product-cancel" type="button" onClick={onSaved}>Cancel</button>}
      </footer>
    </form>
  );
}