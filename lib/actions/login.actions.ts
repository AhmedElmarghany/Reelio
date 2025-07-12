"use server"

import { cookies } from "next/headers";

interface SignInUserParams {
  email: String;
  password: String;
}
interface LoginResponse {
  success: Boolean;
  token: string;
  user_data: {
    id: string;
    name: string;
    user_name: string;
    pic_url: string | null;
    email: string;
    password: string;
    birth_date: string;
    join_date: string;
    bio: string;
    onboarded: string;
    api_token: string;
  };
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

    const res: LoginResponse = await response.json();
    if (res.success && res.token){
      (await cookies()).set('token', res.token)
      return{
        success: true,
        onboarded: res.user_data.onboarded
      }
    } else {
      return{
        success: false
      }
    }
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
  
}
