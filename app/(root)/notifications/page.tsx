"use client"

import Notification from "@/components/cards/Notification";
import Spinner from "@/components/icons/Spinner";
import { useGetNotificationsQuery } from "@/lib/features/user/userApi";

export default function Page() {

    const { data, isLoading } = useGetNotificationsQuery();
    return (
        <>
            <h1 className="Heading mb-4 mt-6">Notifications</h1>
            {isLoading &&
                <div className="flex items-center justify-center gap-2 w-full my-3 text-center">
                    <Spinner size={18} />
                    <p> Loading...</p>
                </div>
            }
            {!isLoading && !data && <p className="no-result">You have no notifications.</p>}
            {!isLoading && data && (
                <>
                    {data.map((item: any) => {
                        return (
                            <Notification
                                image_url={item.by_user_pic_url}
                                message={item.message}
                                text={item.post_text}
                                link_href={`/profile/${item.by_user_id}`}
                                create_date={item.created_at}
                                key={item.id}
                            />
                        )
                    })}
                </>
            )}

        </>
    )
}