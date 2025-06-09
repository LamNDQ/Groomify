'use client';

import { FaPaw, FaUser, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalContacts: 0,
        totalFaqs: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [recentContacts, setRecentContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statsRes, bookingsRes, contactsRes] = await Promise.all([
                    fetch('/api/dashboard'),
                    fetch('/api/bookings?limit=5'),
                    fetch('/api/contacts?limit=5')
                ]);

                const [statsData, bookingsData, contactsData] = await Promise.all([
                    statsRes.json(),
                    bookingsRes.json(),
                    contactsRes.json()
                ]);

                if (statsData.success) {
                    setStats({
                        totalBookings: statsData.totalBookings || 0,
                        totalContacts: statsData.totalContacts || 0,
                        totalFaqs: statsData.totalFaqs || 0
                    });
                }

                setRecentBookings(bookingsData.data || []);
                setRecentContacts(contactsData.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                        {
                            label: 'Tổng đặt lịch',
                            value: stats.totalBookings?.toString() || '0',
                            color: 'bg-blue-500',
                            icon: FaCalendarAlt
                        },
                        {
                            label: 'Tổng liên hệ',
                            value: stats.totalContacts?.toString() || '0',
                            color: 'bg-green-500',
                            icon: FaPhone
                        },
                        {
                            label: 'Tổng FAQs',
                            value: stats.totalFaqs?.toString() || '0',
                            color: 'bg-purple-500',
                            icon: FaPaw
                        }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                                        <IconComponent className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activities Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Bookings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Đặt lịch gần đây</h2>
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.petName}</p>
                                        <p className="text-sm text-gray-600">{booking.service}</p>
                                        <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {booking.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Contacts */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ gần đây</h2>
                        <div className="space-y-4">
                            {recentContacts.map((contact) => (
                                <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{contact.name}</p>
                                        <p className="text-sm text-gray-600">{contact.email}</p>
                                        <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {contact.subject}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}