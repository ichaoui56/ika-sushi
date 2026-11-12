"use client";

import type { ProductTranslations } from "../../features/products/translations";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface StoreProduct {
  id: string;
  name: string;
  translations?: ProductTranslations;
  price: number;
  image: string;
  quantity: number;
}

interface StoreData {
  cart: StoreProduct[];
  wishlist: StoreProduct[];
}

interface EncryptedStore {
  version: 1;
  iv: string;
  ciphertext: string;
}

interface StoreContextValue extends StoreData {
  ready: boolean;
  error: string | null;
  cartCount: number;
  wishlistCount: number;
  addToCart: (product: StoreProduct) => Promise<void>;
  toggleWishlist: (product: StoreProduct) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  setCartQuantity: (id: string, quantity: number) => Promise<void>;
}

const STORE_KEY = "Ika-encrypted-store-v1";
const DATABASE_NAME = "Ika-encryption";
const KEY_NAME = "store-key-v1";
const EMPTY_STORE: StoreData = { cart: [], wishlist: [] };
const StoreContext = createContext<StoreContextValue | null>(null);

let encryptionKeyPromise: Promise<CryptoKey> | undefined;

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
  });
}

async function getEncryptionKey(): Promise<CryptoKey> {
  encryptionKeyPromise ??= new Promise<CryptoKey>((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("keys");
    };
    request.onerror = () => reject(request.error ?? new Error("Unable to open the local encryption key store."));
    request.onsuccess = async () => {
      const database = request.result;
      try {
        const readTransaction = database.transaction("keys", "readonly");
        const existingKey = await requestResult(
          readTransaction.objectStore("keys").get(KEY_NAME),
        );
        if (existingKey) {
          database.close();
          resolve(existingKey as CryptoKey);
          return;
        }

        const generatedKey = await crypto.subtle.generateKey(
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt", "decrypt"],
        );
        const writeTransaction = database.transaction("keys", "readwrite");
        writeTransaction.objectStore("keys").put(generatedKey, KEY_NAME);
        writeTransaction.oncomplete = () => {
          database.close();
          resolve(generatedKey);
        };
        writeTransaction.onerror = () => {
          database.close();
          reject(writeTransaction.error ?? new Error("Unable to save the local encryption key."));
        };
      } catch (error) {
        database.close();
        reject(error);
      }
    };
  }).catch((error: unknown) => {
    encryptionKeyPromise = undefined;
    throw error;
  });

  return encryptionKeyPromise;
}

function encodeBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

async function writeStore(data: StoreData): Promise<void> {
  const key = await getEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: toArrayBuffer(iv) },
    key,
    toArrayBuffer(encoded),
  );
  const payload: EncryptedStore = {
    version: 1,
    iv: encodeBase64(iv),
    ciphertext: encodeBase64(new Uint8Array(ciphertext)),
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(payload));
}

async function readStore(): Promise<StoreData> {
  const stored = localStorage.getItem(STORE_KEY);
  if (!stored) return EMPTY_STORE;

  const payload = JSON.parse(stored) as EncryptedStore;
  if (payload.version !== 1 || !payload.iv || !payload.ciphertext) {
    throw new Error("The saved cart and wishlist data has an unsupported format.");
  }

  const key = await getEncryptionKey();
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: toArrayBuffer(decodeBase64(payload.iv)) },
    key,
    toArrayBuffer(decodeBase64(payload.ciphertext)),
  );
  const data = JSON.parse(new TextDecoder().decode(plaintext)) as StoreData;
  if (!Array.isArray(data.cart) || !Array.isArray(data.wishlist)) {
    throw new Error("The saved cart and wishlist data is invalid.");
  }
  return data;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unable to access the saved cart and wishlist.";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(EMPTY_STORE);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dataRef = useRef(data);
  const writeQueue = useRef(Promise.resolve());

  useEffect(() => {
    let active = true;
    void readStore()
      .then((savedData) => {
        if (!active) return;
        dataRef.current = savedData;
        setData(savedData);
        setReady(true);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(getErrorMessage(loadError));
        setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const updateStore = useCallback(
    (update: (current: StoreData) => StoreData): Promise<void> => {
      const operation = writeQueue.current.then(async () => {
        if (!ready) throw new Error("Your saved cart is still loading. Please try again.");
        const updatedData = update(dataRef.current);
        await writeStore(updatedData);
        dataRef.current = updatedData;
        setData(updatedData);
        setError(null);
      });
      writeQueue.current = operation.catch((writeError: unknown) => {
        setError(getErrorMessage(writeError));
      });
      return operation;
    },
    [ready],
  );

  const addToCart = useCallback(
    (product: StoreProduct) =>
      updateStore((current) => {
        const existing = current.cart.find((item) => item.id === product.id);
        return {
          ...current,
          cart: existing
            ? current.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item,
              )
            : [...current.cart, product],
        };
      }),
    [updateStore],
  );

  const toggleWishlist = useCallback(
    (product: StoreProduct) =>
      updateStore((current) => ({
        ...current,
        wishlist: current.wishlist.some((item) => item.id === product.id)
          ? current.wishlist.filter((item) => item.id !== product.id)
          : [...current.wishlist, { ...product, quantity: 1 }],
      })),
    [updateStore],
  );

  const removeFromCart = useCallback(
    (id: string) =>
      updateStore((current) => ({
        ...current,
        cart: current.cart.filter((item) => item.id !== id),
      })),
    [updateStore],
  );

  const removeFromWishlist = useCallback(
    (id: string) =>
      updateStore((current) => ({
        ...current,
        wishlist: current.wishlist.filter((item) => item.id !== id),
      })),
    [updateStore],
  );

  const setCartQuantity = useCallback(
    (id: string, quantity: number) =>
      updateStore((current) => ({
        ...current,
        cart:
          quantity < 1
            ? current.cart.filter((item) => item.id !== id)
            : current.cart.map((item) =>
                item.id === id ? { ...item, quantity } : item,
              ),
      })),
    [updateStore],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ...data,
      ready,
      error,
      cartCount: data.cart.reduce((total, item) => total + item.quantity, 0),
      wishlistCount: data.wishlist.length,
      addToCart,
      toggleWishlist,
      removeFromCart,
      removeFromWishlist,
      setCartQuantity,
    }),
    [
      data,
      ready,
      error,
      addToCart,
      toggleWishlist,
      removeFromCart,
      removeFromWishlist,
      setCartQuantity,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider.");
  return store;
}
