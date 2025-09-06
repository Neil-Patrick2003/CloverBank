export default function Navbar() {
    return (
        <nav className="hidden md:block bg-emerald-900/90 backdrop-blur-md p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <div className="text-emerald-400 text-lg font-bold">Clover Bank</div>

                {/* Nav Links */}
                <div className="space-x-6">
                    <a href="#home" className="text-gray-200 hover:text-emerald-400 transition-colors duration-300">Home</a>
                    <a href="#features" className="text-gray-200 hover:text-emerald-400 transition-colors duration-300">Features</a>
                    <a href="#pricing" className="text-gray-200 hover:text-emerald-400 transition-colors duration-300">Pricing</a>
                    <a href="#contact" className="text-gray-200 hover:text-emerald-400 transition-colors duration-300">Contact</a>
                </div>
            </div>
        </nav>
    );
}
