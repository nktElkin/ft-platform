import { auth } from "@/auth";
import { LoginForm } from "@/components/limit-login-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page() {

  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>);
}
