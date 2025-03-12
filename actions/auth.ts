"use server";

import { auth, signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// login via provider success? -> redirect to welcome page
export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/overview" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
