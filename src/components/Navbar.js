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

    const renderNavLinks = (linkClassName) => (
        navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `${linkClassName} ${isActive ? 'text-amber-500' : 'text-gray-900'}`
            }
          >
            {item.name}
          </NavLink>
        ))
      );
      

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
                {renderNavLinks('text-sm font-semibold transition duration-150 ease-in-out rounded-md px-3 py-2 hover:text-amber-500 hover:bg-gray-100 hover:scale-105 active:scale-95')}
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
            
            {/* Mobile menu, show/hide based on menu state */}
            <Transition appear show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
                    {/* Background overlay */}
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-75"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-75"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm
                        transition-opacity duration-300 ease-in-out
                        data-[state=open]:opacity-100
                        data-[state=closed]:opacity-0" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-start">
                            {/* Menu panel */}
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="ease-in duration-200 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <DialogPanel className="fixed inset-y-0 left-0 w-64 overflow-y-auto bg-white px-6 py-6">
                                    <div className="flex items-center justify-between">
                                        <a href="#" className="-m-1.5 p-1.5">
                                            <img
                                                alt="Logo"
                                                src={logo}
                                                className="h-16 w-auto"
                                            />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-6 flow-root">
                                        <div className="flex flex-col space-y-4">
                                            {renderNavLinks('text-lg font-semibold transition duration-150 ease-in-out rounded-md px-3 py-2 text-lg font-semibold transition-all duration-150 ease-in-out hover:bg-gray-100 hover:text-amber-500 active:scale-95')}
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </header>

    );
}