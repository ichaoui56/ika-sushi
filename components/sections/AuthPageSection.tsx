"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction, registerAction, type AuthActionState } from "../../features/auth/actions";
import "./AuthPage.css";

export default function AuthPageSection({
  mode,
}: {
  mode: "login" | "register";
}) {
  const isLogin = mode === "login";
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const initialState: AuthActionState = { success: false, message: "" };
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);
  const [registerState, registerFormAction, registerPending] = useActionState(registerAction, initialState);
  const actionState = isLogin ? loginState : registerState;
  const pending = isLogin ? loginPending : registerPending;

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

            <form className="Ika-auth-form" action={isLogin ? loginFormAction : registerFormAction}>
              {!isLogin && (
                <div className="Ika-auth-field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
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
                  />
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
                  required
                />
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
                </div>
              )}
              {actionState.message && (
                <p role="alert" aria-live="polite">{actionState.message}</p>
              )}
              <button className="Ika-auth-submit" type="submit" disabled={pending}>
                <span>{pending ? "Please wait..." : isLogin ? "Sign in" : "Create account"}</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </form>

            <p className="Ika-auth-switch">
              {isLogin ? "New to IKA Sushi?" : "Already have an account?"}{" "}
              <Link href={isLogin ? "/register" : "/login"}>
                {isLogin ? "Create an account" : "Sign in"}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}