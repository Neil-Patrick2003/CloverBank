export default function InputWithIcon({ 
    type = "text", 
    icon, 
    placeholder = "", 
    value, 
    onChange, 
    className = "", 
    ...props 
}) {
    return (
        <div className="relative w-full">
            {/* Icon */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-500">
                {icon}
            </span>

            {/* Input */}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition ${className}`}
                {...props}
            />
        </div>
    );
}














