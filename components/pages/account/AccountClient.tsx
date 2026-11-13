"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { logoutAction } from "../../../features/auth/actions";
import {
  addCustomerAddress,
  deleteCustomerAddress,
  setDefaultCustomerAddress,
  updateCustomerPassword,
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
  const [addresses, setAddresses] = useState(account?.addresses ?? []);
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

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    setMessage("");
    setError("");
    try {
      const result = await updateCustomerPassword({
        currentPassword: formData.get("currentPassword") || undefined,
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
      });
      if (result.success) {
        setMessage(result.message);
        form.reset();
      } else setError(result.message);
    } finally {
      setPending(false);
    }
  };

  const addAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    setMessage("");
    setError("");
    try {
      const result = await addCustomerAddress({
        locationId: formData.get("locationId"),
      });
      if (result.success && result.address) {
        setAddresses((currentAddresses) => result.address.isDefault
          ? [result.address, ...currentAddresses]
          : [...currentAddresses, result.address]);
        setMessage(result.message);
        form.reset();
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
      if (result.success) {
        if (action === deleteCustomerAddress) {
          setAddresses((currentAddresses) => {
            const deletedAddress = currentAddresses.find((address) => address.id === addressId);
            const remainingAddresses = currentAddresses.filter((address) => address.id !== addressId);
            if (!deletedAddress?.isDefault || remainingAddresses.length === 0) return remainingAddresses;
            return remainingAddresses.map((address, index) => ({ ...address, isDefault: index === 0 }));
          });
        }
        setMessage(result.message);
      } else setError(result.message);
    } finally {
      setPending(false);
    }
  };

  const defaultAddress = addresses.find((address) => address.isDefault) ?? addresses[0];
  const formatOrderTotal = (minor: number, currency: string) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency }).format(minor / 100);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>CUSTOMER ACCOUNT</span><h1>Your account</h1><p>Profile, orders, and delivery addresses.</p></div>
          <button className={styles.secondary} type="button" onClick={() => void logoutAction()}>Sign out</button>
        </header>
        {(message || error) && <p className={error ? styles.error : styles.success} role={error ? "alert" : "status"}>{error || message}</p>}
        <section className={styles.overview} aria-label="Account overview">
          <article className={styles.overviewCard}>
            <span className={styles.cardLabel}>PROFILE</span>
            <h2>{account.name}</h2>
            <p>{account.phone}</p>
            {account.email && <p>{account.email}</p>}
          </article>
          <article className={styles.overviewCard}>
            <span className={styles.cardLabel}>DEFAULT LOCATION</span>
            {defaultAddress ? <>
              <h2>{defaultAddress.location.name}</h2>
              <p>{[defaultAddress.label, defaultAddress.street, defaultAddress.building, defaultAddress.apartment, defaultAddress.floor].filter(Boolean).join(", ") || "No additional address details"}</p>
            </> : <>
              <h2>No default location yet</h2>
              <Link href="#addresses-title" className={styles.textLink}>Add a delivery address</Link>
            </>}
          </article>
        </section>
        <section className={styles.section} aria-labelledby="recent-orders-title">
          <div className={styles.sectionHeading}>
            <h2 id="recent-orders-title">Recent orders</h2>
            <Link href="/orders" className={styles.primary}>View all orders</Link>
          </div>
          {account.orders.length ? <div className={styles.orderList}>
            {account.orders.map((order) => <article className={styles.orderRow} key={order.reference}>
              <div><strong>{order.reference}</strong><span>{order.locationNameSnapshot} · {order.createdAt.toLocaleDateString()}</span></div>
              <div className={styles.orderMeta}><span className={styles.orderStatus}>{order.status.replaceAll("_", " ")}</span><strong>{formatOrderTotal(order.totalMinor, order.currency)}</strong></div>
            </article>)}
          </div> : <p>No orders yet.</p>}
        </section>
        <section className={styles.section} aria-labelledby="profile-title">
          <h2 id="profile-title">Profile</h2>
          <form onSubmit={saveProfile} className={styles.form}>
            <label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} /></label>
            <label>Phone number<input value={account.phone} readOnly aria-describedby="phone-note" /></label>
            <small id="phone-note">Contact support to change your verified phone number.</small>
            {account.email && <label>Email<input value={account.email} readOnly /></label>}
            <button className={styles.primary} disabled={pending}>Save profile</button>
          </form>
        </section>
        <section className={styles.section} aria-labelledby="password-title">
          <h2 id="password-title">Change password</h2>
          <form onSubmit={changePassword} className={styles.form}>
            {account.hasPassword && <label>Current password<input name="currentPassword" type="password" autoComplete="current-password" required maxLength={128} /></label>}
            <label>New password<input name="newPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
            <label>Confirm new password<input name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
            <button className={styles.primary} disabled={pending}>Update password</button>
          </form>
        </section>
        <section className={styles.section} aria-labelledby="addresses-title">
          <h2 id="addresses-title">Delivery addresses</h2>
          {addresses.length ? addresses.map((address) => (
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
            <button className={styles.primary} disabled={pending || areas.length === 0}>{pending ? "Saving…" : "Save address"}</button>
          </form>
        </section>
      </div>
    </main>
  );
}