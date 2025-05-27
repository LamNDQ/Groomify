'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

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
        <div className="min-h-screen flex">
            {/* Left Image */}
            <div className="w-1/2 bg-[url('https://dcgll7qxxap6x.cloudfront.net/p/0/2024/9/118cd52e-1bb2-4b94-8f8c-1400be58a0f3.png')] hidden md:block relative">
            </div>

            {/* Right Login Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <Image src="/moego-logo.png" alt="Logo" width={100} height={30} />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
                        <p className="text-gray-600">
                            MoeGo is made with <span className="text-red-500">❤️</span> in <span className="text-yellow-500">🌞</span> California, to empower pet businesses all over the world.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4">
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
                        <Button
                            href='/'
                            type="submit"
                            text="Log in"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
                        />
                    </form>
                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-600">
                        Not a Groomify member? <Link href="/auth/signup" className="text-orange-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}