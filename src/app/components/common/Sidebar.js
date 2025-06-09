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
            active: pathname === '/dashboard'
        },
        {
            href: '/dashboard/bookings',
            icon: FaCalendarAlt,
            label: 'Bookings',
            active: pathname === '/dashboard/bookings'
        },
        {
            href: '/dashboard/faqs',
            icon: FaQuestionCircle,
            label: 'FAQs Management',
            active: pathname === '/dashboard/faqs'
        },
        {
            href: '/dashboard/contacts',
            icon: FaPhone,
            label: 'Contact',
            active: pathname === '/dashboard/contacts'
        },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
            {/* Logo */}
            <Link
                href="/"
                className="text-xl font-bold text-primary flex items-center gap-2 mb-6">
                <div className="rounded-full p-2 bg-[var(--first-color)]">
                    <FaPaw className="text-2xl text-white" />
                </div>
                <span className="text-xl font-semibold">Groomify</span>
            </Link>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${item.active
                                ? 'bg-[var(--first-color)] text-white font-semibold'
                                : 'text-gray-700 hover:text-[var(--first-color)] hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="text-lg" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}