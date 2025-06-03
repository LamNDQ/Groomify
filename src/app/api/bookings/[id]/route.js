import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID is required' },
                { status: 400 }
            );
        }

        const deleted = await prisma.booking.delete({
            where: {
                id: id // Use the ID directly without parsing
            }
        });

        return NextResponse.json({ success: true, data: deleted });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete appointment' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}   