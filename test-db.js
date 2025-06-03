const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
    try {
        await prisma.$connect()
        console.log('✅ Database connected successfully!')

        // Test tạo một booking
        const testBooking = await prisma.booking.create({
            data: {
                petName: 'Buddy',
                petType: 'dog',
                ownerName: 'Test User',
                ownerEmail: 'test@example.com',
                ownerPhone: '0123456789',
                service: 'basic-wash',
                date: new Date(),
                time: '10:00',
                notes: 'Test booking'
            }
        })

        console.log('✅ Test booking created:', testBooking)

    } catch (error) {
        console.error('❌ Database connection failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

testConnection()