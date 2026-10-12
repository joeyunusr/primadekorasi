import type {Metadata} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/lib/context/cart-context';
import {IosShell} from '@/components/ios/IosShell';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://primadekorasi.pages.dev'),
  title: 'PT Prima Dekorasi Group - Manufaktur & Supplier Perlengkapan Event B2B',
  description: 'Manufaktur konveksi, tekstil dekorasi, furnitur event, dan rangka tenda untuk kebutuhan bisnis persewaan, vendor, gedung pertemuan, dan perhotelan.',
  icons: {
    icon: [
      { url: 'https://files.catbox.moe/v1fszb.png', href: 'https://files.catbox.moe/v1fszb.png' },
      { url: '/icon.png' },
      { url: '/favicon.ico' },
    ],
    shortcut: 'https://files.catbox.moe/v1fszb.png',
    apple: 'https://files.catbox.moe/v1fszb.png',
  },
  openGraph: {
    title: 'PT Prima Dekorasi Group - Manufaktur & Supplier Perlengkapan Event B2B',
    description: 'Manufaktur konveksi, tekstil dekorasi, furnitur event, dan rangka tenda untuk kebutuhan bisnis persewaan, vendor, gedung pertemuan, dan perhotelan.',
    type: 'website',
    images: ['https://files.catbox.moe/v1fszb.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Prima Dekorasi Group - Manufaktur & Supplier Perlengkapan Event B2B',
    description: 'Manufaktur konveksi, tekstil dekorasi, furnitur event, dan rangka tenda untuk kebutuhan bisnis persewaan, vendor, gedung pertemuan, dan perhotelan.',
    images: ['https://files.catbox.moe/v1fszb.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="bg-white text-[#1D1D1F] font-sans antialiased selection:bg-[#12629F] selection:text-white min-h-screen flex flex-col pb-16 sm:pb-20" suppressHydrationWarning>
        <CartProvider>
          {children}
          <IosShell />
        </CartProvider>
      </body>
    </html>
  );
}

