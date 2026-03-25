import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const viewport: Viewport = {
  themeColor: '#FF9900',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Baalvion Operating System (BOS) | Global Trade Infrastructure',
    template: '%s | Baalvion Industries'
  },
  description: 'Baalvion Industries builds the unified global trade infrastructure connecting businesses, finance, compliance, and intelligence systems into a single Baalvion Operating System (BOS).',
  keywords: ['global trade', 'infrastructure', 'logistics', 'compliance AI', 'trade finance', 'Baalvion', 'Baalvion Operating System (BOS)'],
  authors: [{ name: 'Baalvion Industries' }],
  metadataBase: new URL('https://baalvion.nexus'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://baalvion.nexus',
    siteName: 'Baalvion Operating System (BOS)',
    title: 'Baalvion Operating System (BOS) | Unified Global Trade',
    description: 'The foundational layer for the next century of international commerce.',
    images: [
      {
        url: 'https://picsum.photos/seed/baalvion-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Baalvion Operating System (BOS) Global Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baalvion Operating System (BOS) | Unified Global Trade',
    description: 'The foundational layer for the next century of international commerce.',
    images: ['https://picsum.photos/seed/baalvion-og/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground selection:bg-primary/20">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
