"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { logoutAction } from "../../../features/auth/actions";
import {
  addCustomerAddress,
  deleteCustomerAddress,
  setDefaultCustomerAddress,
  updateCustomerProfile,
} from "../../../features/customers/actions";
import type { getCustomerAccount } from "../../../features/customers/queries";
import styles from "./Account.module.css";

type AccountData = NonNullable<Awaited<ReturnType<typeof getCustomerAccount>>>;
type DeliveryArea = { id: string; name: string };

export default function AccountClient({
  account,
  areas,
}: {
  account: AccountData | null;
  areas: DeliveryArea[];
}) {
  const [name, setName] = useState(account?.name ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (!account) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <span className={styles.eyebrow}>CUSTOMER ACCOUNT</span>
          <h1>Sign in to your account</h1>
          <p>Access your order history and saved delivery addresses.</p>
          <Link className={styles.primary} href="/login">Sign in</Link>
        </div>
      </main>
    );
  }

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage("");
    setError("");
    try {
      const result = await updateCustomerProfile({ name });
      if (result.success) setMessage(result.message);
      else setError(result.message);
    } finally {
      setPending(false);
    }
  };

  const addAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPending(true);
    setMessage("");
    setError("");
    try {
      const result = await addCustomerAddress({
        locationId: formData.get("locationId"),
        label: formData.get("label"),
        street: formData.get("street"),
        building: formData.get("building"),
        apartment: formData.get("apartment"),
        floor: formData.get("floor"),
        instructions: formData.get("instructions"),
      });
      if (result.success) {
        setMessage(result.message);
        event.currentTarget.reset();
        window.location.reload();
      } else setError(result.message);
    } finally {
      setPending(false);
    }
  };

  const runAddressAction = async (action: (addressId: string) => Promise<{ success: boolean; message: string }>, addressId: string) => {
    setPending(true);
    setMessage("");
    setError("");
    try {
      const result = await action(addressId);
      if (result.success) window.location.reload();
      else setError(result.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>CUSTOMER ACCOUNT</span><h1>Your account</h1><p>Profile, orders, and delivery addresses.</p></div>
          <button className={styles.secondary} type="button" onClick={() => void logoutAction()}>Sign out</button>
        </header>
        {(message || error) && <p className={error ? styles.error : styles.success} role={error ? "alert" : "status"}>{error || message}</p>}
        <section className={styles.section} aria-labelledby="profile-title">
          <h2 id="profile-title">Profile</h2>
          <form onSubmit={saveProfile} className={styles.form}>
            <label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} /></label>
            <label>Phone number<input value={account.phone} readOnly aria-describedby="phone-note" /></label>
            <small id="phone-note">Contact support to change your verified phone number.</small>
            {account.email && <label>Email<input value={account.email} readOnly /></label>}
            <button className={styles.primary} disabled={pending}>Save profile</button>
          </form>
          <Link href="/orders" className={styles.textLink}>View order history</Link>
        </section>
        <section className={styles.section} aria-labelledby="addresses-title">
          <h2 id="addresses-title">Delivery addresses</h2>
          {account.addresses.length ? account.addresses.map((address) => (
            <article className={styles.address} key={address.id}>
              <div><strong>{address.label || address.location.name}</strong>{address.isDefault && <span className={styles.defaultBadge}>DEFAULT</span>}<p>{[address.location.name, address.street, address.building, address.apartment, address.floor].filter(Boolean).join(", ")}</p>{address.instructions && <small>{address.instructions}</small>}</div>
              <div className={styles.actions}>
                {!address.isDefault && <button type="button" disabled={pending} onClick={() => void runAddressAction(setDefaultCustomerAddress, address.id)}>Make default</button>}
                <button type="button" disabled={pending} onClick={() => void runAddressAction(deleteCustomerAddress, address.id)}>Delete</button>
              </div>
            </article>
          )) : <p>No saved delivery addresses yet.</p>}
          <form onSubmit={addAddress} className={styles.form}>
            <h3>Add an address</h3>
            <label>Delivery area<select name="locationId" required defaultValue=""><option value="" disabled>Choose an available area</option>{areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}</select></label>
            <label>Label<input name="label" placeholder="Home, work..." maxLength={80} /></label>
            <label>Street<input name="street" maxLength={180} /></label>
            <div className={styles.grid}><label>Building<input name="building" maxLength={80} /></label><label>Apartment<input name="apartment" maxLength={80} /></label><label>Floor<input name="floor" maxLength={40} /></label></div>
            <label>Delivery instructions<textarea name="instructions" rows={3} maxLength={1000} /></label>
            <button className={styles.primary} disabled={pending || areas.length === 0}>Save address</button>
          </form>
        </section>
      </div>
    </main>
  );
}