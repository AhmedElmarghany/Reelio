"use client"
import Notification from "@/components/cards/Notification";
import { fetchNotifications } from "@/lib/actions/notifications.actions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";



export default function Page(){
            const [loading, setLoading] = useState(true);
            const [notificationsList, setNotificationsList] = useState([]);
            
        
            // 1. Get list of favourite IDs from your API
            useEffect(() => {
                const getNotifications = async () => {
                    try {
                        const data = await fetchNotifications(); // API بتاعك
                        setNotificationsList(data);
                        setLoading(false);
                        // console.log(data)
                    } catch (error) {
                        console.error("Error fetching favourite Inotifications:", error);
                    }
                };
        
                getNotifications();
            }, []);

    return (
        <>
            <h1 className="text-heading3-bold text-light-1 mb-4">Notifications</h1>
            {loading && (
                <div className="text-center mt-10 text-primary">
                    <Loader2 className="animate-spin inline mr-2" />
                    Loading ...
                </div>
            )}
            {!loading && notificationsList && (
                <>
                {notificationsList.map((item:any)=>{
                    return(
                    <Notification
                        image_url={item.by_user_pic_url}
                        message={item.message}
                        text={item.post_text}
                        link_href={`/profile/${item.by_user_id}`}
                        create_date={item.created_at}
                        />
                    )    
                })}
                </>
            )}

        </>
    )
}