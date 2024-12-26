// import Image from "next/image";
import {Button} from "@/components/ui/button"
import {login} from "../../../actions/auth";
import SignForm from "@/components/ui/signin-form";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (session) console.log(session)
  return (
    <div>
      <p className="text-3xl">something here</p>
        <Button>Click on</Button>
    </div>
  );
}
