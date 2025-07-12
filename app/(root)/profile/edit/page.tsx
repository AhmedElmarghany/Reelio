import { Inter } from "next/font/google";
import '../../../globals.css'
import { AccountProfile } from "@/components/forms/AccountProfile";
import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";
// import { currentUser } from '@clerk/nextjs/server'

const inter = Inter({
  weight: ["300", "400", "700", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

async function Page(){
    const user = await CurrentUser();
    
    if (!user) return null;
    
    const userInfo = user.userData;
    if(!user.userData?.onboarded) redirect("/onboarding");


    const userData = {
        name: userInfo?.name || user?.userData?.name || "",
        username: userInfo?.user_name || user?.userData?.user_name || "",
        bio: userInfo?.bio || user?.userData?.bio || "",
        image: userInfo?.pic_url || user?.userData?.pic_url || "",
    };
    return(
        <main className="mx-auto flex max-w-3xl flex-col justify-start ">
            <h1 className="head-text">Edit profile</h1>
            <p className=" mt-2 font-inter text-base-regular text-neutral-600">Make any changes</p>
            <section className="mt-2 bg-dark-3 p-10 rounded-lg">
                <AccountProfile user={userData} btnTitle='Save Changes'/>
            </section>
        </main>
    )
}

export default Page;