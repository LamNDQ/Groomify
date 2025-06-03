import { useState } from "react";
import Button from "../components/shared/Button";
import Link from "next/link";
import { FaPaw, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="fixed top-0 left-0 w-full bg-white bg-opacity-30 backdrop-blur-sm shadow-md z-50">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="rounded-full p-2 bg-[var(--first-color)]">
                        <FaPaw className="text-2xl text-white" />
                    </div>
                    <span className="text-xl font-semibold">Groomify</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <a href="#about-us" className="hover:underline">About</a>
                    <a href="#services" className="hover:underline">Services</a>
                    <a href="#packages" className="hover:underline">Packages</a>
                    <a href="#gallery" className="hover:underline">Gallery</a>
                    <a href="#faqs" className="hover:underline">FAQs</a>
                </div>

                {/* Buttons Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/auth/login" className="hover:underline">Log in</Link>
                    <Button text="Book Now" href="#book" className="inline-block" />
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Menu Toggle">
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-4">
                    <a href="#about-us" className="block">About</a>
                    <a href="#services" className="block">Services</a>
                    <a href="#packages" className="block">Packages</a>
                    <a href="#gallery" className="block">Gallery</a>
                    <a href="#faqs" className="block">FAQs</a>
                    <hr className="my-2" />
                    <Link href="/auth/login" className="block">Log in</Link>
                    <Button text="Book Now" href="#book" className="w-full" />
                </div>
            )}
        </header>
    );
}
