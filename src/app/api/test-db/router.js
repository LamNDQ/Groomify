import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Test database connection
        await prisma.$connect()

        // Count existing bookings
        const count = await prisma.booking.count()

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            bookingCount: count,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Database connection error:', error)
        return NextResponse.json({
            success: false,
            error: 'Database connection failed',
            details: error.message
        }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}