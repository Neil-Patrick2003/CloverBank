import React from 'react'

export const Offer = () => {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl px-6 md:px-8 mx-auto text-center">
        
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
          What can <span className="text-emerald-600 underline">Clover Bank</span> Offer?
        </h2>
        <p className="text-base md:text-lg mb-12 md:mb-14 w-full md:w-1/2 mx-auto text-gray-600">
          Explore powerful tools designed to make your financial journey secure, fast, and easy.
        </p>

        {/* Offers */}
        <div className="space-y-16 md:space-y-20">
          
          {/* Digital Wallet */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-3">Digital Wallet</h3>
              <p className="text-gray-600">
                Manage your funds easily and securely with our modern digital wallet. Track your
                balance, store cards, and pay with confidence anywhere you go.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-2xl" />
            </div>
          </div>

          {/* Instant Transfer */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-3">Instant Transfer</h3>
              <p className="text-gray-600">
                Send and receive money instantly with zero fees. Enjoy real-time transactions
                anytime, anywhere.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-2xl" />
            </div>
          </div>

          {/* Pay Bills */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-3">Pay Bills</h3>
              <p className="text-gray-600">
                Skip the hassle of long queues—pay your bills quickly and securely from your account
                in just a few taps.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-2xl" />
            </div>
          </div>

          {/* Secure Banking */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-3">Secure Banking</h3>
              <p className="text-gray-600">
                With advanced encryption and fraud detection, your money and data are protected
                every step of the way.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-2xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
