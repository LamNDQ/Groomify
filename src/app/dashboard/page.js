'use client';

import { FaPaw, FaUser, FaClock, FaCheck, FaCheckDouble, FaTimes, FaCalendarAlt, FaPhone } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalContacts: 0,
        totalFaqs: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [recentContacts, setRecentContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/dashboard');
                const data = await response.json();

                if (data.success) {
                    const { bookings, recentContacts, stats: dashboardStats } = data.data;

                    setStats({
                        totalBookings: dashboardStats.totalBookings,
                        totalContacts: dashboardStats.totalContacts,
                        totalFaqs: dashboardStats.totalFaqs,
                    });

                    setRecentBookings(bookings);
                    setRecentContacts(recentContacts);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED': return 'bg-green-100 text-green-800';
            case 'COMPLETED': return 'bg-blue-100 text-blue-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING': return 'pending';
            case 'CONFIRMED': return 'confirmed';
            case 'COMPLETED': return 'completed';
            case 'CANCELLED': return 'cancelled';
            default: return status;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--first-color)]"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {[
                        {
                            label: 'Total Bookings',
                            value: stats.totalBookings,
                            color: 'bg-blue-500',
                            icon: FaCalendarAlt
                        },
                        {
                            label: 'Total Contacts',
                            value: stats.totalContacts,
                            color: 'bg-green-500',
                            icon: FaPhone
                        },
                        {
                            label: 'Total FAQs',
                            value: stats.totalFaqs,
                            color: 'bg-purple-500',
                            icon: FaPaw
                        }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                                <div className="flex items-center">
                                    <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                                        <IconComponent className="text-white text-2xl" />
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bookings Section */}
                    <div className="bg-white rounded-xl shadow p-5">
                        {/* Recent Bookings List */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Bookings</h2>
                        <div className="space-y-4">
                            {recentBookings.length === 0 ? (
                                <p className="text-gray-500 text-sm">No bookings available.</p>
                            ) : (
                                recentBookings.map((booking) => (
                                    <div key={booking.id}
                                        className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                        <div>
                                            <p className="font-medium text-gray-900">{booking.petName}</p>
                                            <p className="text-sm text-gray-600">{booking.service}</p>
                                            <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                            {getStatusText(booking.status)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Contacts Section */}
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Contacts</h2>
                        <div className="space-y-4">
                            {recentContacts.length === 0 ? (
                                <p className="text-gray-500 text-sm">No contacts available.</p>
                            ) : (
                                recentContacts.map((contact) => (
                                    <div key={contact.id}
                                        className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                        <div>
                                            <p className="font-medium text-gray-900">{contact.name}</p>
                                            <p className="text-sm text-gray-600">{contact.email}</p>
                                            <p className="text-sm text-gray-600">{contact.message}</p>
                                            <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 max-w-[40%] text-right">
                                            {contact.subject}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
