import { useState } from 'react';
import Image from 'next/image';
import Tag from '../components/shared/Tag';
import { FaQuestionCircle, FaPlus, FaTimes } from 'react-icons/fa';

const faqData = [
    {
        id: 1,
        question: "How long does a grooming session take?",
        answer: "It depends on the package and your pet's needs, but most sessions take 1.5–3 hours."
    },
    {
        id: 2,
        question: "Do you groom cats as well as dogs?",
        answer: "Absolutely! We love pampering both cats and dogs."
    },
    {
        id: 3,
        question: "What if my pet is nervous or anxious?",
        answer: "Our groomers are trained to handle nervous pets with patience and care. Let us know, and we'll take extra time to make them comfortable."
    },
    {
        id: 4,
        question: "Can I stay with my pet during grooming?",
        answer: "For safety and to keep your pet focused, we recommend waiting in our cozy lounge area."
    },
    {
        id: 5,
        question: "How often should I groom my pet?",
        answer: "It depends on their breed and coat type, but most pets benefit from grooming every 4–6 weeks."
    }
];

export default function FAQs() {
    const [activeId, setActiveId] = useState(null);
    const toggleFAQ = (id) => setActiveId(activeId === id ? null : id);

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

                    <div className="space-y-4">
                        {faqData.map((faq) => (
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
