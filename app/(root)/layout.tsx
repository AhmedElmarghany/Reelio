import type { Metadata } from "next";
import { Lobster, Lora, Inter } from "next/font/google";
import "../globals.css";
import Bottombar from "@/components/shared/Bottombar";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
// font-lobster
// font-lora
// font-inter font-light font-normal font-bold

const lobster = Lobster({
  weight: '400',
  variable: "--font-lobster",
  subsets: ["latin"],
});
const lora = Lora({
  weight: "500",
  variable: "--font-lora",
  subsets: ["latin"],
});
const inter = Inter({
  weight: ["300", "400", "700"],
  variable: "--font-inter",
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
        className={`${lobster.variable} ${lora.variable} ${inter.variable} antialiased`}
      >
        <Topbar />
        
        <main className="flex flex-row lg:px-28 bg-dark-1">
          <LeftSidebar />

          <section className="main-container lg:pr-0">
            <div className="w-full ">
              {/* was like below */}
            {/* <div className="w-full max-w-4xl"> */}
              {children}
            </div>
          </section>

          <RightSidebar />
        </main>

        <Bottombar />
      </body>
    </html>
  );
}




// clerk


// import type { Metadata } from "next";
// import { Lobster, Lora, Inter } from "next/font/google";
// import "../globals.css";
// import Bottombar from "@/components/shared/Bottombar";
// import Topbar from "@/components/shared/Topbar";
// import LeftSidebar from "@/components/shared/LeftSidebar";
// import RightSidebar from "@/components/shared/RightSidebar";
// import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// // font-lobster
// // font-lora
// // font-inter font-light font-normal font-bold

// const lobster = Lobster({
//   weight: '400',
//   variable: "--font-lobster",
//   subsets: ["latin"],
// });
// const lora = Lora({
//   weight: "500",
//   variable: "--font-lora",
//   subsets: ["latin"],
// });
// const inter = Inter({
//   weight: ["300", "400", "700"],
//   variable: "--font-inter",
//   subsets: ["latin"],
// });



// export const metadata: Metadata = {
//   title: "Reelio",
//   description: "Share Your Voice, Shape the Reel",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${lobster.variable} ${lora.variable} ${inter.variable} antialiased`}
//       >
//         <ClerkProvider
//         appearance={{
//           baseTheme: dark,
//           variables: {
//             colorPrimary: "#01BD82",
//           }
//         }}>
//         <Topbar />
        
//         <main className="flex flex-row">
//           <LeftSidebar />

//           <section className="main-container">
//             <div className="w-full max-w-4xl">
//               {children}
//             </div>
//           </section>

//           <RightSidebar />
//         </main>

//         <Bottombar />
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }
