'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [sortBy, setSortBy] = useState('date'); // not used yet

    const getAppointments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bookings');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAppointments().then(data => setAppointments(data));
    }, []);

    const filteredAppointments = appointments.filter(apt => {
        if (filter === 'all') return true;
        return apt.status === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-2 md:mb-0">Appointment Dashboard</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                    <option value="all">All Appointments</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </header>

            <main>
                {error && (
                    <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
                        Error: {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center text-gray-500">Loading appointments...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white shadow rounded p-4">
                                <h3 className="text-lg font-semibold">Total Appointments</h3>
                                <p className="text-xl">{appointments.length}</p>
                            </div>
                            <div className="bg-white shadow rounded p-4">
                                <h3 className="text-lg font-semibold">Pending</h3>
                                <p className="text-xl">{appointments.filter(apt => apt.status === 'pending').length}</p>
                            </div>
                            <div className="bg-white shadow rounded p-4">
                                <h3 className="text-lg font-semibold">Completed</h3>
                                <p className="text-xl">{appointments.filter(apt => apt.status === 'completed').length}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAppointments.map((appointment) => (
                                <div key={appointment.id} className="bg-white rounded shadow p-4">
                                    <h3 className="font-semibold mb-2">Appointment Details</h3>
                                    <p><strong>Pet:</strong> {appointment.petName}</p>
                                    <p><strong>Owner:</strong> {appointment.ownerName}</p>
                                    <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {appointment.time}</p>
                                    <p><strong>Service:</strong> {appointment.service}</p>
                                    <p>
                                        <strong>Status:</strong>
                                        <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${appointment.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {appointment.status}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}