"use client";

import { useState } from "react";
import Link from "next/link";
import "./AuthPage.css";

export default function AuthPageSection({
  mode,
}: {
  mode: "login" | "register";
}) {
  const isLogin = mode === "login";
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <main className="foodu-auth-page">
      <div className="foodu-auth-shell">
        <Link className="foodu-auth-home" href="/">
          <i className="fas fa-arrow-left" aria-hidden="true" />
          <span>Back to home</span>
        </Link>

        <div className="foodu-auth-layout">
          <aside className="foodu-auth-brand" aria-label="IKA Sushi">
            <Link className="foodu-auth-logo" href="/" aria-label="IKA Sushi home">
              <img src="/white-logo.png" alt="IKA Sushi" />
            </Link>
            <div className="foodu-auth-brand-copy">
              <span className="foodu-auth-eyebrow">FRESH FROM IKA SUSHI</span>
              <h1>Good food brings us together.</h1>
              <p>Made fresh. Shared with love.</p>
            </div>
            <span className="foodu-auth-brand-number" aria-hidden="true">01 / IKA</span>
          </aside>

          <section className="foodu-auth-form-panel" aria-labelledby="foodu-auth-title">
            <div className="foodu-auth-heading">
              <span className="foodu-auth-step">{isLogin ? "MEMBER ACCESS" : "JOIN THE TABLE"}</span>
              <h2 id="foodu-auth-title">{isLogin ? "Welcome back" : "Create your account"}</h2>
              <p>
                {isLogin
                  ? "Sign in to pick up where you left off."
                  : "A few details and you’re part of the IKA community."}
              </p>
            </div>

            <form className="foodu-auth-form" action="#">
              {!isLogin && (
                <div className="foodu-auth-field">
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
              <div className="foodu-auth-field">
                <label htmlFor="auth-email">Email address</label>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="foodu-auth-field">
                <label htmlFor="auth-password">Password</label>
                <div className="foodu-auth-password-wrap">
                  <input
                    id="auth-password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder="Enter your password"
                    minLength={8}
                    required
                  />
                  <button
                    className="foodu-auth-password-toggle"
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
                <div className="foodu-auth-field">
                  <label htmlFor="auth-confirm-password">Confirm password</label>
                  <div className="foodu-auth-password-wrap">
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
                      className="foodu-auth-password-toggle"
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
              <button className="foodu-auth-submit" type="submit">
                <span>{isLogin ? "Sign in" : "Create account"}</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </form>

            <p className="foodu-auth-switch">
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