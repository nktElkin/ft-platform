"use client";
import { logout } from "@/actions/auth";
import { Button } from "./button";

const LogoutBtn = ({ className }: { className?: string }) => {
  return (
    <Button
      tabIndex={0}
      type="button"
      role="button"
      aria-label="Logout from account"
      variant="outline"
      className={className}
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
