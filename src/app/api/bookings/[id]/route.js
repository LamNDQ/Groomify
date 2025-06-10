import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch single booking
export async function GET({ params }) {
    try {
        const id = params?.id;

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Booking ID is required'
            }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id }
        });

        if (!booking) {
            return NextResponse.json({
                success: false,
                error: 'Booking not found'
            }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: booking });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch booking'
        }, { status: 500 });
    }
}

// PUT - Update booking
export async function PUT(request, { params }) {
    try {
        const id = params?.id;
        const body = await request.json();

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Booking ID is required'
            }, { status: 400 });
        }

        const existingBooking = await prisma.booking.findUnique({
            where: { id }
        });

        if (!existingBooking) {
            return NextResponse.json({
                success: false,
                error: 'Booking not found'
            }, { status: 404 });
        }

        // Prepare update data
        const updateData = {
            ...(body.petName && { petName: body.petName.trim() }),
            ...(body.petType && { petType: body.petType.trim() }),
            ...(body.ownerName && { ownerName: body.ownerName.trim() }),
            ...(body.ownerEmail && { ownerEmail: body.ownerEmail.trim() }),
            ...(body.ownerPhone && { ownerPhone: body.ownerPhone.trim() }),
            ...(body.service && { service: body.service.trim() }),
            ...(body.date && { date: new Date(body.date) }),
            ...(body.time && { time: body.time.trim() }),
            ...(body.status && { status: body.status }),
            notes: body.notes?.trim() ?? existingBooking.notes,
            updatedAt: new Date()
        };

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json({
            success: true,
            data: updatedBooking
        });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to update booking',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}

// DELETE - Delete booking
export async function DELETE(request, { params }) {
    try {
        const id = params?.id;

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Booking ID is required'
            }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id }
        });

        if (!booking) {
            return NextResponse.json({
                success: false,
                error: 'Booking not found'
            }, { status: 404 });
        }

        await prisma.booking.delete({
            where: { id }
        });

        return NextResponse.json({
            success: true,
            message: 'Booking deleted successfully'
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to delete booking',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}