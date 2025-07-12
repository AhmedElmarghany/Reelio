import { Inter } from 'next/font/google';
import '../globals.css'
export const metadata = {
  title: "Reelio",
  description: "Share your voice, Shape the reel",
};
const inter = Inter({
  weight: ["300", "400", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return(
        <html lang="en">
          <body className={`${inter.className} bg-black`}>
            {children}
          </body>
        </html>
    )
}




// clerk


// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'
// import { Inter } from 'next/font/google';
// import '../globals.css'
// import { dark } from '@clerk/themes';
// export const metadata = {
// title: "Reelio",
// description: "Share your voice, Shape the reel",
// };
// const inter = Inter({
// weight: ["300", "400", "700"],
// variable: "--font-inter",
// subsets: ["latin"],
// });


// export default function RootLayout({
// children,
// }: {
// children: React.ReactNode;
// }) {
//   return(
//       <ClerkProvider
//       appearance={{
//         baseTheme: dark,
//         variables: {
//           colorPrimary: "#01BD82",
//         }
//       }}>
//       <html lang="en">
//         <body className={`${inter.className} bg-black`}>
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>  
//   )
// }
