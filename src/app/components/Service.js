import Button from "./Button";

export default function Service() {
    return (
        <section id="services" className="">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-6xl text-center mb-8">Customize your pet’s perfect day</h2>
                <p className="text-center mb-12">Need something specific? Pick and choose from our a la carte services to create a grooming experience tailored just for your pet.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* <!-- Service 1 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Blueberry Facial</h3>
                        <p className="mt-2 text-gray-600">A gentle cleanse designed to nail trim, fluff, and soothe your pet’s face.</p>
                        <p className="mt-4 text-lg font-bold">$25</p>
                    </div>

                    {/* <!-- Service 2 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Pawdicure Plus</h3>
                        <p className="mt-2 text-gray-600">A complete paw treatment with a nail trim, filing, and soothing paw pad treatment.</p>
                        <p className="mt-4 text-lg font-bold">$30</p>
                    </div>

                    {/* <!-- Service 3 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Teeth Brushing</h3>
                        <p className="mt-2 text-gray-600">Freshen your pet’s breath and maintain oral health with a thorough dental clean.</p>
                        <p className="mt-4 text-lg font-bold">$15</p>
                    </div>

                    {/* <!-- Service 4 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">De-Shedding</h3>
                        <p className="mt-2 text-gray-600">Minimize loose hair and reduce shedding with our blow-out and specialized de-shedding tools.</p>
                        <p className="mt-4 text-lg font-bold">$35</p>
                    </div>

                    {/* <!-- Service 5 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Fur Conditioning</h3>
                        <p className="mt-2 text-gray-600">Hydrate, soften, and restore your pet’s coat with a nourishing deep-conditioning treatment.</p>
                        <p className="mt-4 text-lg font-bold">$40</p>
                    </div>

                    {/* <!-- Service 6 --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Ear Cleaning</h3>
                        <p className="mt-2 text-gray-600">Gently and thoroughly remove dirt and wax buildup to keep your pet’s ears clean.</p>
                        <p className="mt-4 text-lg font-bold">$20</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Button
                        text="Book now"
                        href="#book"
                        className="mt-6 button inline-block"
                    />
                </div>
            </div>
        </section>
    );
}