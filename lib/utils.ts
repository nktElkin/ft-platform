import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";
import { auth } from "@/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function imageUrlIsValid(url: string | null | undefined) {
  if (!url) return false;
  return fetch(url, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
}

export async function getSession() {
  const session = await auth();
  const currentUser = await db.user.findUnique({
    where: { email: session?.user?.email || "" },
  });
  return { session, currentUser };
}

export async function hasPersmissionToEdit(creatorId: string | null) {
  const { currentUser } = await getSession();
  if (currentUser?.role === "ROOT") return true;
  if (currentUser?.role === "TUTOR" && currentUser?.id === creatorId)
    return true;
  return false;
}

export function generateId() {
  const id = Date.now() * Math.floor(Math.random() * 100);
  return id;
}
