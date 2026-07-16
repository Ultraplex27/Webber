import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider.client";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webberec.com"),
  title: {
    default: "Webber Electro Corp — Battery Intelligence / 12V—1200V",
    template: "%s — Webber Electro Corp",
  },
  description:
    "Electronics and software engineered in India, powering electric mobility and energy storage worldwide. BMS from 12V to 1200V, 4G/IoT telematics and BESS intelligence.",
  openGraph: {
    siteName: "Webber Electro Corp",
    type: "website",
    images: ["/og/og-default.png"],
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "360x360", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "360x360", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${plexMono.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
