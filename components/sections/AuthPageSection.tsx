"use client";

import { useActionState, useState, type FormEvent } from "react";
import Link from "next/link";
import { loginAction, registerAction, type AuthActionState } from "../../features/auth/actions";
import { useLocale } from "../i18n/LocaleProvider";
import { translate } from "../i18n/translations";
import "./AuthPage.css";

const PHONE_PATTERN = "(?:\\d(?:[\\s().-]*\\d){9}|\\+[1-9](?:[\\s().-]*\\d){7,14})";

export default function AuthPageSection({
  mode,
}: {
  mode: "login" | "register";
}) {
  const isLogin = mode === "login";
  const { locale } = useLocale();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const initialState: AuthActionState = { success: false, message: "" };
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);
  const [registerState, registerFormAction, registerPending] = useActionState(registerAction, initialState);
  const actionState = isLogin ? loginState : registerState;
  const pending = isLogin ? loginPending : registerPending;
  const actionErrorIsInline = !isLogin && ["Enter a valid phone number.", "Passwords do not match."].includes(actionState.message);

  const handleInvalid = (event: FormEvent<HTMLFormElement>) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement)) return;
    event.preventDefault();
    const message = field.validity.valueMissing
      ? "This field is required."
      : field.validity.typeMismatch
        ? "Enter a valid email address."
        : field.name === "phone" || field.validity.patternMismatch
          ? "Enter a valid phone number."
          : field.validity.tooShort
            ? "Enter at least 8 characters."
            : "Please check this field.";
    setFieldErrors((current) => ({ ...current, [field.name]: message }));
  };

  const clearFieldError = (fieldName: string) => {
    setFieldErrors((current) => {
      if (!current[fieldName]) return current;
      const next = { ...current };
      delete next[fieldName];
      return next;
    });
  };

  const getFieldError = (fieldName: string) => fieldErrors[fieldName]
    ?? (!isLogin && fieldName === "phone" && actionState.message === "Enter a valid phone number." ? actionState.message : undefined)
    ?? (!isLogin && fieldName === "confirmPassword" && actionState.message === "Passwords do not match." ? actionState.message : undefined);

  const renderFieldError = (fieldName: string) => {
    const message = getFieldError(fieldName);
    return message ? <p className="Ika-auth-field-error" id={`auth-${fieldName}-error`} role="alert">{translate(message, locale)}</p> : null;
  };

  return (
    <main className="Ika-auth-page">
      <div className="Ika-auth-shell">
        <Link className="Ika-auth-home" href="/">
          <i className="fas fa-arrow-left" aria-hidden="true" />
          <span>Back to home</span>
        </Link>

        <div className="Ika-auth-layout">
          <aside className="Ika-auth-brand" aria-label="IKA Sushi">
            <Link className="Ika-auth-logo" href="/" aria-label="IKA Sushi home">
              <img src="/white-logo.png" alt="IKA Sushi" />
            </Link>
            <div className="Ika-auth-brand-copy">
              <span className="Ika-auth-eyebrow">FRESH FROM IKA SUSHI</span>
              <h1>Good food brings us together.</h1>
              <p>Made fresh. Shared with love.</p>
            </div>
            <span className="Ika-auth-brand-number" aria-hidden="true">01 / IKA</span>
          </aside>

          <section className="Ika-auth-form-panel" aria-labelledby="Ika-auth-title">
            <div className="Ika-auth-heading">
              <span className="Ika-auth-step">{isLogin ? "MEMBER ACCESS" : "JOIN THE TABLE"}</span>
              <h2 id="Ika-auth-title">{isLogin ? "Welcome back" : "Create your account"}</h2>
              <p>
                {isLogin
                  ? "Sign in to pick up where you left off."
                  : "A few details and you’re part of the IKA community."}
              </p>
            </div>

            <form className="Ika-auth-form" action={isLogin ? loginFormAction : registerFormAction} onInvalid={handleInvalid}>
              {!isLogin && (
                <div className="Ika-auth-field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(getFieldError("name"))}
                    aria-describedby={getFieldError("name") ? "auth-name-error" : undefined}
                    onInput={() => clearFieldError("name")}
                    required
                  />
                  {renderFieldError("name")}
                </div>
              )}
              {!isLogin && (
                <div className="Ika-auth-field">
                  <label htmlFor="auth-email">Email address (optional)</label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(getFieldError("email"))}
                    aria-describedby={getFieldError("email") ? "auth-email-error" : undefined}
                    onInput={() => clearFieldError("email")}
                  />
                  {renderFieldError("email")}
                </div>
              )}
              <div className="Ika-auth-field">
                <label htmlFor="auth-identifier">{isLogin ? "Email or phone number" : "Phone number"}</label>
                <input
                  id="auth-identifier"
                  name={isLogin ? "email" : "phone"}
                  type={isLogin ? "text" : "tel"}
                  autoComplete={isLogin ? "username" : "tel"}
                  placeholder={isLogin ? "Email address or phone number" : "05 21 47 24 81"}
                  pattern={isLogin ? undefined : PHONE_PATTERN}
                  title={isLogin ? undefined : translate("Use 10 digits or an international number with country code.", locale)}
                  aria-invalid={Boolean(getFieldError(isLogin ? "email" : "phone"))}
                  aria-describedby={getFieldError(isLogin ? "email" : "phone") ? `auth-${isLogin ? "email" : "phone"}-error` : undefined}
                  onInput={() => clearFieldError(isLogin ? "email" : "phone")}
                  required
                />
                {renderFieldError(isLogin ? "email" : "phone")}
              </div>
              <div className="Ika-auth-field">
                <label htmlFor="auth-password">Password</label>
                <div className="Ika-auth-password-wrap">
                  <input
                    id="auth-password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder="Enter your password"
                    minLength={isLogin ? 1 : 8}
                    aria-invalid={Boolean(getFieldError("password"))}
                    aria-describedby={getFieldError("password") ? "auth-password-error" : undefined}
                    onInput={() => clearFieldError("password")}
                    required
                  />
                  <button
                    className="Ika-auth-password-toggle"
                    type="button"
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                    aria-pressed={passwordVisible}
                    onClick={() => setPasswordVisible((visible) => !visible)}
                  >
                    <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                </div>
                {renderFieldError("password")}
              </div>
              {!isLogin && (
                <div className="Ika-auth-field">
                  <label htmlFor="auth-confirm-password">Confirm password</label>
                  <div className="Ika-auth-password-wrap">
                    <input
                      id="auth-confirm-password"
                      name="confirmPassword"
                      type={confirmPasswordVisible ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter your password again"
                      minLength={8}
                      aria-invalid={Boolean(getFieldError("confirmPassword"))}
                      aria-describedby={getFieldError("confirmPassword") ? "auth-confirmPassword-error" : undefined}
                      onInput={() => clearFieldError("confirmPassword")}
                      required
                    />
                    <button
                      className="Ika-auth-password-toggle"
                      type="button"
                      aria-label={confirmPasswordVisible ? "Hide confirmation password" : "Show confirmation password"}
                      aria-pressed={confirmPasswordVisible}
                      onClick={() => setConfirmPasswordVisible((visible) => !visible)}
                    >
                      <i className={`fas ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                    </button>
                  </div>
                  {renderFieldError("confirmPassword")}
                </div>
              )}
              {actionState.message && !actionErrorIsInline && (
                <p role="alert" aria-live="polite">{actionState.message}</p>
              )}
              <button className="Ika-auth-submit" type="submit" disabled={pending}>
                <span>{pending ? "Please wait..." : isLogin ? "Sign in" : "Create account"}</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}