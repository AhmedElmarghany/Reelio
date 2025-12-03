import type { Metadata } from "next";
import { Lobster, Inter, DM_Serif_Text } from "next/font/google";
import "../globals.css";
import Providers from "../Providers";

const lobster = Lobster({
  weight: '400',
  variable: "--font-lobster",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Text({
  weight: ["400"],
  variable: "--font-dm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reelio",
  description: "Share Your Voice, Shape the Reel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lobster.variable} ${dmSerif.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
