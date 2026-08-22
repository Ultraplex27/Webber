import type { Metadata } from "next";
import { Space_Grotesk, Roboto } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider.client";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

// Brand primary typeface is Aguda Black, a paid Graviton font not available
// as a webfont here — Space Grotesk is the free geometric substitute.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webberec.com"),
  title: {
    default: "Webber Electrocorp",
    template: "%s | Webber Electrocorp",
  },
  description:
    "Electronics and software engineered in India, powering electric mobility and energy storage worldwide. BMS from 12V to 1200V and BESS intelligence.",
  openGraph: {
    siteName: "Webber Electrocorp",
    type: "website",
    images: ["/og/og-default.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "360x360", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${roboto.variable}`}
    >
      <body suppressHydrationWarning>
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
