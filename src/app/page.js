import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/Gallery";
import ContactUs from "./components/ContactUs";
import FAQs from "./components/FAQs";
import Service from "./components/Service";
import Packages from "./components/Packages";


export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutUs />
      <Service />
      <Packages />
      <Gallery />
      <FAQs />
      <ContactUs />
    </main>
  );
}
