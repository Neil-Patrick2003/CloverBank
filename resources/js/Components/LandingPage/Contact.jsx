
import React from 'react';
import { useForm } from '@inertiajs/react';

export const Contact = () => {
  const { data, setData, processing, errors } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  return (
    <section
      id="contact"
      className="py-20 bg-white flex flex-col items-center px-6"
    >
      {/* Heading */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-extrabold text-emerald-600">
          Get in Touch
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Have questions or feedback? Fill out the form and we’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <form className="w-full max-w-2xl bg-emerald-50 rounded-2xl shadow-lg p-8 md:p-10 space-y-5">
        {/* Name */}
        <div>
          <input
            type="text"
            value={data.name}
            placeholder="Your Name"
            onChange={(e) => setData('name', e.target.value)}
            className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            value={data.email}
            placeholder="Your Email"
            onChange={(e) => setData('email', e.target.value)}
            className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <input
            type="text"
            value={data.subject}
            placeholder="Subject"
            onChange={(e) => setData('subject', e.target.value)}
            className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            rows="5"
            placeholder="Your Message"
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
            className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={processing}
          className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition-all duration-300 ${
            processing
              ? 'bg-emerald-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
          }`}
        >
          {processing ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
};
