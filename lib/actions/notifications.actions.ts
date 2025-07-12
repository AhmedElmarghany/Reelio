"use server"

import { cookies } from "next/headers";


export async function fetchNotifications() {
  try {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const options: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }

  };

  const url = "http://localhost/Relioo/api/notifications/get_notifications.php";
  const res = await fetch(url, options);

    
    const data = await res.json();
    return data

  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}
