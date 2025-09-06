import React from 'react';
import { ShieldCheck, Rocket, Smartphone } from 'lucide-react';

const Feature = () => {
    const cardStyle =
        "flex flex-col items-start bg-white p-6 rounded-xl hover:shadow-lg hover:border-emerald-500 transition-all";
  return (
    <section id="features" className="py-20 px-6 lg:px-16 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-emerald-600">Clover Bank</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                We’re revolutionizing banking with cutting-edge technology and a focus on your experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cardStyle}>
                    <ShieldCheck className="w-10 h-10 p-3 rounded-lg mb-5 text-emerald-600 bg-emerald-100" />
                    <h3 className="text-lg font-semibold mb-3">Secure Banking</h3>
                    <p className="text-sm text-gray-600 text-start">
                        Top-notch encryption and fraud detection to keep your money safe.
                    </p>
                </div>
                <div className={cardStyle}>
                    <Rocket className="w-10 h-10 p-3 rounded-lg mb-5 text-emerald-600 bg-emerald-100" />
                    <h3 className="text-lg font-semibold mb-3">Instant Transfers</h3>
                    <p className="text-sm text-gray-600 text-start">
                        Send and receive money instantly, anytime, anywhere.
                    </p>
                </div>
                <div className={cardStyle}>
                    <Smartphone className="w-10 h-10 p-3 rounded-lg mb-5 text-emerald-600 bg-emerald-100" />
                    <h3 className="text-lg font-semibold mb-3">Smart Budgeting</h3>
                    <p className="text-sm text-gray-600 text-start">
                        AI-powered insights to manage and grow your finances.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Feature