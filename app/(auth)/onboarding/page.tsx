import { Inter } from "next/font/google";
import '../../globals.css'
import { AccountProfile } from "@/components/forms/AccountProfile";
import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";

const inter = Inter({
  weight: ["300", "400", "700", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

async function Page(){
    const user = await CurrentUser();
    
    if (!user) return null;
    
    const userInfo = user.userData;
    if(user.userData?.onboarded === "1") redirect("/")

    const userData = {
        name: userInfo?.name || user?.userData?.name || "",
        username: userInfo?.user_name || user?.userData?.user_name || "",
        bio: userInfo?.bio || user?.userData?.bio || "",
        image: userInfo?.pic_url || user?.userData?.pic_url || "",
    };
    return(
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10">
            <h1 className="Heading text-[30px]">Onboarding</h1>
            <p className=" mt-3 text-[#71767B] font-inter text-[16px]">Complete your profile to continue</p>
            <section className="mt-2 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle='Continue'/>
            </section>
        </main>
    )
}

export default Page;