"use client";
import { login } from "@/actions/auth";
import React from "react";
import { Button } from "./button";

function LoginGithubHandler() {
  try {
    login("github");
  } catch (error) {
    console.log("githubBtn", error);
  }
}

const LoginGithubBtn = () => {
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
