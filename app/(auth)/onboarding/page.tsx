"use client"

import '../../globals.css'
import { AccountProfile } from "@/components/forms/AccountProfile";
// import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { useCurrentUserQuery } from "@/lib/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Page = () => {
    const token: string = Cookies.get("token") as string;
    const currentUserData = useSelector((state: RootState) => state.user.user_data)

    const { isLoading } = useCurrentUserQuery(token!, {
    skip: currentUserData !== null, // Skip query if user_data exists
    });

    if (isLoading) return null;
    
    if(currentUserData?.onboarded === "1") redirect("/");

    const userData = {
        name: currentUserData?.name || "",
        username: currentUserData?.user_name || "",
        bio: currentUserData?.bio || "",
        image: currentUserData?.pic_url || "",
    };

    return(
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-2">
            <h1 className="Heading text-[30px]">Onboarding</h1>
            <p className=" mt-3 text-foreground text-[16px]">Complete your profile to continue</p>
            <section className="mt-2 bg-card p-10 rounded-2xl">
                <AccountProfile user={userData} btnTitle='Continue'/>
            </section>
        </main>
    )
}

export default Page;