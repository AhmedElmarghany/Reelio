import type { Metadata } from "next";
import { Lobster, Inter, DM_Serif_Text } from "next/font/google";
import "../globals.css";
// import Providers from "../Providers";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";


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
        {/* <Providers> */}
          <main className="flex flex-row lg:px-28 bg-background">
            <LeftSidebar />
            <section className="main-container pt-0 lg:pr-0">
              <div className="w-full">
                <div className="sticky top-0 z-30 flex w-full items-center justify-center bg-slogan-background backdrop-blur-lg pt-2 pb-1 border-border-dark border-opacity-40 border-b max-md:hidden">
                  <div className="font-lobster text-primary text-[30px] leading-[140%] font-semibold max-md:hidden">Share Your Voice, Shape the Reel!</div>
                </div>
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        {/* </Providers> */}
      </body>
    </html>
  );
}