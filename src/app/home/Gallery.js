

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
        <section id="gallery" className="py-16">
            <div className=" overflow-hidden">
                <div className="flex flex-col w-[40%] items-center justify-center text-center mb-16 mx-auto">
                    <div className="">
                        <Tag icon={FaMagic} text="Transformations" className="" />
                    </div>
                    <h2 className="text-6xl mb-8">Smiles, styles, and <span className="span-color">happy tails</span></h2>
                    <p className="mb-12">
                        For over 12 years, we've been dedicated to making pets look fabulous and feel loved. Because to us, your pet isn’t just a client — they’re family.
                    </p>
                </div>

                <div className="flex animate-scroll gap-2 whitespace-nowrap mb-12">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="bg-gray-100 p-2 rounded-lg shadow-md flex-shrink-0">
                            <Image
                                src={images[index % images.length]}
                                alt={`Gallery Image ${index + 1}`}
                                width={300}
                                height={400}
                                className="rounded-lg shadow-lg "
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}