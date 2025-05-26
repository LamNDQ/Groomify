export default function Button({ text = "Book Now", href = "#", className = "" }) {
    return (
        <a
            href={href}
            className={`text-black font-bold bg-green-500 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 ${className}`}
        >
            {text}
        </a>
    );
}