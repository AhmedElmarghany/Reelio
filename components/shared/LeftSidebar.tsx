"use client"

import Link from "next/link";
import {sidebarLinks} from "@/constants"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import { SignedIn, SignOutButton } from "@clerk/nextjs";

function LeftSidebar(){
    const router = useRouter();
    const pathname = usePathname();    
    return(
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-1 px-2 pr-0">
                {sidebarLinks.map((link)=>{
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return(<>
                    <Link 
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link ${isActive && 'bg-gradient-primary rounded-s-lg border-l-4 border-primary'}`}
                    >
                        <Image 
                            src={link.imgURL} 
                            alt={link.label}
                            className="w-[28px] h-[28px]"
                            width={24}
                            height={24}
                        />
                        <p className="text-light-1 max-lg:hidden">{link.label}</p>
                    </Link>
                    </>
                )})}
                {/* <Link
                        href="/"
                        key="Create a Review"
                        className={`font-inter relative flex justify-center gap-4 mr-4 p-4 bg-primary font-normal rounded-full`}                    
                    >
                        <Image 
                            src="/assets/create.svg"
                            alt="Create"
                            className="max-lg:hidden"
                            width={24}
                            height={24}
                        />

                        <p className="text-light-1 max-lg:hidden">POST</p>
                </Link>  */}
            </div>
            <div className="mt-5 px-6">
                {/* <div className="flex cursor-pointer w-full gap-4 px-0 pr-0">
                    <Image src={"/assets/darkmode.svg"} alt="darkmode" width={24} height={24} />
                    <p className="text-light-2 max-lg:hidden">Dark mode</p>
                </div>   */}
               {/* <SignedIn>
                    <SignOutButton redirectUrl="/sign-in">
                        <div className="flex cursor-pointer w-full gap-4 px-0 pr-0">
                            <Image src={"/assets/logout.svg"} alt="signout" width={24} height={24} />
                            <p className="text-light-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn> */}
                <div className="flex cursor-pointer w-full gap-4 px-0 pr-0" onClick={async () => {
                    try {
                        const res = await fetch("/api/logout", { method: "POST" });
                        const data = await res.json();

                        if (data.success) {
                            router.push("/sign-in"); // ← رجّع المستخدم
                        } else {
                            console.error("Logout failed:", data.error);
                        }
                    } catch (err) {
                        console.error("Logout error:", err);
                    }
                }}>
                    <Image src={"/assets/logout.svg"} alt="signout" width={24} height={24} />
                    <p className="text-light-2 max-lg:hidden">Logout</p>
                </div>
            </div>
        </section>
    )
}

export default LeftSidebar;