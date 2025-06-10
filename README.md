# 🐾 Groomify - Pet Grooming Appointment App

Groomify is a modern web application built with **Next.js** and **Tailwind CSS** that helps users **book pet grooming appointments** with ease. It provides a seamless experience for customers and a powerful dashboard for admins to manage bookings, contacts, and faqs.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-green)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)](https://www.postgresql.org/)

Project Link: 
Github: [https://github.com/LamNDQ/Groomify](https://github.com/LamNDQ/Groomify)
Website: [https://groomify-e3l3.vercel.app/](https://groomify-e3l3.vercel.app/)

---

## 👥 Team Members

- Nguyễn Đắc Quang Lâm - 21020002

---

## 📌 Overview

**Groomify** allows pet owners to schedule grooming appointments with just a few clicks. Admins can manage all aspects of the business including services, bookings, and customer accounts. The app is designed to be responsive and user-friendly across all devices.

---

## 🚀 Main Features

### 🏠 Homepage
- Include:
  -- Header
  -- Hero
  -- About us
  -- Services
  -- Packages
  -- Contact
  -- Footer
- Call-to-action buttons to view book appointments
- Responsive design for mobile and desktop

### 📅 Booking System
- Choose grooming services
- Select date and time
- Auto-confirmation and email notifications (if enabled)
- Filter appointments by service, date, pet type, etc.

### Dashboard
- Overall information, lastest contacts, lastest bookings
- View and edit bookings
- View and edit contacts
- View and edit FAQs to show in home page

---

## 🛠️ Admin Features

- 📊 **Dashboard**: Overview of contacts, bookings, faqs
- 📦 **Manage Contacts**: Add, edit, delete contacts
- 🧾 **Manage Appointments**: View, filter, approve, or cancel appointments
- 👥 **Manage FAQs**: Add, edit, delete FAQs

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **React Icons** - UI icons
- **React Hot Toast** - Notifications

### Backend
- **Next.js API Routes** - Backend API
- **Prisma** - ORM
- **PostgreSQL** - Database

## 📸 Screenshots

### User Interface

**Homepage**  
![Homepage](./public/screenshots/homepage.png)

**Service Booking**  
![Booking Modal](./public/screenshots/booking_modal.png)

**Dashboard**  
![Dashboard](./public/screenshots/dashboard.png)

**Manage Bookings**  
![Bookings](./public/screenshots/bookings.png)

**Manage Contacts**  
![Contacts](./public/screenshots/contacts.png)

**Manage FAQs**  
![FAQs](./public/screenshots/faqs.png)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/LamNDQ/groomify.git
cd groomify

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in your environment variables

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```
---

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/groomify"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-email-password"
```
