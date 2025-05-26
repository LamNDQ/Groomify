import Image from "next/image";
import Button from "./Button";
export default function Hero() {
    return (
        <section id="hero" className="grid grid-cols-1 md:grid-cols-2 items-center justify-between max-w-7xl mx-auto px-6 py-16">
            <div className="col-span-1 p-8">
                <h1 className="text-6xl leading-tight">
                    Treat your pet to a luxurious <span className="span-color">grooming experience</span>
                </h1>
                <p className="mt-4 text-xl">
                    Luxury pet grooming tailored to pamper your furry companion with care, style, and comfort.
                </p>
                <Button
                    text="Book now"
                    href="#book"
                    className="mt-6 button inline-block"
                />
            </div>

            <div className="col-span-1">
                <Image
                    src="/images/hero-image.png"
                    alt="Hero Image"
                    layout="responsive"
                    width={500}
                    height={500}
                    className=" rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
}