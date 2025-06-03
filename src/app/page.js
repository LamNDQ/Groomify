'use client';

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import Gallery from "@/components/home/Gallery";
import ContactUs from "@/components/home/ContactUs";
import FAQs from "@/components/home/FAQs";
import Service from "@/components/home/Service";
import Packages from "@/components/home/Packages";
import BookingModal from "@/components/modals/BookingModal";
import Footer from "@/components/home/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (e) => {
    if (e.target.getAttribute('href') === '#book') {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <main onClick={handleBookClick}>
      <Header />
      <Hero />
      <AboutUs />
      <Service />
      <Packages />
      <Gallery />
      <FAQs />
      <ContactUs />
      <Footer />

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}