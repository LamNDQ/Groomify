import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT - Update booking
export async function PUT(request, { params }) {
    try {
        const id = params?.id;

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Booking ID is required'
            }, { status: 400 });
        }

        const body = await request.json();

        const existingBooking = await prisma.booking.findUnique({
            where: { id }
        });

        if (!existingBooking) {
            return NextResponse.json({
                success: false,
                error: 'Booking not found'
            }, { status: 404 });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                petName: body.petName,
                petType: body.petType,
                ownerName: body.ownerName,
                ownerEmail: body.ownerEmail,
                ownerPhone: body.ownerPhone,
                service: body.service,
                date: new Date(body.date),
                time: body.time,
                notes: body.notes || null
            }
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
            details: error.message
        }, { status: 500 });
    }
}

// DELETE - Delete booking
export async function DELETE(request, context) {
    try {
        const params = await context.params;
        const id = params?.id;

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Booking ID is required'
            }, { status: 400 });
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
            details: error.message
        }, { status: 500 });
    }
}
