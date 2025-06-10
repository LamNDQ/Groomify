'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function FilterBar({ showStatus = false, onFilter }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        status: searchParams.get('status') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });

        const queryString = params.toString();
        router.push(`?${queryString}`);

        if (onFilter) {
            onFilter(filters);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleChange}
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                {showStatus && (
                    <div className="flex-1 min-w-[200px]">
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        type="date"
                        name="dateFrom"
                        value={filters.dateFrom}
                        onChange={handleChange}
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="date"
                        name="dateTo"
                        value={filters.dateTo}
                        onChange={handleChange}
                        className="p-2 border rounded-lg"
                    />
                </div>

                <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-[var(--first-color)] text-white rounded-lg hover:opacity-90 flex items-center gap-2"
                >
                    <FaFilter />
                    Apply Filters
                </button>
            </div>
        </div>
    );
}