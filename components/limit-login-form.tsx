import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginGithubBtn from "./ui/sigin-gitgub";



export async function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center font-Funnel p-6 pb-0">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription className="text-pretty">
            Authentication providers provide a more secure and convenient alternative to traditional passwords by eliminating the risk of password breaches and simplifying key management across devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
                <LoginGithubBtn/>
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
