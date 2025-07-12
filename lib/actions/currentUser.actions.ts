"use server"

import { cookies } from "next/headers";

interface CurrentUserResponse {
  status: string;
  message: string;
  user_data?: {
    id: string;
    name: string;
    user_name: string;
    pic_url: string;
    email: string;
    password: string;
    birth_date: string;
    join_date: string;
    bio: string;
    onboarded: string;
    api_token: string;
  };
}


export async function CurrentUser() {
  try {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
//   console.log(" =========================== " + token + " =========================== ")
    const response: any = await fetch(
      "http://localhost/Relioo/api/currentuser/currentUserData.php",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    const res: CurrentUserResponse = await response.json();
    if (res.status === "success" && res.user_data){
        return { 
            isLoggedIn: true, 
            userData: res.user_data
        };
    }else{
        return {
            isLoggedIn: false
        };
    }
    // return {status: res.status}
    // return await response.json(); // returns real JSON object

  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}


