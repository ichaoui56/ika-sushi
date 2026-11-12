"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { Prisma, UserRole } from "@prisma/client";
import { signIn, signOut } from "../../auth";
import { prisma } from "../../lib/prisma";
import { clearLoginAttempts, consumeLoginAttempt } from "../../lib/auth/rate-limit";
import { hashPassword } from "../../lib/auth/password";
import { loginSchema, normalizePhoneNumber, registerSchema } from "./schemas";

export interface AuthActionState {
  success: boolean;
  message: string;
}

const INVALID_CREDENTIALS = "Email, phone number, or password is incorrect.";

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    identifier: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { success: false, message: INVALID_CREDENTIALS };

  const identifier = parsed.data.identifier.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: identifier.includes("@")
      ? { email: { equals: identifier, mode: "insensitive" } }
      : { normalizedPhone: normalizePhoneNumber(identifier) },
    select: { role: true },
  });
  const redirectTo =
    user?.role === UserRole.ADMIN || user?.role === UserRole.EMPLOYEE
      ? "/admin/dashboard"
      : user?.role === UserRole.DELIVERY
        ? "/delivery"
        : "/orders";

  try {
    await signIn("credentials", {
      email: identifier,
      password: parsed.data.password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: INVALID_CREDENTIALS };
    }
    throw error;
  }

  redirect(redirectTo);
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const normalizedPhone = normalizePhoneNumber(parsed.data.phone);
  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
    return { success: false, message: "Enter a valid phone number." };
  }
  if (!(await consumeLoginAttempt(normalizedPhone))) {
    return { success: false, message: "Unable to create an account right now. Please try again later." };
  }

  let userId: string;
  try {
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        normalizedPhone,
        email: parsed.data.email || null,
        passwordHash: await hashPassword(parsed.data.password),
        role: UserRole.CUSTOMER,
      },
      select: { id: true },
    });
    userId = user.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, message: "Unable to create an account with those details." };
    }
    throw error;
  }

  await clearLoginAttempts(normalizedPhone);
  await signIn("credentials", {
    email: normalizedPhone,
    password: parsed.data.password,
    redirectTo: "/orders",
  });
  redirect("/orders");
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}