"use server"

// import { revalidatePath } from "next/cache";
// import User from "../models/user.model";
// import { connectToDB } from "../mongoose"
import { cookies } from "next/headers";


interface SignUpUserParams {
  username: String;
  email: String;
  password: String;
}
interface SignInUserParams {
  email: String;
  password: String;
}


export async function SignUpUser({ username, email, password }: SignUpUserParams) {
  try {
    const response: any = await fetch(
      "http://localhost/relioo/api/register.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Reelio User",
          username: username,
          email: email,
          password: password,
          birth_date: "2002-01-12",
          bio: "Reelio Account",
        }),
      }
    );

    const res = await response.json();
    console.log(res)
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}


export async function SignInUser({ email, password }: SignInUserParams) {
  try {
    const response: any = await fetch("http://localhost/Relioo/api/login.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const res = await response.json();
    if (res.success){
      (await cookies()).set('token', res.token)
    } else {
      console.error('Login failed:', res.message);
    }
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
  
  // try {
  //     const response: any = await fetch(
  //       "http://localhost/Relioo/api/currentuser/currentUserData.php",
  //       {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const text = await response.text();
  //     try {
  //       const json = JSON.parse(text);
  //       console.log(json);
  //     } catch (err) {
  //       console.warn("Not JSON response:", text);
  //     }

    
  // } catch (error: any) {
  //   throw new Error(`Failed: ${error.message}`);
  // }

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



export async function CurrentUser() {
  try {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log(" =========================== " + token + " =========================== ")
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

    const res = await response.json();
    console.log(res)
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}


