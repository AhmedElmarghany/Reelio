"use server"

// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addRemoveFollow(user_id: string){
    
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        const response: any = await fetch(
          "http://localhost/Relioo/api/userProfile/userFollowing.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              followed_id: user_id,
            }),
          }
        );

        const res = await response.json();
        console.log(res);
        
    }catch(error: any){
        throw new Error(`Error in following ${error.message}`)
    }
};