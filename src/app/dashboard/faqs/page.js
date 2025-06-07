'use client';

import Sidebar from '@/app/components/common/Sidebar';
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus, FaPaw, FaSave, FaTimes } from 'react-icons/fa';

export default function FAQsDashboard() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: '',
        isActive: true
    });

    const getFaqs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/faqs');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Check if the response has the expected structure
            if (result.success && result.data) {
                setFaqs(Array.isArray(result.data) ? result.data : []);
            } else if (Array.isArray(result)) {
                // Fallback for different response structure
                setFaqs(result);
            } else {
                setFaqs([]);
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            setError(error.message);
            setFaqs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFaqs();
    }, []);

    const deleteFaq = async (id) => {
        if (!id || !confirm('Are you sure you want to delete this FAQ?')) {
            return;
        }

        try {
            setLoading(true);
            setError(null); // Clear any previous errors
            console.log('Deleting FAQ:', id);

            const response = await fetch(`/api/faqs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete FAQ');
            }

            // Update local state only if delete was successful
            setFaqs(current => current.filter(faq => faq.id !== id));
            setUpdateMessage('FAQ deleted successfully');

            // Clear success message after 3 seconds
            setTimeout(() => setUpdateMessage(''), 3000);

        } catch (error) {
            console.error('Delete error:', error);
            setError(error.message || 'Failed to delete FAQ');
            setUpdateMessage(''); // Clear any success message
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (faq) => {
        setEditingId(faq.id);
        setFormData({
            question: faq.question || '',
            answer: faq.answer || '',
            category: faq.category || '',
            isActive: faq.isActive !== undefined ? faq.isActive : true
        });
    };

    const handleSave = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/faqs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update FAQ');
            }

            const result = await response.json();

            // Update local state
            setFaqs(current => current.map(faq =>
                faq.id === id ? (result.data || { ...faq, ...formData }) : faq
            ));

            setEditingId(null);
            setFormData({ question: '', answer: '', category: '', isActive: true });
            setUpdateMessage('FAQ updated successfully');
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (error) {
            console.error('Error updating FAQ:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!formData.question.trim() || !formData.answer.trim()) {
            setError('Question and answer are required');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/api/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create FAQ');
            }

            const result = await response.json();

            // Add to local state
            setFaqs(current => [result.data || formData, ...current]);
            setShowAddForm(false);
            setFormData({ question: '', answer: '', category: '', isActive: true });
            setUpdateMessage('FAQ created successfully');
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (error) {
            console.error('Error creating FAQ:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowAddForm(false);
        setFormData({ question: '', answer: '', category: '', isActive: true });
        setError(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-x-auto">
                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">FAQs Management</h1>
                        <p className="text-gray-600 mt-1">Total FAQs: {faqs.length}</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        disabled={loading}
                        className="bg-[var(--first-color)] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition disabled:opacity-50"
                    >
                        <FaPlus /> Add New FAQ
                    </button>
                </header>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong>Error:</strong> {error}
                        <button
                            onClick={() => setError(null)}
                            className="float-right text-red-700 hover:text-red-900"
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}

                {updateMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {updateMessage}
                    </div>
                )}

                {/* Add Form */}
                {showAddForm && (
                    <div className="bg-white p-6 rounded-lg shadow mb-6 border">
                        <h3 className="text-lg font-semibold mb-4">Add New FAQ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., General, Services, Pricing"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the question"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
                            <textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the answer"
                                required
                            />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={handleAdd}
                                disabled={loading || !formData.question.trim() || !formData.answer.trim()}
                                className="bg-[var(--first-color)] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-opacity-90 transition disabled:opacity-50"
                            >
                                <FaSave /> Save FAQ
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-600 transition"
                            >
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Loading FAQs...</span>
                    </div>
                ) : faqs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">No FAQs found</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="mt-4 bg-[var(--first-color)] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition mx-auto"
                        >
                            <FaPlus /> Add Your First FAQ
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {faqs.map(faq => (
                            <div key={faq.id} className="bg-white rounded-lg shadow p-6 border">
                                {editingId === faq.id ? (
                                    // Edit Form
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                                <input
                                                    type="text"
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                                <select
                                                    value={formData.isActive}
                                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="true">Active</option>
                                                    <option value="false">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                                            <input
                                                type="text"
                                                value={formData.question}
                                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
                                            <textarea
                                                value={formData.answer}
                                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                                rows="4"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSave(faq.id)}
                                                disabled={loading || !formData.question.trim() || !formData.answer.trim()}
                                                className="bg-[var(--first-color)] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-opacity-90 transition disabled:opacity-50"
                                            >
                                                <FaSave /> Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-600 transition"
                                            >
                                                <FaTimes /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display Mode
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {faq.category && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                            {faq.category}
                                                        </span>
                                                    )}
                                                    <span className={`text-xs px-2 py-1 rounded ${faq.isActive
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {faq.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {faq.question}
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <button
                                                    onClick={() => handleEdit(faq)}
                                                    disabled={loading}
                                                    className="text-blue-500 hover:bg-blue-100 hover:text-blue-700 rounded p-2 transition disabled:opacity-50"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => deleteFaq(faq.id)}
                                                    disabled={loading}
                                                    className="text-red-500 hover:bg-red-100 hover:text-red-700 rounded p-2 transition disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}