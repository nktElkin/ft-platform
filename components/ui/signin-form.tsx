"use client";

import { login, logout } from "@/actions/auth";
import { Button } from "./button";
import { useState } from "react";

interface SignFormProps {
  target: "signin" | "signout";
}

const SignForm = ({ target }: SignFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (action: "github" | "credentials") => {
    try {
      setIsLoading(true);
      if (action === "github") {
        await login("github");
      }
      // Add credentials login logic here
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {target === "signin" ? (
        <>
          <Button onClick={() => handleAuth("credentials")}>
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
          <Button
            onClick={() => handleAuth("github")}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? "Loading..." : "Sign in with Github"}
          </Button>
        </>
      ) : (
        <Button onClick={handleLogout} disabled={isLoading} variant="ghost">
          {isLoading ? "Loading..." : "Sign out"}
        </Button>
      )}
    </div>
  );
};

export default SignForm;
