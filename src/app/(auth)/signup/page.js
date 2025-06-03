'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Link from 'next/link';
import { FaPaw } from 'react-icons/fa';

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
            {/* Right Signup Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <FaPaw className="text-6xl text-[var(--first-color)] mb-2" />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
                        <p className="text-gray-600">
                            Join Groomify and start managing your pet grooming appointments
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 space-y-4">
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

                    </form>
                    <Button
                        href='/auth/login'
                        type="submit"
                        text="Sign Up"
                        className="flex items-center justify-center"
                    />
                    {/* Login link */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-[var(--first-color)] hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}