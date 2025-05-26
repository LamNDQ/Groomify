export default function AboutUs() {
    return (
        <section id="about-us" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 py-16 p-8">
            <div className="grid grid-cols-1">
                <div className="bg-gray-100 p-2 rounded-full border border-gray-300 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-home mr-2"></i>
                    <h3 className="">About Us</h3>
                </div>
                <h2 className="text-6xl text-gray-800 mb-4"><span className="span-color">Groomify</span> pet grooming salon</h2>
                <p className="">
                    For over 12 years, we've been dedicated to making pets look fabulous and feel loved. Because to us, your pet isn’t just a client — they’re family.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-8 text-center">
                    <h3 className="text-5xl">12+</h3>
                    <p className="">Years experience</p>
                </div>
                <div className="bg-gray-100 p-8 text-center">
                    <h3 className="text-5xl">456+</h3>
                    <p className="">Pampered pets</p>
                </div>
                <div className="bg-gray-100 p-8 text-center">
                    <h3 className="text-5xl ">100%</h3>
                    <p className="">Positive reviews</p>
                </div>
                <div className="bg-gray-100 p-8 text-center">
                    <h3 className="text-5xl">1899+</h3>
                    <p className="">Of shampoo used</p>
                </div>
            </div>
        </section>
    );
}