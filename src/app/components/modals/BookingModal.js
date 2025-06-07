
import { useState, useCallback } from 'react'
import Button from '../common/Button'

export default function BookingModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        petName: '',
        petType: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            console.log('Submitting form data:', formData) // Debug log

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: new Date(formData.date).toISOString(),
                    status: 'pending'
                }),
            })

            const result = await response.json()
            console.log('API Response:', result) // Debug log

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create booking')
            }

            setMessage('Booking created successfully!')
            setFormData({
                petName: '',
                petType: '',
                ownerName: '',
                ownerEmail: '',
                ownerPhone: '',
                service: '',
                date: '',
                time: '',
                notes: ''
            })

            setTimeout(() => {
                onClose()
                setMessage('')
            }, 2000)
        } catch (error) {
            console.error('Booking error:', error)
            setMessage(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div
            className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose} // ⬅️ Đóng modal khi click vào nền mờ
        >
            <div
                className="bg-white rounded-lg max-w-md w-full max-h-[100vh] overflow-hidden shadow-lg"
                onClick={(e) => e.stopPropagation()} // ⛔ Ngăn click trong modal làm đóng
            >
                <div className="bg-white rounded-lg max-w-md w-full max-h-[100vh] overflow-hidden shadow-lg">
                    <div className="p-6 backdrop-blur-xs">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-[var(--first-color)] mx-auto">Book Grooming Service</h2>
                        </div>

                        {message && (
                            <div className={`p-3 rounded mb-4 ${message.includes('success')
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pet Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="petName"
                                        value={formData.petName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pet Type *
                                    </label>
                                    <select
                                        name="petType"
                                        value={formData.petType}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select pet type</option>
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="rabbit">Rabbit</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Owner Name *
                                </label>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="ownerEmail"
                                        value={formData.ownerEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="ownerPhone"
                                        value={formData.ownerPhone}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service *
                                </label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select service</option>
                                    <option value="basic-wash">Basic Wash ($25)</option>
                                    <option value="full-grooming">Full Grooming ($45)</option>
                                    <option value="nail-trimming">Nail Trimming ($15)</option>
                                    <option value="teeth-cleaning">Teeth Cleaning ($30)</option>
                                    <option value="flea-treatment">Flea Treatment ($35)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Time *
                                    </label>
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select time</option>
                                        <option value="09:00">9:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="13:00">1:00 PM</option>
                                        <option value="14:00">2:00 PM</option>
                                        <option value="15:00">3:00 PM</option>
                                        <option value="16:00">4:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Special Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Any special requirements or notes..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4 text-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-2 px-4 bg-[var(--first-color)] text-white rounded-md disabled:opacity-50 transition-colors text-white font-bold bg-[var(--first-color)] px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                                >
                                    {loading ? 'Booking...' : 'Book Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

