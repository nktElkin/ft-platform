import { cn, getSession } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginGithubBtn from "./ui/sigin-gitgub";
import { redirect } from "next/navigation";


export async function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const session = await getSession();
  if (session) redirect("/overview");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center font-Funnel">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription className="text-pretty">
            Authentication providers provide a more secure and convenient alternative to traditional passwords by eliminating the risk of password breaches and simplifying key management across devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <LoginGithubBtn/>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?<br />
                Contact your administrator.
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our Terms of Service{" "}
        and Privacy Policy.
      </div>
    </div>
  );
}
