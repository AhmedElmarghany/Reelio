import PostReview from "@/components/forms/PostReview";
import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";


async function Page(){

    const user = await CurrentUser();
    
    if(!user.isLoggedIn) redirect("/sign-in");

    return (
    <>
        {/* <h1 className="head-text text-primary font-lobster">Post</h1> */}
        <PostReview />
    </>
    );
    }

export default Page;