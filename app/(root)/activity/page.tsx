"use client"
import Notification from "@/components/cards/Notification";
import { fetchNotifications } from "@/lib/actions/notifications.actions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchActivities } from "@/lib/actions/activities.actions";
import Activity from "@/components/cards/Activity";



export default function Page(){
            const [loading, setLoading] = useState(true);
            const [activitiesList, setActivitiesList] = useState([]);
            
        
            // 1. Get list of favourite IDs from your API
            useEffect(() => {
                const getActivities = async () => {
                    try {
                        const data = await fetchActivities(); // API بتاعك
                        setActivitiesList(data);
                        setLoading(false);
                        // console.log(data)
                    } catch (error) {
                        console.error("Error fetching activities:", error);
                    }
                };
        
                getActivities();
            }, []);

    return (
        <>
            <h1 className="text-heading3-bold text-light-1 mb-4">Activities</h1>
            {loading && (
                <div className="text-center mt-10 text-primary">
                    <Loader2 className="animate-spin inline mr-2" />
                    Loading ...
                </div>
            )}
            {!loading && activitiesList.length == 0 && <p className="no-result">There are no activities yet.</p>}
            {!loading && activitiesList && (
                <>
                {activitiesList.map((item:any)=>{
                    return(
                    <Activity
                        action={item.action}
                        message={item.message}
                        // text={{if(item.post_text)? item.post_text : item.post_text}}
                        {...(item.post_text?  { text: item.post_text }: { text: "" })}
                        link_href={`/post/${item.post_id}`}
                        create_date={item.created_at}
                        />
                    )    
                })}
                </>
            )}

        </>
    )
}
// import Activity from "@/components/cards/Activity";

// export default function Page(){
//     return (
//         <>
//         <h1 className="text-heading3-bold text-light-1 mb-4">Activity</h1>
//             <Activity action={"Follow"} message={"You followed Mostafa"} text={""} link_href={"profile/45"} create_date={"2025-07-01 23:25:38"} />
//             <Activity action={"Like"} message={"You liked ahmed's post"} text={"Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory."} link_href={"/"} create_date={"2025-07-01 23:24:38"} />
//             <Activity action={"Comment"} message={"You commented on ahmed's post"} text={"Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory."} link_href={"/"} create_date={"2025-07-01 23:24:38"} />
//             <Activity action={"Comment"} message={"You commented on ahmed's post"} text={"Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory."} link_href={"/"} create_date={"2025-07-01 23:24:38"} />
//             <Activity action={"Comment"} message={"You commented on ahmed's post"} text={"Racing legend Sonny Hayes is coaxed out"} link_href={"/"} create_date={"2025-07-01 23:40:38"} />
//         </>
//     )
// }