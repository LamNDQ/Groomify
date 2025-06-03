'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../components/common/Button";
import { FaStar, FaBoxOpen } from "react-icons/fa";
import Tag from "../../components/common/Tag";

const packages = [
    {
        id: 'essential',
        name: "The Essential Elegance",
        price: 80,
        image: "/images/packages/essential.jpg",
        features: [
            "Gentle bath pet-safe shampoo",
            "Nail trimming & filing",
            "Ear cleaning",
            "Paw pad moisturizing",
            "Fluff dry & brush-out",
            "Complimentary bowtie or floral collar",
        ],
    },
    {
        id: 'signature',
        name: "The Signature Spa Day",
        price: 120,
        image: "/images/packages/signature.avif",
        features: [
            "Deep-conditioning bath",
            "Full-body haircut & breed-specific styling",
            "Nail trimming, filing, and buffing",
            "Ear cleaning & teeth brushing",
            "Soothing paw balm application",
            "Scented spritz for a fresh, lasting fragrance",
        ],
    },
    {
        id: 'royal',
        name: "The Royal Retreat",
        price: 150,
        image: "/images/packages/royal.avif",
        features: [
            "Everything in the Signature Spa Day",
            "Blueberry facial to brighten and cleanse",
            "Luxury pawdicure with nail polish",
            "Hydrating fur mask for silky softness",
            "Hand-blown dry for a fluffy finish",
            "Custom accessory of your choice",
        ],
    },
];

export default function Packages() {
    const [activePackage, setActivePackage] = useState('essential');

    useEffect(() => {
        setActivePackage('essential');
    }, []);

    return (
        <section id="packages" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col">
                <Tag
                    icon={FaBoxOpen}
                    text="Packages"
                    className="w-fit mx-auto text-center"
                />
                <h2 className="text-4xl sm:text-5xl text-center mb-6 font-bold leading-snug">
                    Tailored packages for <span className="text-[var(--first-color)]">every pet</span>
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
                    Whether your pet needs a quick refresh or a full spa day, we’ve got the perfect package to suit their needs.
                </p>

                {/* Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {packages.map((pkg) => (
                        <button
                            key={pkg.id}
                            onClick={() => setActivePackage(pkg.id)}
                            className={`w-full px-5 py-3 rounded-lg font-medium border transition-all duration-200
                ${activePackage === pkg.id
                                    ? 'bg-blue-100 border-[var(--first-color)] text-[var(--first-color)] shadow'
                                    : 'bg-white border-gray-300 hover:border-[var(--first-color)] hover:bg-gray-50'}`}
                        >
                            {pkg.name}
                        </button>
                    ))}
                </div>

                {/* Package Card */}
                <div className="space-y-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ease-in-out
                ${activePackage === pkg.id ? 'block' : 'hidden'}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <span className="text-green-600 text-3xl font-bold">
                                            ${pkg.price}
                                        </span>
                                        <h3 className="text-2xl font-bold mt-2 text-gray-800">
                                            {pkg.name}
                                        </h3>
                                    </div>

                                    <ul className="mt-6 space-y-3 text-gray-700 text-base">
                                        {pkg.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <FaStar className="text-yellow-500 mt-1" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6">
                                        <Button
                                            text="Book Now"
                                            href="#book"
                                            className="button inline-block"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
