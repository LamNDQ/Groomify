'use client';

import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');

    const getAppointments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bookings');

            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }

            const { data } = await response.json();
            if (Array.isArray(data)) {
                setAppointments(data);
            } else {
                setAppointments([]);
            }

        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAppointments();
        const interval = setInterval(getAppointments, 30000);
        return () => clearInterval(interval);
    }, []);

    const deleteAppointment = async (id) => {
        if (!confirm('Are you sure you want to delete this appointment?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete appointment');
            }

            setAppointments(current => current.filter(apt => apt.id !== id));
            setUpdateMessage('Appointment deleted successfully');

            setTimeout(() => setUpdateMessage(''), 3000);

        } catch (error) {
            console.error('Delete error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Appointment Dashboard</h1>
                <p className="text-gray-600 mt-2">Total Appointments: {appointments.length}</p>
            </header>

            <main className="max-w-7xl mx-auto">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {updateMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {updateMessage}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Loading appointments...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.length === 0 ? (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                                <p className="text-gray-500 text-lg">No appointments found</p>
                            </div>
                        ) : (
                            Object.values(appointments).map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {appointment.petName}'s Appointment
                                        </h3>
                                        <button
                                            onClick={() => deleteAppointment(appointment.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title="Delete appointment"
                                            disabled={loading}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p><strong>Pet Type:</strong> {appointment.petType}</p>
                                        <p><strong>Owner:</strong> {appointment.ownerName}</p>
                                        <p><strong>Email:</strong> {appointment.ownerEmail}</p>
                                        <p><strong>Phone:</strong> {appointment.ownerPhone}</p>
                                        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                                        <p><strong>Time:</strong> {appointment.time}</p>
                                        <p><strong>Service:</strong> {appointment.service}</p>
                                        {appointment.notes && (
                                            <p><strong>Notes:</strong> {appointment.notes}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}