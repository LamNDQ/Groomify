'use client';

import { useState } from "react";
import Image from "next/image";
import Header from "./home/Header";
import Hero from "./home/Hero";
import AboutUs from "./home/AboutUs";
import Gallery from "./home/Gallery";
import ContactUs from "./home/ContactUs";
import FAQs from "./home/FAQs";
import Service from "./home/Service";
import Packages from "./home/Packages";
import BookingModal from "./components/modals/BookingModal";
import Footer from "./home/Footer";

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