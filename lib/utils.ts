
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function imageUrlIsValid(url: string) {
  return fetch(url, { method: 'HEAD' }).then((res) => {
    if (res.ok){
      return true
    } else {
      return false
    }}).catch(() => { return false})
  }