'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Button from '../components/common/Button'

export default function Hero() {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        )

        if (ref.current) observer.observe(ref.current)

        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [])

    return (
        <section
            id="hero"
            ref={ref}
            className={`
                transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24
            `}
        >
            <div className="text-center md:text-left px-4 md:px-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance text-gray-900">
                    Treat your pet to a luxurious{' '}
                    <span className="text-[var(--first-color)]">grooming experience</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto md:mx-0">
                    Luxury pet grooming tailored to pamper your furry companion
                    with care, style, and comfort.
                </p>
                <Button
                    text="Book now"
                    href="#book"
                    className="mt-6 inline-block px-6 py-3 text-lg transition"
                />
            </div>

            <div className="px-4 md:px-0">
                <Image
                    src="/images/hero-image.png"
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className="rounded-3xl shadow-xl w-full h-auto object-cover"
                />
            </div>
        </section>
    )
}
