"use client"
import PostReview from "@/components/forms/PostReview";
// import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";
import { useCurrentUserQuery } from "@/lib/features/auth/authApi";

import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";



const Page = () => {
    const token: string = Cookies.get("token") as string;

    if (!token) redirect("/sign-in");

    const currentUserDataRedux = useSelector((state: RootState) => state.user.user_data)

    const { isLoading } = useCurrentUserQuery(token!, {
        skip: currentUserDataRedux !== null, // Skip query if no token
    });

    if (isLoading) return null;


    return (
        <PostReview />
    );
}

export default Page;