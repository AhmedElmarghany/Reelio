import { Lobster, Inter, DM_Serif_Text } from "next/font/google";
import '../globals.css'
import Providers from '../Providers';
export const metadata = {
  title: "Reelio",
  description: "Share your voice, Shape the reel",
};

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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lobster.variable} ${dmSerif.variable} bg-background`}>
        <Providers>
          <main className="bg-background p-10 max-sm:p-4"
            style={{
              height: "100vh",
              width: "100%",
              backgroundImage: `
          linear-gradient(rgba(13,17,16,0.4), rgba(13,17,16,0.4)),
          url('/login-background.png')
        `,
              backgroundSize: "cover",
              backgroundPosition: "left top",
              backgroundRepeat: "no-repeat",
              zIndex: -1
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}