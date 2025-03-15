"use client";
import { login } from "@/actions/auth";
import React, { useEffect } from "react";
import { Button } from "./button";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

function LoginGithubHandler() {
  setTimeout(() => {
    try {
      login("github");
    } catch (error) {
      redirect('/global-error')
    }
  }, 5000);
}

const LoginGithubBtn = async () => {

  const session = await auth();
  if (session) redirect('/overview');

  return (
    <Button
      onClick={LoginGithubHandler}
      className="gap-4 hover:cursor-pointer mt-6 bg-black rounded-md p-4 flex justify-center items-center"
    >
      Login with Github
    </Button>
  );
};

export default LoginGithubBtn;
