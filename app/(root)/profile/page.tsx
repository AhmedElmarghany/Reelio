import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";


export default async function Page(){
    const user = await CurrentUser();
    
    if (!user) return null;
    
    // const userInfo = user.userData;
    redirect(`profile/${user.userData?.id}`)
    
}