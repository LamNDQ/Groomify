'use client';

import { FaHome, FaPaw, FaCalendarAlt, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            href: '/dashboard',
            icon: FaHome,
            label: 'Dashboard',
        },
        {
            href: '/dashboard/bookings',
            icon: FaCalendarAlt,
            label: 'Bookings',
        },
        {
            href: '/dashboard/faqs',
            icon: FaQuestionCircle,
            label: 'FAQs Management',
        },
        {
            href: '/dashboard/contacts',
            icon: FaPhone,
            label: 'Contact',
        },
    ];

    return (
        <aside className="fixed md:static z-10 w-64 bg-white border-r border-gray-200 p-6 hidden md:block h-screen">
            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-3 mb-8"
            >
                <div className="p-2 rounded-full bg-[var(--first-color)]">
                    <FaPaw className="text-white text-2xl" />
                </div>
                <span className="text-xl font-bold text-gray-800">Groomify</span>
            </Link>

            {/* Navigation */}
            <nav className="space-y-2">
                {menuItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-[var(--first-color)] text-white font-semibold shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--first-color)]'
                                }`}
                        >
                            <Icon
                                className={`text-lg transition-colors duration-200 ${isActive ? 'text-white' : 'group-hover:text-[var(--first-color)]'}`}
                            />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
