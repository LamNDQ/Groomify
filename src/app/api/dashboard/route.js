import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [bookingsCount, contactsCount, faqsCount] = await Promise.all([
            prisma.booking.count(),
            prisma.contact.count(),
            prisma.faq.count()
        ]);

        return NextResponse.json({
            success: true,
            totalBookings: bookingsCount,
            totalContacts: contactsCount,
            totalFaqs: faqsCount
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}