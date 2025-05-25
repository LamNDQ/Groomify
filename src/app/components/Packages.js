import Button from "./Button";

export default function Packages() {
    return (
        <section>
            <div className="max-w-7xl mt-16 mx-auto px-4 text-center">
                <h2 className="text-6xl mb-4">Tailored packages for every pet</h2>
                <p className="text-lg mb-12">Whether your pet needs a quick refresh or a full spa day, we’ve got the perfect package to suit their needs.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Package 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">The Essential Elegance</h3>
                        <p className="mt-2 text-lg font-bold">$80</p>
                        <ul className="mt-4 text-gray-600 list-disc list-inside">
                            <li>Gentle bath pet-safe shampoo</li>
                            <li>Nail trimming & filling</li>
                            <li>Ear cleaning</li>
                            <li>Paw pad moisturizing</li>
                            <li>Complimentary bowtie or floral collar</li>
                        </ul>
                        <div className="mt-6">
                            <Button
                                text="Book now"
                                href="#book"
                                className="mt-6 button inline-block"
                            />
                        </div>
                    </div>

                    {/* Package 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">The Signature Spa Day</h3>
                        <p className="mt-2 text-lg font-bold">$100</p>
                        <ul className="mt-4 text-gray-600 list-disc list-inside">
                            <li>Deluxe shampoo & conditioning</li>
                            <li>Nail trimming & filling</li>
                            <li>Teeth brushing</li>
                            <li>Ear cleaning</li>
                            <li>Fur conditioning treatment</li>
                        </ul>
                        <div className="mt-6">
                            <Button
                                text="Book now"
                                href="#book"
                                className="mt-6 button inline-block"
                            />
                        </div>
                    </div>

                    {/* Package 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">The Royal Retreat</h3>
                        <p className="mt-2 text-lg font-bold">$120</p>
                        <ul className="mt-4 text-gray-600 list-disc list-inside">
                            <li>Luxury bath with aromatherapy</li>
                            <li>Full grooming service</li>
                            <li>Paw pad moisturizing</li>
                            <li>Teeth brushing</li>
                            <li>Complimentary gift bag</li>
                        </ul>
                        <div className="mt-6">
                            <Button
                                text="Book now"
                                href="#book"
                                className="mt-6 button inline-block"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}