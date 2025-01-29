import React from 'react';
import { Sidebar } from './_components/Sidebar';
import { Navbar } from './_components/Navbar';
import NavigationBreadcrumbs from './(routes)/tutor/edit-course/[courseId]/_components/navigation-breadcrumb';

const DashboardLayout = ({
    children }: {
        children: React.ReactNode;
    }) => {
    return (
        <div className='h-full flex flex-col min-w-80'>
            <Navbar />
            <Sidebar />
            <main className='h-full md:pl-48 *:wrapper' role="main">
            <NavigationBreadcrumbs/>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
