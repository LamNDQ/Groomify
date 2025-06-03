import Image from 'next/image';
import Tag from '../components/shared/Tag';
import { FaMagic } from 'react-icons/fa';

export default function Gallery() {
    const images = [
        "/images/gallery/gallery1.jpeg",
        "/images/gallery/gallery2.jpeg",
        "/images/gallery/gallery3.jpeg",
        "/images/gallery/gallery4.jpeg",
        "/images/gallery/gallery5.jpeg",
        "/images/gallery/gallery6.jpeg",
    ];

    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="w-full mx-auto px-4 md:px-8 lg:px-20">
                {/* Heading */}
                <div className="text-center mb-16 w-full md:w-2/3 mx-auto">
                    <Tag icon={FaMagic} text="Transformations" />
                    <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-snug">
                        Smiles, styles, and <span className="text-[var(--first-color)]">happy tails</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        For over 12 years, we've been dedicated to making pets look fabulous and feel loved. Because to us, your pet isn’t just a client — they’re family.
                    </p>
                </div>

                {/* Gallery carousel */}
                <div className="overflow-hidden">
                    <div className="flex gap-4 animate-scroll">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-64 bg-white p-2 rounded-xl shadow hover:scale-105 transition-all duration-300">
                                <Image
                                    src={images[index % images.length]}
                                    alt={`Gallery Image ${index + 1}`}
                                    width={300}
                                    height={400}
                                    className="rounded-lg object-cover w-full h-72"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
