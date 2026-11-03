"use client";

import { useEffect, useState } from "react";

interface FeedbackMessage {
  id: number;
  action: "cart" | "wishlist" | "error";
  message: string;
}

export function StoreFeedback() {
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  useEffect(() => {
    const handleFeedback = (event: Event) => {
      const { action, message: text } = (event as CustomEvent<Omit<FeedbackMessage, "id">>).detail;
      setMessage({ action, message: text, id: Date.now() });
    };
    window.addEventListener("foodu:store-feedback", handleFeedback);
    return () => window.removeEventListener("foodu:store-feedback", handleFeedback);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  const isError = message.action === "error";
  return (
    <div
      key={message.id}
      className={`foodu-toast${isError ? " is-error" : ""}`}
      role={isError ? "alert" : "status"}
      aria-live="polite"
    >
      <span className="foodu-toast-icon" aria-hidden="true">
        <i className={isError ? "fas fa-exclamation" : message.action === "cart" ? "fas fa-shopping-bag" : "fas fa-heart"} />
      </span>
      <span>{message.message}</span>
    </div>
  );
}
