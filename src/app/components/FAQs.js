import Image from 'next/image';

export default function FAQs() {
    return (
        <section id="faqs" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 py-16 p-8">
            <div className="grid col-span-1">
                <Image
                    src="/images/faqs-image.jpeg"
                    alt="Dog"
                    layout="responsive"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg mb-4"
                />
            </div>
            <div className="grid col-span-1">
                <div className="bg-gray-100 p-2 rounded-full border border-gray-300 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-home mr-2"></i>
                    <h3 className="">FAQs</h3>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Frequently asked questions</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">How long does a grooming session take?</h3>
                    <p className="text-gray-600">It depends on the package and your pet's needs, but most sessions take 1.5–3 hours.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Do you groom cats as well as dogs?</h3>
                    <p className="text-gray-600">Absolutely! We love pampering both cats and dogs.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">What if my pet is nervous or anxious?</h3>
                    <p className="text-gray-600">Our groomers are trained to handle nervous pets with patience and care. Let us know, and we’ll take extra time to make them comfortable.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Can I stay with my pet during grooming?</h3>
                    <p className="text-gray-600">For safety and to keep your pet focused, we recommend waiting in our cozy lounge area.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">How often should I groom my pet?</h3>
                    <p className="text-gray-600">It depends on their breed and coat type, but most pets benefit from grooming every 4–6 weeks.</p>
                </div>
            </div>
        </section>
    )
}
