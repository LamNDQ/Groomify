'use client';

import Sidebar from '@/app/components/common/Sidebar';
import { useState, useEffect } from 'react';
import { FaTrash, FaPaw, FaEdit } from 'react-icons/fa';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        petName: '',
        petType: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    });

    const onClose = () => {
        setEditingId(null);
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (appointment) => {
        setEditingId(appointment.id);
        setEditForm({
            petName: appointment.petName,
            petType: appointment.petType,
            ownerName: appointment.ownerName,
            ownerEmail: appointment.ownerEmail,
            ownerPhone: appointment.ownerPhone,
            service: appointment.service,
            date: new Date(appointment.date).toISOString().split('T')[0],
            time: appointment.time,
            notes: appointment.notes || ''
        });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/bookings/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });

            if (!response.ok) throw new Error('Failed to update appointment');

            const { data } = await response.json();
            setAppointments(current =>
                current.map(apt => apt.id === editingId ? data : apt)
            );
            setUpdateMessage('Appointment updated successfully');
            setEditingId(null);
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setError(null);
    };

    const getAppointments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bookings');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const { data } = await response.json();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
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
        if (!confirm('Are you sure you want to delete this appointment?')) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete appointment');
            setAppointments(current => current.filter(apt => apt.id !== id));
            setUpdateMessage('Appointment deleted successfully');
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className="flex-1 p-6 overflow-x-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-primary">Appointment Dashboard</h1>
                    <p className="text-gray-600 mt-1">Total Appointments: {appointments.length}</p>
                </header>

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

                {editingId && (
                    <div
                        className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={onClose}
                    >
                        <div
                            className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-[var(--first-color)] text-center mb-6">
                                    Edit Appointment
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Pet Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="petName"
                                                value={editForm.petName}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Pet Type *
                                            </label>
                                            <select
                                                name="petType"
                                                value={editForm.petType}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select pet type</option>
                                                <option value="dog">Dog</option>
                                                <option value="cat">Cat</option>
                                                <option value="rabbit">Rabbit</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Owner Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="ownerName"
                                                value={editForm.ownerName}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="ownerEmail"
                                                value={editForm.ownerEmail}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="ownerPhone"
                                                value={editForm.ownerPhone}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Service *
                                            </label>
                                            <select
                                                name="service"
                                                value={editForm.service}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select service</option>
                                                <option value="basic-wash">Basic Wash ($25)</option>
                                                <option value="full-grooming">Full Grooming ($45)</option>
                                                <option value="nail-trimming">Nail Trimming ($15)</option>
                                                <option value="teeth-cleaning">Teeth Cleaning ($30)</option>
                                                <option value="flea-treatment">Flea Treatment ($35)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date *
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={editForm.date}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time *
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={editForm.time}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Special Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={editForm.notes}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            placeholder="Any special requirements or notes..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-[var(--first-color)] text-white rounded-md hover:bg-blue-600 font-bold transition-transform transform hover:scale-105"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Loading appointments...</span>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">No appointments found</p>
                    </div>
                ) : (
                    <div className="overflow-auto">
                        <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg bg-white">
                            <thead className="bg-primaryLight text-primary text-sm font-semibold uppercase tracking-wide">
                                <tr>
                                    {['Pet Name', 'Type', 'Owner', 'Email', 'Phone', 'Date', 'Time', 'Service', 'Notes', 'Actions'].map((header, idx) => (
                                        <th key={idx} className="px-4 py-3 border-b border-gray-200">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
                                {appointments.map(appointment => (
                                    <tr key={appointment.id} className="group hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="px-4 py-2 flex items-center gap-2">
                                            <FaPaw className="text-primary" />
                                            {appointment.petName}
                                        </td>
                                        <td className="px-4 py-2">{appointment.petType}</td>
                                        <td className="px-4 py-2">{appointment.ownerName}</td>
                                        <td className="px-4 py-2">{appointment.ownerEmail}</td>
                                        <td className="px-4 py-2">{appointment.ownerPhone}</td>
                                        <td className="px-4 py-2">{new Date(appointment.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{appointment.time}</td>
                                        <td className="px-4 py-2 text-[var(--first-color)] uppercase font-medium">{appointment.service}</td>
                                        <td className="px-4 py-2">{appointment.notes || '-'}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleEdit(appointment)}
                                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 p-2 rounded transition"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => deleteAppointment(appointment.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded transition"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </main>
        </div>
    );
}
