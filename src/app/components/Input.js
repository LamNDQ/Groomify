export default function Input({ className = '', type = 'text', placeholder = '' }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
        />
    );
}