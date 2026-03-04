import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getswych.com"),
  title: {
    default: "Swych.ai | Transform Your Business with Custom AI Solutions",
    template: "%s | Swych.ai"
  },
  description: "Empower your business growth through intelligent automation. Swych.ai delivers cutting-edge AI chatbots, voice callers, outbound calling, and custom AI agents tailored to your needs.",
  keywords: ["AI solutions", "AI chatbots", "voice AI", "outbound calling", "custom AI agents", "business automation", "Swych.ai", "artificial intelligence", "customer service AI", "lead generation AI"],
  authors: [{ name: "Swych.ai", url: "https://getswych.com" }],
  creator: "Swych.ai",
  publisher: "Swych.ai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getswych.com",
    title: "Swych.ai | Transform Your Business with Custom AI Solutions",
    description: "Empower your business growth through intelligent automation. Swych.ai delivers cutting-edge AI chatbots, voice callers, outbound calling, and custom AI agents.",
    siteName: "Swych.ai",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swych.ai - AI-Powered Business Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swych.ai | Transform Your Business with Custom AI Solutions",
    description: "Empower your business growth through intelligent automation with our cutting-edge AI chatbots and voice AI.",
    images: ["/og-image.jpg"],
    creator: "@swych_ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
