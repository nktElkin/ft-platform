'use server'

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "platform",
  };

const PublicLayout = async () => ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full flex flex-col min-w-80">
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
        </div>
    );
  };
 
export default PublicLayout;