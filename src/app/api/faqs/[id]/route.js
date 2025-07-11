import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Xoá một FAQ
export async function DELETE(request, context) {
    try {
        const params = await context.params;
        const faqId = parseInt(params?.id);

        if (isNaN(faqId)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid FAQ ID format'
            }, { status: 400 });
        }

        const deletedFaq = await prisma.faq.delete({
            where: { id: faqId }
        });

        return NextResponse.json({
            success: true,
            message: 'FAQ deleted successfully'
        });

    } catch (error) {
        console.error('Delete error:', error);

        if (error.code === 'P2025') {
            return NextResponse.json({
                success: false,
                error: 'FAQ not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to delete FAQ',
            details: error.message
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// PUT - Cập nhật một FAQ
export async function PUT(request, context) {
    try {
        const params = await context.params;
        const faqId = parseInt(params?.id);
        const data = await request.json();

        if (isNaN(faqId)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid FAQ ID format'
            }, { status: 400 });
        }

        if (!data.question || !data.answer) {
            return NextResponse.json({
                success: false,
                error: 'Question and answer are required'
            }, { status: 400 });
        }

        const updatedFaq = await prisma.faq.update({
            where: { id: faqId },
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category || '',
                isActive: data.isActive ?? true
            }
        });

        return NextResponse.json({
            success: true,
            data: updatedFaq
        });

    } catch (error) {
        console.error('Update error:', error);

        if (error.code === 'P2025') {
            return NextResponse.json({
                success: false,
                error: 'FAQ not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to update FAQ',
            details: error.message
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
