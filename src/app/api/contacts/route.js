import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        // Build where clause
        const where = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { subject: { contains: search, mode: 'insensitive' } },
                { message: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        // Get total count for pagination
        const total = await prisma.contact.count({ where });

        // Get filtered contacts
        const contacts = await prisma.contact.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        });

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch contacts'
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json({
                success: false,
                error: 'All fields are required'
            }, { status: 400 });
        }

        // Create new contact
        const newContact = await prisma.contact.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                subject: subject.trim(),
                message: message.trim(),
                createdAt: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            data: newContact,
            message: 'Contact message sent successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to send message'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
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