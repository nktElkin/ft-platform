import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-gray-600" : ""
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {pending ? "Loading..." : "Sign in"}
    </Button>
  );
};

export default AuthButton;