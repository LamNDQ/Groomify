import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaDev
} from 'react-icons/fa';
import { FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
                {/* About */}
                <div>
                    <h2 className="text-[var(--first-color)] text-xl font-bold mb-2">Groomify</h2>
                    <p className="mb-4">
                        Pamper Your Pet with a Click
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h2 className="text-white font-semibold mb-3">Navigation</h2>
                    <ul className="space-y-2">
                        <li><a href="#about-us" className="text-[var(--first-color)] hover:underline">About</a></li>
                        <li><a href="#services" className="text-[var(--first-color)] hover:underline">Service</a></li>
                        <li><a href="#packages" className="text-[var(--first-color)] hover:underline">Packages</a></li>
                        <li><a href="gallery" className="text-[var(--first-color)] hover:underline">Gallery</a></li>
                        <li><a href="#faqs" className="text-[var(--first-color)] hover:underline">FAQs</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-white font-semibold mb-3">Contact</h2>
                    <div className="flex items-center space-x-2 mb-2">
                        <FiMail className="text-[var(--first-color)]" />
                        <a href="mailto:groomify@gmail.com" className="text-[var(--first-color)] hover:underline">groomify@gmail.com</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FiMapPin className="text-[var(--first-color)]" />
                        <span>Da Nang, Vietnam</span>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-2">
                <p>© 2025 Groomify</p>
            </div>
        </footer >
    );
}
