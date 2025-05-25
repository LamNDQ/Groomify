"use client";

import Image from 'next/image';

export default function Gallery() {
    return (
        <section id="gallery" className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-6xl text-center mb-8">Smiles, styles, and happy tails</h2>
                <p className="text-center mb-12">Take a peek at some of our recent transformations. From fluffy pups to sleek kitties, every pet leaves looking like a star.</p>
                <div className="">
                    <div className="flex animate-scroll">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/images/gallery/gallery1.jpeg"
                                alt="Gallery Image 1"
                                width={400}
                                height={533}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/images/gallery/gallery2.jpeg"
                                alt="Gallery Image 2"
                                width={400}
                                height={533}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/images/gallery/gallery3.jpeg"
                                alt="Gallery Image 3"
                                width={400}
                                height={533}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/images/gallery/gallery4.jpeg"
                                alt="Gallery Image 4"
                                width={400}
                                height={533}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/images/gallery/gallery5.jpeg"
                                alt="Gallery Image 5"
                                width={400}
                                height={533}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Image
                                src="/images/gallery/gallery6.jpeg"
                                alt="Gallery Image 6"
                                width={400}
                                height={533}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}