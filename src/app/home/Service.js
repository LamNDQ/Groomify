'use client';

import { useEffect, useRef, useState } from 'react';
import Button from "../components/common/Button";
import { FaSpa, FaPaw, FaTooth, FaBrush, FaSeedling, FaHandSparkles, FaDog } from 'react-icons/fa';
import Tag from "../components/common/Tag";

const services = [
    {
        icon: FaSpa,
        title: "Blueberry Facial",
        price: 15,
        description: "A gentle cleanse designed to nail trim, fluff, and soothe your pet's face."
    },
    {
        icon: FaPaw,
        title: "Pawdicure Plus",
        price: 20,
        description: "A complete paw treatment with a nail trim, gentle filing, and a soothing paw massage for ultimate comfort."
    },
    {
        icon: FaTooth,
        title: "Teeth Brushing",
        price: 15,
        description: "Freshen up your pet's breath and maintain oral health with a thorough minty clean and gentle brushing."
    },
    {
        icon: FaBrush,
        title: "De-Shedding",
        price: 25,
        description: "Minimize loose fur and reduce shedding with a deep brush-out and specialized de-shedding tools."
    },
    {
        icon: FaSeedling,
        title: "Fur Conditioning",
        price: 18,
        description: "Hydrate, soften, and restore shine to your pet's coat with a nourishing deep-conditioning treatment."
    },
    {
        icon: FaHandSparkles,
        title: "Ear Cleaning",
        price: 12,
        description: "Gently and thoroughly remove dirt and wax buildup to keep your pet's ears clean, fresh, and irritation-free."
    }
];

const ServiceCard = ({ icon: Icon, title, price, description, index, visible }) => (
    <div
        className={`
            bg-white rounded-xl shadow-md p-6 transition-all duration-700 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{ transitionDelay: `${index * 150}ms` }}
    >
        <div className="flex items-center justify-center">
            <Icon className="text-4xl text-[var(--first-color)]" />
        </div>
        <div className="flex flex-col text-center mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <span className="text-lg font-bold text-[var(--first-color)]">${price}</span>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

export default function Service() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <section
            id="services"
            ref={ref}
            className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 flex flex-col items-center"
        >
            {/* Heading */}
            <div className="w-full md:w-3/4 lg:w-1/2 text-center mb-12">
                <Tag icon={FaDog} text="À la Carte Services" />
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                    <span className="text-[var(--first-color)]">Customize </span>
                    your pet's perfect day
                </h2>
                <p className="text-gray-600 text-lg">
                    Need something specific? Pick and choose from our à la carte services to create a grooming experience tailored just for your pet.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {services.map((service, index) => (
                    <ServiceCard key={index} index={index} visible={visible} {...service} />
                ))}
            </div>

            {/* Call-to-action */}
            <div className="mt-12">
                <Button text="Book now" href="#book" className="button inline-block" />
            </div>
        </section>
    );
}
