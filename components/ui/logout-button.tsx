"use client";
import { logout } from "@/actions/auth";
import { Button } from "./button";

const Logout = ()=> {
  return (
    <Button variant='outline' className="" onClick={() => logout()}>
        Logout
    </Button>
  );
};

export default Logout;