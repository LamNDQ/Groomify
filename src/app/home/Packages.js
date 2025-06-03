

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../components/shared/Button";
import { FaStar, FaBoxOpen } from "react-icons/fa";
import Tag from "../components/shared/Tag";

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
    }
];

export default function Packages() {
    const [activePackage, setActivePackage] = useState('essential');

    // Show first package by default
    useEffect(() => {
        setActivePackage('essential');
    }, []);

    return (
        <section id="packages" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col">
                <Tag
                    icon={FaBoxOpen}
                    text="Packages"
                    className="w-[15%] mx-auto text-center"
                />
                <h2 className="text-6xl text-center mb-8 w-[50%] mx-auto font-bold">
                    Tailored packages for <span className="span-color">every pet</span>
                </h2>
                <p className="text-gray-600 text-center mb-12 w-[50%] mx-auto">
                    Whether your pet needs a quick refresh or a full spa day, we’ve got the perfect package to suit their needs.
                </p>

                {/* Package Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-4 mb-8">
                    {packages.map((pkg) => (
                        <button
                            key={pkg.id}
                            onClick={() => setActivePackage(pkg.id)}
                            className={`px-6 py-3 rounded-lg transition-all 
                                ${activePackage === pkg.id
                                    ? 'bg-green-100 text-[var(--first-color)] font-semibold'
                                    : 'bg-white hover:bg-gray-50'}`}
                        >
                            {pkg.name}
                        </button>
                    ))}
                </div>

                {/* Package Cards */}
                <div className="grid md:grid-cols-1 gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`bg-white rounded-xl p-6 
                                ${activePackage === pkg.id ? 'block' : 'hidden'}`}
                        >
                            <div className="grid md:grid-cols-2 gap-8 transition-all duration-300 ease-in-out">
                                <div className="relative h-[400px]">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.name}
                                        fill
                                        className="object-cover rounded-lg"
                                        priority
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-green-800 text-4xl font-semibold">
                                            ${pkg.price}
                                        </span>
                                        <h3 className="text-2xl font-bold mt-4">
                                            {pkg.name}
                                        </h3>
                                    </div>

                                    <ul className="space-y-3">
                                        {pkg.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <FaStar className="text-yellow-600 w-4 h-4" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        text="Book Now"
                                        href="#book"
                                        className="button mt-6 inline-block"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}