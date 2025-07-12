"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// name
// username
// bio
// image


interface UpdateUserParams {
  name: String;
  username: String;
  bio: String;
  image: String;
  path: string
}

export async function updateUser({ name, username, bio, image, path }: UpdateUserParams) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response: any = await fetch(
      "http://localhost/relioo/api/onboarding.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          username: username,
          image: image,
          bio: bio,
        }),
      }
    );

    if(path === '/profile/edit'){
        revalidatePath(path)
    }    
  
    // const res = await response.json();
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}









// export async function SignInUser({ email, password }: SignInUserParams) {
//   try {
//     const response: any = await fetch(
//       "http://localhost/Relioo/api/login.php",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       }
//     );

//     const res = await response.json();
//     console.log(res)
//   } catch (error: any) {
//     throw new Error(`Failed: ${error.message}`);
//   }
// }

interface PostParams {
movie_id: String ,
text: String ,
title: String , 
rate: Number
}
const session_data = {
    "status": "success",
    "message": "Login successful",
    "user_data": {
        "id": "38",
        "name": "youssef",
        "user_name": "CALIFORNIA",
        "pic_url": null,
        "email": "ahmedel@gmail.com",
        "password": "$2y$10$AOTuVr4qZ9B1X9SvCgR0J.BuwTqy/0M1gMkWzeGllpxFic7Wdxdmq",
        "birth_date": "2002-01-01",
        "join_date": "2025-05-13 03:10:45",
        "bio": "CALIFORNIA",
        "onboarded": "1"
    }
}

// export async function CreatePost({ movie_id , text , title , rate }: PostParams) {
export async function CreatePost() {
  try {
    const response: any = await fetch(
      "http://localhost/Relioo/api/posts/createPost.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session_data}`
        },
        body: JSON.stringify({
          movie_id: "123456" , 
          text: "trytry" , 
          title: "lalaland", 
          rate: 5
        }),
      }
    );

    const res = await response.json();
    console.log(res)
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

