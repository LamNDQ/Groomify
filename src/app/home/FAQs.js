
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

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section id="faqs" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 py-16 p-8">
            <div className="grid col-span-1">
                <Image
                    src="/images/faqs-image.jpeg"
                    alt="Dog"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg mb-4 w-full h-auto"
                />
            </div>
            <div className="grid col-span-1">
                <div className="w-[30%]">
                    <Tag icon={FaQuestionCircle} text="FAQs" />
                </div>
                <h2 className="text-6xl mb-8">
                    Frequently asked <span className="span-color">questions</span>
                </h2>
                <div className="space-y-4">
                    {faqData.map((faq) => (
                        <div
                            key={faq.id}
                            className="border border-gray-200 rounded-lg p-4"
                        >
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full flex justify-between items-center"
                            >
                                <h3 className="text-lg font-medium">{faq.question}</h3>
                                <div className="relative w-6 h-6 transition-transform duration-300">
                                    <FaPlus
                                        className={`absolute inset-0 transform transition-all duration-300 
                                            ${activeId === faq.id ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'}`}
                                    />
                                    <FaTimes
                                        className={`absolute inset-0 transform transition-all duration-300 
                                            ${activeId === faq.id ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`}
                                    />
                                </div>
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-in-out
                                    ${activeId === faq.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}