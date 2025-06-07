import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: faqs
        });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch FAQs' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        console.log('📝 Creating FAQ:', body);

        // Validate required fields
        if (!body.question || !body.answer) {
            return NextResponse.json({
                success: false,
                error: 'Question and answer are required'
            }, { status: 400 });
        }

        const faq = await prisma.faq.create({
            data: {
                question: body.question,
                answer: body.answer,
                category: body.category || '',
                isActive: body.isActive ?? true
            }
        });

        console.log('✅ FAQ created:', faq);
        return NextResponse.json({
            success: true,
            data: faq
        }, { status: 201 });

    } catch (error) {
        console.error('❌ Error creating FAQ:', error);

        // Check for unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json({
                success: false,
                error: 'A FAQ with this question already exists'
            }, { status: 409 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to create FAQ',
            details: error.message
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}