import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
                phone: true,
                subject: true,
                createdAt: true
            }
        });
        return NextResponse.json({ data: contacts, count: contacts.length });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name, email, subject, message, phone } = await request.json();

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: 'Name and email are required' },
                { status: 400 }
            );
        }

        const newContact = await prisma.contact.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                subject: subject?.trim() || "No subject",
                phone: phone?.trim() || null
            }
        });

        return NextResponse.json(
            { success: true, data: newContact },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create contact' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const ids = request.nextUrl.searchParams.get('ids')?.split(',').map(Number) || [];
        await prisma.contact.deleteMany({
            where: { id: { in: ids } }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting contacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete contacts' },
            { status: 500 }
        );
    }
}