import React, { Suspense } from "react";
import { Sidebar } from "./_components/Sidebar";
import { Navbar } from "./_components/Navbar";
import NavigationBreadcrumbs from "./(routes)/tutor/edit-course/[courseId]/_components/navigation-breadcrumb";
import type { Metadata } from "next";
import { getSession } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "platform",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const {session, currentUser} = await getSession();
  if (!session) redirect('/login');

  return (
    <div className="h-full flex flex-col min-w-80">
      <Navbar />
      <Sidebar />
      <div className="h-full md:pl-48 *:wrapper" role="main">
        <NavigationBreadcrumbs />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
