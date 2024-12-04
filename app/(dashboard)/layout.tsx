import React from 'react';
import { Sidebar } from './_components/Sidebar';
import { Navbar } from './_components/Navbar';

const DashboardLayout = ({
    children }:{
        children: React.ReactNode; 
}) => {
    return (
        <div className='h-full'>
            <Navbar/>
        <Sidebar/>
        <main className='h-full md:pl-48' role="main">
            {children}
        </main>
    </div>
    );
};

export default DashboardLayout;
