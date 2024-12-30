import React from 'react';
import { Sidebar } from './_components/Sidebar';
import { Navbar } from './_components/Navbar';

const DashboardLayout = ({
    children }: {
        children: React.ReactNode;
    }) => {
    return (
        <div className='h-full flex flex-col'>
            <Navbar />
            <Sidebar />
            <main className='h-full md:pl-48 *:wrapper' role="main">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
