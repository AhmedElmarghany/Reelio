"use client"
import Activity from "@/components/cards/Activity";
import { useGetActivitiesQuery } from "@/lib/features/user/userApi";
import Spinner from "@/components/icons/Spinner";



export default function Page() {
    const { data, isLoading } = useGetActivitiesQuery();

    return (
        <>
            <h1 className="Heading mb-4 mt-6">Activities</h1>
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
                            <Activity
                                action={item.action}
                                message={item.message}
                                {...(item.post_text ? { text: item.post_text } : { text: "" })}
                                link_href={`/post/${item.post_id}`}
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