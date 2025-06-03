import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET handler để lấy tất cả appointments
export async function GET() {
    try {
        const appointments = await prisma.booking.findMany({
            orderBy: {
                date: 'desc'
            },
            select: {
                id: true,
                petName: true,
                petType: true,
                ownerName: true,
                ownerEmail: true,
                ownerPhone: true,
                service: true,
                date: true,
                time: true,
                notes: true
            }
        })

        return NextResponse.json(appointments, { status: 200 })
    } catch (error) {
        console.error('❌ Error fetching appointments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch appointments' },
            { status: 500 }
        )
    }
}

// POST handler để tạo appointment mới
export async function POST(req) {
    try {
        const body = await req.json()

        // Validate required fields
        const requiredFields = ['petName', 'ownerName', 'ownerEmail', 'service', 'date', 'time']
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `${field} is required` },
                    { status: 400 }
                )
            }
        }

        const booking = await prisma.booking.create({
            data: {
                ...body,
                date: new Date(body.date)
            }
        })

        return NextResponse.json(
            { success: true, data: booking },
            { status: 201 }
        )
    } catch (error) {
        console.error('❌ Error creating booking:', error)
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}