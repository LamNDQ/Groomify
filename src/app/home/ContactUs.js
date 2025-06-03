
import Button from "../components/shared/Button";
import { SiGmail } from "react-icons/si";
import { FaFacebook, FaInstagram } from "react-icons/fa";



export default function ContactPage() {
    return (
        <div className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-[var(--first-color)] uppercase tracking-wider font-semibold text-sm">Contact</h3>
                    <h1 className="text-4xl font-bold mt-2">
                        Get In <span className="text-[var(--first-color)]">Touch</span>
                    </h1>
                    <p className="text-gray-400 mt-4">
                        Have a question or want to work together? Feel free to reach out.
                    </p>
                </div>

                <div className="rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                    {/* Left Section */}
                    <div className="bg-gradient-to-br from-[var(--first-color)] to-black p-8 space-y-6">
                        <h2 className="text-2xl font-semibold">Contact Information</h2>

                        <div className="flex items-center space-x-4">
                            <div className="text-green-300">
                                📧
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">Email</p>
                                <p className="text-green-200">groomify@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-green-300">📍</div>
                            <div>
                                <p className="text-sm text-white font-medium">Location</p>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1316874509134!2d108.21767827495499!3d16.071034184608717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836b5f0b5d5%3A0xf372c18deace6db!2zVmnhu4duIE5naGnDqm4gY-G7qXUgdsOgIMSQw6BvIHThuqFvIFZp4buHdCAtIEFuaCwgxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e1!3m2!1sen!2s!4v1747971638378!5m2!1sen!2s"
                                    width="300px" height="300px" style={{ border: '0' }} allowFullScreen loading="lazy"></iframe>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-white mb-2">Connect with me</p>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-green-600 hover:bg-green-500 p-2 rounded-full">
                                    <SiGmail className="fab fa-github"></SiGmail >
                                </a >
                                <a href="#" className="bg-green-600 hover:bg-green-500 p-2 rounded-full">
                                    <FaFacebook className="fab fa-twitter"></FaFacebook >
                                </a>
                                <a href="#" className="bg-green-600 hover:bg-green-500 p-2 rounded-full">
                                    <FaInstagram className="fab fa-linkedin-in"></FaInstagram >
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <form className="text-white p-8 space-y-6 bg-zinc-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Subject of your message"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows={5}
                                placeholder="Your message"
                            ></textarea>
                        </div>

                        <Button
                            text="Send Message"
                            className="button inline-block"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}