import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/common/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://groomify-e3l3.vercel.app'),
  title: {
    default: "Groomify - Professional Pet Grooming Services",
    template: "%s | Groomify"
  },
  description: "Professional pet grooming services in Da Nang. We offer full grooming, bath & brush, nail trimming for dogs and cats. Book your appointment today!",
  keywords: ["pet grooming", "dog grooming", "cat grooming", "pet care", "Da Nang", "professional grooming", "pet salon"],
  authors: [{ name: "Nguyễn Đắc Quang Lâm" }],
  creator: "Nguyễn Đắc Quang Lâm",
  publisher: "Groomify",
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  openGraph: {
    title: 'Groomify - Pet Grooming Service',
    description: 'Professional pet grooming services made easy',
    url: 'https://groomify-e3l3.vercel.app',
    siteName: 'Groomify',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
    alternateLocale: ['vi_VN'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'G-5Z50EEXG7L',
  },
  category: 'Pet Services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}