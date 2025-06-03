'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useState('all');

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
        getAppointments().then((data) => setAppointments(data));
    }, []);

    const filteredAppointments = appointments.filter((apt) =>
        filter === 'all' ? true : apt.status === filter
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">📋 Appointment Dashboard</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Appointments</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </header>

            <main>
                {error && (
                    <div className="text-red-700 bg-red-100 p-4 rounded mb-6 border border-red-200">
                        ⚠️ Error: {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center text-gray-500 py-12 text-lg">Loading appointments...</div>
                ) : (
                    <>
                        {/* Summary cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                                <h3 className="text-gray-600 mb-1">Total Appointments</h3>
                                <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                                <h3 className="text-gray-600 mb-1">Pending</h3>
                                <p className="text-2xl font-bold text-yellow-500">
                                    {appointments.filter((apt) => apt.status === 'pending').length}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                                <h3 className="text-gray-600 mb-1">Completed</h3>
                                <p className="text-2xl font-bold text-green-600">
                                    {appointments.filter((apt) => apt.status === 'completed').length}
                                </p>
                            </div>
                        </div>

                        {/* Appointment cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAppointments.length === 0 ? (
                                <p className="col-span-full text-gray-500 text-center">
                                    No appointments found for selected filter.
                                </p>
                            ) : (
                                filteredAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className={`bg-white rounded-xl p-5 shadow-md border-t-4 ${appointment.status === 'pending'
                                                ? 'border-yellow-400'
                                                : 'border-green-500'
                                            }`}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {appointment.petName}'s Appointment
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Owner:</strong> {appointment.ownerName}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Date:</strong>{' '}
                                            {new Date(appointment.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Time:</strong> {appointment.time}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Service:</strong> {appointment.service}
                                        </p>
                                        <p className="text-sm mt-2">
                                            <strong>Status:</strong>{' '}
                                            <span
                                                className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${appointment.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
