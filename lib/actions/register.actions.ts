"use server"

interface SignUpUserParams {
  username: String;
  email: String;
  password: String;
}
interface RegisterResponse {
    status: string,
    message: string
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

    const res: RegisterResponse = await response.json();
    if (res.status === "success"){
      return{
        success: true
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
