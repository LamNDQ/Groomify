import { useState } from "react";
import Button from "../components/common/Button";
import Tag from "../components/common/Tag";
import { SiGmail } from "react-icons/si";
import { FaFacebook, FaInstagram, FaCheckCircle, FaExclamationTriangle, FaHandshake } from "react-icons/fa";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setNotification(null);

        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim()
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({
                    type: 'success',
                    message: 'Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất (24-48 giờ làm việc).'
                });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error(data.error || 'Có lỗi xảy ra khi gửi tin nhắn');
            }
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
            });
        } finally {
            setLoading(false);
            // Auto-hide notification after 5 seconds
            setTimeout(() => setNotification(null), 5000);
        }
    };

    return (
        <div className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 w-full md:w-2/3 mx-auto">
                    <Tag icon={FaHandshake} text="Contact us" />
                    <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-snug">
                        <span className="text-[var(--first-color)]">Get in touch</span> with us
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Have a question? We're always here to help.
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
                                    title="Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1316874509134!2d108.21767827495499!3d16.071034184608717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836b5f0b5d5%3A0xf372c18deace6db!2zVmnhu4duIE5naGnDqm4gY-G7qXUgdsOgIMSQw6BvIHThuqFvIFZp4buHdCAtIEFuaCwgxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e1!3m2!1sen!2s!4v1747971638378!5m2!1sen!2s"
                                    width="300"
                                    height="300"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-white mb-2">Connect with me</p>
                            <div className="flex space-x-4">
                                <a href="#" aria-label="Gmail" className="bg-white hover:bg-[var(--first-color)] p-2 rounded-full">
                                    <SiGmail />
                                </a>
                                <a href="#" aria-label="Facebook" className="bg-white hover:bg-[var(--first-color)] p-2 rounded-full">
                                    <FaFacebook />
                                </a>
                                <a href="#" aria-label="Instagram" className="bg-white hover:bg-[var(--first-color)] p-2 rounded-full">
                                    <FaInstagram />
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* Right Section - Updated Form */}
                    <form onSubmit={handleSubmit} className="text-white p-8 space-y-6 bg-zinc-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                    placeholder="Your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Subject *</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                placeholder="Subject of your message"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Message *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                rows={5}
                                placeholder="Your message"
                            ></textarea>
                        </div>

                        <div className="flex gap-3 pt-4 text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-2 px-4 bg-[var(--first-color)] text-white rounded-md disabled:opacity-50 transition-colors text-white font-bold bg-[var(--first-color)] px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                            >
                                {loading ? "Đang gửi..." : "Send Message"}
                            </button>
                        </div>
                    </form>
                </div>
                {notification && (
                    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl max-w-md z-50 ${notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                        } animate-fade-in`}>
                        <div className="flex items-center space-x-3">
                            {notification.type === 'success' ? (
                                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                            ) : (
                                <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0" />
                            )}
                            <div>
                                <h3 className={`font-semibold ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                    {notification.type === 'success' ? 'Gửi thành công!' : 'Lỗi'}
                                </h3>
                                <p className={`text-sm ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}