'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import Sidebar from '@/app/components/common/Sidebar';

export default function ContactsDashboard() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
            });

            const response = await fetch(`/api/contacts?${params}`);
            const data = await response.json();

            if (response.ok) {
                setContacts(data.data || []);
                setPagination(data.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 0,
                    itemsPerPage: 10
                });
            } else {
                console.error('Error fetching contacts:', data.error);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [currentPage]);

    const deleteContacts = async (contactIds) => {
        if (!confirm(`Bạn có chắc muốn xóa ${contactIds.length} liên hệ?`)) return;

        try {
            const response = await fetch(`/api/contacts?ids=${contactIds.join(',')}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchContacts();
            }
        } catch (error) {
            console.error('Error deleting contacts:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
                    <p className="text-gray-600">Total contacts: {contacts.length}</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name and email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tittle</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {contacts.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                                        <div className="text-sm text-gray-500">{contact.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                                        {contact.subject}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {formatDate(contact.createdAt)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => deleteContacts([contact.id])}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}