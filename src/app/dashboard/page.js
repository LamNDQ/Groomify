'use client';

import { FaPaw } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '../components/common/Sidebar';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />
            {/* Nội dung bên phải */}
            <main className="flex-1 p-6">
                {children}
            </main>
            {/* Nút điều hướng cho thiết bị di động */}
            <div className="md:hidden fixed bottom-4 right-4">
                <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
                    <FaPaw />
                </button>
            </div>
        </div>
    );
}