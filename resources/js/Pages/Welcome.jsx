import React from 'react';
import Hero from '@/Components/LandingPage/Hero';
import Feature from '@/Components/LandingPage/Feature';
import { Offer } from '@/Components/LandingPage/Offer';
import { Security } from '@/Components/LandingPage/Security';
import { Contact } from '@/Components/LandingPage/Contact';
import Footer from '@/Components/LandingPage/Footer';
import Navbar from '@/Components/Navbar';

export default function Welcome() {
    

    return (
        <div className="bg-white text-gray-900 scroll-smooth">
            <Navbar />
            <Hero />
            <Feature />
            <Offer />
            <Security />
            <Contact />
            <Footer />
        </div>
    );
}
