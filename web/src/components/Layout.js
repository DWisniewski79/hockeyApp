import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import GetNavBar from './Navbar';


export const Layout = () => {

    return(
        <div className="min-h-screen flex flex-col">
            <GetNavBar/>
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; 2025 Happy's Hockey Club. All rights reserved.</p>
            </footer>
        </div>
    )
};
