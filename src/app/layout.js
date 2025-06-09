import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Groomify",
  description: "Pet care made easy.",
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