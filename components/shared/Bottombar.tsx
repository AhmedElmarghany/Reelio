"use client"

import {sidebarLinks} from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Bottombar(){
    // const router = useRouter();
    const pathname = usePathname();

    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link)=>{
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return(<Link 
                        href={link.route}
                        key={link.label}
                        className={`bottombar_link ${isActive && 'bg-gradient-primary-to-top rounded-md border-b-4 border-primary p-2'}`}
                    >
                        <Image 
                            src={link.imgURL} 
                            alt={link.label}
                            width={24}
                            height={24}
                        />
                        <p className="text-[12px] font-medium text-foreground max-sm:hidden">{link.label}</p>
                    </Link>
                )})}
            </div>
        </section>
    )
}

export default Bottombar;