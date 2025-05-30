import Button from "../components/shared/Button";
import { FaSpa, FaPaw, FaTooth, FaBrush, FaSeedling, FaHandSparkles, FaDog } from 'react-icons/fa';
import Tag from "../components/shared/Tag";

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

const ServiceCard = ({ icon: Icon, title, price, description }) => (
    <div className="p-4">
        <div className="flex items-center justify-center">
            <Icon className="span-color text-3xl" />
        </div>
        <div className="flex flex-col text-center mt-4">
            <div className="flex items-center justify-center space-x-2">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-lg font-bold">${price}</p>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default function Service() {
    return (
        <section id="services" className="flex flex-col  items-center justify-center max-w-7xl mx-auto px-4 py-16">
            <div className="w-[50%] mb-8 flex flex-col items-center justify-center">
                <Tag icon={FaDog} text="À la Carte Services" />
                <h2 className="text-6xl text-center mb-8">
                    <span className="span-color">Customize </span>
                    your pet's perfect day
                </h2>
                <p className="text-center mb-12">
                    Need something specific? Pick and choose from our a la carte services to create a grooming experience tailored just for your pet.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>

            <div className="text-center mt-8">
                <Button
                    text="Book now"
                    href="#book"
                    className="mt-6 button inline-block"
                />
            </div>
        </section>
    );
}