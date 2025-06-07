'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Tag from '../components/common/Tag';
import { FaQuestionCircle, FaPlus, FaTimes } from 'react-icons/fa';

export default function FAQs() {
    const [faqs, setFaqs] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch FAQs from API
    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/faqs');

                if (!response.ok) {
                    throw new Error('Failed to fetch FAQs');
                }

                const result = await response.json();
                // Only show active FAQs
                const activeFaqs = result.data?.filter(faq => faq.isActive) || [];
                setFaqs(activeFaqs);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    const toggleFAQ = (id) => setActiveId(activeId === id ? null : id);

    if (loading) {
        return (
            <section id="faqs" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--first-color)] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading FAQs...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="faqs" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center text-red-600">
                    <p>Error loading FAQs: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section id="faqs" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 px-4 md:px-8 lg:px-20 items-center">
                {/* Image */}
                <div className="w-full md:w-1/2">
                    <Image
                        src="/images/faqs-image.jpeg"
                        alt="Dog"
                        width={600}
                        height={400}
                        className="rounded-xl shadow-xl w-full h-auto"
                    />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                    <div className="mb-6 w-fit">
                        <Tag icon={FaQuestionCircle} text="FAQs" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Frequently asked <span className="text-[var(--first-color)]">questions</span>
                    </h2>

                    {faqs.length === 0 ? (
                        <p className="text-gray-500">No FAQs available at the moment.</p>
                    ) : (
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-md"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full flex justify-between items-center cursor-pointer"
                                    >
                                        <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                                        <span className="w-6 h-6 relative">
                                            <FaPlus
                                                className={`absolute inset-0 transition-all duration-300 
                                                ${activeId === faq.id ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'}`}
                                            />
                                            <FaTimes
                                                className={`absolute inset-0 transition-all duration-300 
                                                ${activeId === faq.id ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`}
                                            />
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out 
                                        ${activeId === faq.id ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="text-gray-600">{faq.answer}</p>
                                        {faq.category && (
                                            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                {faq.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}