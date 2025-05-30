import { FaTimes } from 'react-icons/fa';
import Button from '../shared/Button';

export default function BookingModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaTimes className="w-6 h-6" />
                </button>
                {/* Modal content */}
                <div className="mt-6">
                    <h2 className="text-2xl font-bold text-center mb-4">Book an Appointment</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pet Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your pet's name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Service
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option value="">Select a service</option>
                                <option value="basic">Basic Grooming ($50)</option>
                                <option value="premium">Premium Package ($80)</option>
                                <option value="deluxe">Deluxe Spa Day ($120)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Time
                            </label>
                            <input
                                type="time"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <Button
                                text="Book Appointment"
                                className="mx-auto"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}