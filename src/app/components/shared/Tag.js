
export default function Tag({ icon: Icon, text, className = "" }) {
    return (
        <div className={`inline-flex items-center justify-center px-4 bg-gray-100 rounded-full border border-gray-300 ${className}`}>
            {Icon && <Icon className="mr-2" />}
            <span>{text}</span>
        </div>
    );
}