"use server"

import { cookies } from "next/headers";



export async function fetchRandomUsers(){
    
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        const response: any = await fetch(
          "http://localhost/Relioo/api/userProfile/randomUsers.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const res = await response.json();
        // const res = await response.text();
        console.log(res);
        return res.data;
        // console.log("commenting on post_id:", post_id);

        
    }catch(error: any){
        throw new Error(`Error fetching random users ${error.message}`)
    }
};
