import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const status = searchParams.get('status');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const limit = Number(searchParams.get('limit')) || 5; // Changed default to 5

        // Build where clause for bookings
        const where = {};

        if (search) {
            where.OR = [
                { petName: { contains: search, mode: 'insensitive' } },
                { ownerName: { contains: search, mode: 'insensitive' } },
                { ownerEmail: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (status) {
            where.status = status;
        }

        if (dateFrom || dateTo) {
            where.date = {};
            if (dateFrom) where.date.gte = new Date(dateFrom);
            if (dateTo) where.date.lte = new Date(dateTo);
        }

        // Fetch all data concurrently including total counts
        const [
            recentBookings,
            allBookings,
            totalContacts,
            totalFaqs,
            recentContacts
        ] = await Promise.all([
            // Recent bookings (limited)
            prisma.booking.findMany({
                where,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            // All bookings for stats
            prisma.booking.findMany({
                where: {},
                select: { status: true }
            }),
            prisma.contact.count(),
            prisma.faq.count(),
            prisma.contact.findMany({
                take: limit,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        // Calculate booking stats from all bookings
        const pendingBookings = allBookings.filter(b => b.status === 'PENDING').length;
        const confirmedBookings = allBookings.filter(b => b.status === 'CONFIRMED').length;
        const completedBookings = allBookings.filter(b => b.status === 'COMPLETED').length;
        const cancelledBookings = allBookings.filter(b => b.status === 'CANCELLED').length;

        return NextResponse.json({
            success: true,
            data: {
                bookings: recentBookings,
                recentContacts,
                stats: {
                    totalBookings: allBookings.length,
                    totalContacts,
                    totalFaqs,
                    pendingBookings,
                    confirmedBookings,
                    completedBookings,
                    cancelledBookings
                }
            }
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch dashboard data'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}