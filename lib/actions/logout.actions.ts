"use server"

// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function logout(){
  
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
        
    const response: any = await fetch(
          "http://localhost/relioo/api/logout.php",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const res = await response.json();
        // console.log(res)
        return(res);
};
