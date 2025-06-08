'use client';

import { useEffect, useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import Tag from '../components/common/Tag';

export default function AboutUs() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <section
            id="about-us"
            ref={ref}
            className={`
                max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center
                transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            {/* Left Content */}
            <div className="space-y-6">
                <div className="w-fit">
                    <Tag icon={FaHome} text="About Us" />
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                    <span className="text-[var(--first-color)]">Groomify</span> pet grooming salon
                </h2>
                <p className="text-lg text-gray-600 max-w-xl">
                    For over 12 years, we've been dedicated to making pets look
                    fabulous and feel loved. Because to us, your pet isn’t just a client — they’re family.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                {[
                    { title: '12+', subtitle: 'Years experience' },
                    { title: '456+', subtitle: 'Pampered pets' },
                    { title: '100%', subtitle: 'Positive reviews' },
                    { title: '1899+', subtitle: 'Of shampoo used' }
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-xl shadow-sm p-6 text-center"
                    >
                        <h3 className="text-4xl font-bold text-blue-600">{stat.title}</h3>
                        <p className="text-gray-700 mt-1">{stat.subtitle}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
