'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import logo from '../assets/bruinsRipoff.png'
import { Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Team', href: '/team' },
  { name: 'Community', href: '/community' },
  { name: 'Contact', href: '/contact' }
]

export default function GetNavBar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return(
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            
            {/* LEFT: Logo */}
            <div className="flex flex-1 justify-start">
                <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                    alt="Logo"
                    src={logo}
                    className="h-16 w-auto"
                />
                </a>
            </div>

            {/* CENTER: Nav Links (hidden on mobile) */}
            <div className="hidden lg:flex flex-1 justify-center gap-x-12">
                {navigation.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => 
                    `text-sm font-semibold transition duration-150 ease-in-out rounded-md px-3 py-2
                    ${isActive ? 'text-amber-500' : 'text-gray-900'}
                    hover:text-amber-500 hover:bg-gray-100hover:scale-105 active:scale-95`
                    }
                >
                    {item.name}
                </NavLink>
                ))}
            </div>

            {/* RIGHT: Mobile Menu Button (hidden on desktop) */}
            <div className="flex flex-1 justify-end lg:hidden">
                <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>
            </div>

            {/* RIGHT: Empty (shown only on desktop) */}
            <div className="hidden lg:flex flex-1 justify-end">
                {/* Can add a profile icon, cart, etc later if needed */}
            </div>

            </nav>
            <Transition show={mobileMenuOpen} as="div"> 
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>

                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/25 bg-opacity-50" />
                    <TransitionChild
                        as="div"
                        className="fixed inset-y-0 left-0 w-64 bg-white p-4
                                    transition-transform duration-500 ease-in-out
                                    data-[state=open]:translate-x-full
                                    data-[state=closed]:-translate-x-0">
                            <DialogPanel className="w-full h-full">
                                <div className="flex items-center justify-between">
                                    <a href="#">
                                        <img
                                            alt="Logo"
                                            src={logo}
                                            className="h-16 w-auto"
                                        />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}>
                                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="flex flex-col items-center space-y-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={({ isActive }) => 
                                                        `text-lg font-semibold ${isActive ? 'text-amber-500' : 'text-gray-900'}`}
                                                >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </header>

    );
}