import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all bookings
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const status = searchParams.get('status');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const limit = Number(searchParams.get('limit')) || 10;

        // Build where clause
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

        const bookings = await prisma.booking.findMany({
            where,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            data: bookings
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch bookings'
        }, { status: 500 });
    }
}

// POST - Create new booking
export async function POST(request) {
    try {
        const body = await request.json()

        // Validate required fields
        const requiredFields = ['petName', 'petType', 'ownerName', 'ownerEmail', 'ownerPhone', 'service', 'date', 'time']
        const missingFields = requiredFields.filter(field => !body[field])

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Missing required fields: ${missingFields.join(', ')}`
                },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(body.ownerEmail)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid email format'
                },
                { status: 400 }
            )
        }

        // Check for duplicate booking (same email, date, time)
        const existingBooking = await prisma.booking.findFirst({
            where: {
                ownerEmail: body.ownerEmail,
                date: new Date(body.date),
                time: body.time,
                status: {
                    not: 'cancelled'
                }
            }
        })

        if (existingBooking) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'You already have a booking at this date and time'
                },
                { status: 409 }
            )
        }

        // Create new booking
        const booking = await prisma.booking.create({
            data: {
                petName: body.petName.trim(),
                petType: body.petType,
                ownerName: body.ownerName.trim(),
                ownerEmail: body.ownerEmail.toLowerCase().trim(),
                ownerPhone: body.ownerPhone.trim(),
                service: body.service,
                date: new Date(body.date),
                time: body.time,
                notes: body.notes?.trim() || null,
                status: body.status || 'pending'
            }
        })

        return NextResponse.json({
            success: true,
            data: booking,
            message: 'Booking created successfully'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create booking',
                details: error.message
            },
            { status: 500 }
        )
    }
}