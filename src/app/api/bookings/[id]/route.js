import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

// PUT - Update booking
export async function PUT(request, { params }) {
    try {
        const { id } = params
        const body = await request.json()

        // Check if booking exists
        const existingBooking = await prisma.booking.findUnique({
            where: { id }
        })

        if (!existingBooking) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Booking not found'
                },
                { status: 404 }
            )
        }

        // Update booking
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                ...(body.petName && { petName: body.petName.trim() }),
                ...(body.petType && { petType: body.petType }),
                ...(body.ownerName && { ownerName: body.ownerName.trim() }),
                ...(body.ownerEmail && { ownerEmail: body.ownerEmail.toLowerCase().trim() }),
                ...(body.ownerPhone && { ownerPhone: body.ownerPhone.trim() }),
                ...(body.service && { service: body.service }),
                ...(body.date && { date: new Date(body.date) }),
                ...(body.time && { time: body.time }),
                ...(body.notes !== undefined && { notes: body.notes?.trim() || null }),
                ...(body.status && { status: body.status }),
                updatedAt: new Date()
            }
        })

        return NextResponse.json({
            success: true,
            data: updatedBooking,
            message: 'Booking updated successfully'
        })

    } catch (error) {
        console.error('Error updating booking:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update booking',
                details: error.message
            },
            { status: 500 }
        )
    }
}

// DELETE - Delete booking
export async function DELETE(request, { params }) {
    try {
        const { id } = params

        // Check if booking exists
        const existingBooking = await prisma.booking.findUnique({
            where: { id }
        })

        if (!existingBooking) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Booking not found'
                },
                { status: 404 }
            )
        }

        // Delete booking
        await prisma.booking.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'Booking deleted successfully'
        })

    } catch (error) {
        console.error('Error deleting booking:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete booking',
                details: error.message
            },
            { status: 500 }
        )
    }
}