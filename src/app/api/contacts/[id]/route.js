import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_, { params }) {
    try {
        const id = Number(params.id);

        if (!id || isNaN(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid contact ID' },
                { status: 400 }
            );
        }

        const contact = await prisma.contact.findUnique({
            where: { id }
        });

        if (!contact) {
            return NextResponse.json(
                { success: false, error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: contact });

    } catch (error) {
        console.error('Error fetching contact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contact' },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const id = Number(params.id);

        if (!id || isNaN(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid contact ID' },
                { status: 400 }
            );
        }

        const data = await request.json();
        const updated = await prisma.contact.update({
            where: { id },
            data
        });

        return NextResponse.json({ success: true, data: updated });

    } catch (error) {
        console.error('Error updating contact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update contact' },
            { status: 500 }
        );
    }
}

export async function DELETE(_, { params }) {
    try {
        const id = Number(params.id);

        if (!id || isNaN(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid contact ID' },
                { status: 400 }
            );
        }

        await prisma.contact.delete({
            where: { id }
        });

        return NextResponse.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting contact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete contact' },
            { status: 500 }
        );
    }
}