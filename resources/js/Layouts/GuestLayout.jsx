import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center">
            <div className="flex w-full max-w-7xl gap-8">
                
                {/* Left Section (Logo/Info) */}
                <div className="hidden md:flex w-1/2 flex-col items-center justify-center px-8">
                    <ApplicationLogo className="h-16 w-auto mb-6" />
                    <h1 className="text-3xl font-bold text-emerald-600 mb-2">
                        Welcome to Our Platform
                    </h1>
                    <p className="text-gray-600 text-center leading-relaxed">
                        Secure, reliable, and easy-to-use.  
                        Join us and experience a better way to manage your data.
                    </p>
                </div>

                {/* Right Section (Form / Children) */}
                <div className="w-full md:w-1/2 ">
                    {children}
                </div>
            </div>
        </div>
    );
}
