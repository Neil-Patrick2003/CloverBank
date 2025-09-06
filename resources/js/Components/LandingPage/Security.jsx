import React from 'react'

export const Security = () => {
  return (
    <section className="py-20 bg-emerald-50 flex items-center justify-center">
        <div className="max-w-7xl h-screen flex flex-col md:flex-row items-center mx-auto p-8 space-y-10 md:space-y-0 md:space-x-12">
            {/* Left Content */}
            <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-emerald-700">
                    Advanced <span className="underline">Security</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                    At Clover Bank, your safety comes first. We use top-grade encryption, AI-driven fraud
                    monitoring, and biometric authentication to protect your transactions.
                </p>
                <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                        <span className="text-emerald-600 font-bold">✔</span>
                        <span>256-bit encryption to secure all transfers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="text-emerald-600 font-bold">✔</span>
                        <span>AI fraud detection in real-time</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="text-emerald-600 font-bold">✔</span>
                        <span>Biometric login for maximum safety</span>
                    </li>
                </ul>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 h-[400px] md:h-full bg-gray-200 rounded-2xl shadow-md flex items-center justify-center">
                <span className="text-gray-500">[ Security Image Here ]</span>
            </div>
        </div>
    </section>
  )
}
