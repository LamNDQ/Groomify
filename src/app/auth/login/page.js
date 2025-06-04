'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/components/common/Button';
import Input from '@/app/components/common/Input';
import { FaPaw } from 'react-icons/fa';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="max-h-screen flex">
            {/* Left Image */}
            <Image
                src="/images/hero-image.png"
                alt="Hero Image"
                layout="responsive"
                width={400}
                height={300}
                className=" rounded-4xl md:block object-cover"
            />
            {/* w-1/2 hidden md:block object-cover */}

            {/* Right Login Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <FaPaw className="text-6xl text-[var(--first-color)] mb-2" />

                    </div>

                    {/* Welcome Text */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
                        <p className="text-gray-600">
                            Groomify is made with <span className="text-red-500">❤️</span> in <span className="text-yellow-500">🌞</span> VietNam, to empower pet businesses all over the world.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="bg-gray-100"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-100"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </form>
                    <Button
                        href='/'
                        type="submit"
                        text="Log in"
                        className="flex items-center justify-center"
                    />
                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-600">
                        Not a Groomify member? <Link href="/auth/signup" className="text-[var(--first-color)] hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}