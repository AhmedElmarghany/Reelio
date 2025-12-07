"use server"

import { cookies } from "next/headers";
import { CurrentUser } from "./currentUser.actions";


export async function fetchProfile(profile_id: string) {
  try {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

    const user = await CurrentUser();
    
    
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      
    };
    if(user.userData?.id !== profile_id) options.body = JSON.stringify({id: profile_id});

  const url = "http://localhost/Relioo/api/userProfile/profile.php";
  const res = await fetch(url, options);

    
    const data = await res.json();
    // console.log("is current user ==================")
    // console.log(data.is_currentuser)
    // console.log("is current user ==================")
    // console.log(data)
    return data

  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}



// export async function fetchProfile(profile_id?: number) {
//   try {
//   const cookieStore = await cookies()
//   const token = cookieStore.get('token')?.value

//   const options: RequestInit = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//     }
//   };
//   if (profile_id) options.body = JSON.stringify({id: profile_id});

//   const url = "http://localhost/Relioo/api/userProfile/profile.php";
//   const res = await fetch(url, options);

    
//     const data = await res.json();


//     console.log(data.is_currentuser)
//     console.log(data)

//   } catch (error: any) {
//     throw new Error(`Failed: ${error.message}`);
//   }
// }


