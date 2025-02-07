// pages/signin.tsx

import LoginGithub from "@/components/ui/sigin-gitgub";

export default function SignIn() {
  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="p-8 bg-white rounded shadow-md">
    //     <h1 className="text-2xl mb-4">Sign In</h1>
    //     <form>
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className="w-full mb-4 p-2 border rounded"
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className="w-full mb-4 p-2 border rounded"
    //       />
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white p-2 rounded"
    //       >
    //         Sign In
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="flex flex-col justify-center mt-14 h-full">
      <LoginGithub />
    </div>
  );
}
