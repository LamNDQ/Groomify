'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Image */}
            <div className="w-1/2 bg-[url('/images/signup-bg.jpg')] hidden md:block relative">
            </div>

            {/* Right Signup Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <Image src="/groomify-logo.png" alt="Groomify Logo" width={100} height={30} />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
                        <p className="text-gray-600">
                            Join Groomify and start managing your pet grooming appointments
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            className="bg-gray-100"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            className="bg-gray-100"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-100"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="bg-gray-100"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                        <Button
                            href='/auth/login'
                            type="submit"
                            text="Sign Up"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
                        />
                    </form>

                    {/* Login link */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-orange-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}