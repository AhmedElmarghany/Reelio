"use client"

import Link from "next/link";
import { sidebarLinks, tabletSidebarLinks } from "@/constants"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SidebarUser } from "../cards/SidebarUser";
import LogoutDialog from "../cards/LogoutDialog";
import { useState } from "react";
import type { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

function LeftSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const userData = useSelector((state: RootState)=> state.user.user_data)

    return (
        <section className="custom-scrollbar leftsidebar">
            <Link href="/" className="flex items-center w-fit p-4 ml-3">
                <Image src="/logo.svg" alt="logo" width={24.4} height={24.4}></Image>
            </Link>

            <div className="flex w-full flex-1 flex-col gap-1 px-2 pr-0 max-lg:hidden">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && 'bg-gradient-primary rounded-s-lg border-l-4 border-primary'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                className="w-[21.8px] h-[21.8px] justify-center"
                                width={21.8}
                                height={21.8}
                            />
                            <p className="text-foreground max-lg:hidden">{link.label}</p>
                        </Link>
                    )
                })}
                <Link
                    href="/create-post"
                    key="post"
                    className="flex items-center justify-center bg-primary rounded-full p-3 mt-2 max-w-60 max-lg:hidden"
                >
                    <p className="text-primary-foreground font-semibold text-[18px] max-lg:hidden">Post</p>
                </Link>
            </div>

            <div className="hidden w-full flex-1 flex-col gap-1 px-2 pr-0 max-lg:flex">
                {tabletSidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`p-4 w-fit ${isActive && 'bg-primary rounded-xl'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                className="w-[21.8px] h-[21.8px] justify-center"
                                width={21.8}
                                height={21.8}
                            />
                        </Link>
                    )
                })}
            </div>
            <div className="mt-5 px-6">
                <SidebarUser user={{ name: userData?.name || "Reelio User", username: userData?.user_name || "Reelio User", avatar: userData?.pic_url as string }} setOpen={setOpen} />
                <LogoutDialog open={open} onOpenChange={setOpen} />
            </div>
        </section>
    )
}

export default LeftSidebar;