

import { useState, useEffect } from 'react';
import Button from "../components/shared/Button";
import Link from "next/link";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import BookingModal from "../components/modals/BookingModal";



export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/auth/login';
    };

    return (
        <header id="header" className="fixed bg-opacity-30 backdrop-blur-sm z-1 w-full mx-auto p-2 bg-white shadow-md z-50">
            <nav className="mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="rounded-full p-2 bg-[var(--first-color)]">
                        <FaPaw className="text-2xl text-white" />
                    </div>
                    <span className="text-xl font-semibold">Groomify</span>
                </div>

                {/* Nav Links */}
                <div className="flex space-x-6">
                    <a href="#about-us" className="hover:underline">About</a>
                    <a href="#services" className="hover:underline">Services</a>
                    <a href="#packages" className="hover:underline">Packages</a>
                    <a href="#gallery" className="hover:underline">Gallery</a>
                    <a href="#faqs" className="hover:underline">FAQs</a>
                </div>

                {/* Log in/Book */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-700">Welcome, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-orange-500 hover:text-orange-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="hover:underline">
                                Log in
                            </Link>
                            <Button
                                text="Book Now"
                                href="#book"
                                className="button inline-block"
                            />
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}