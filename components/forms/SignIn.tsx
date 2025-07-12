"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInUser } from "@/lib/actions/login.actions"
import { CurrentUser } from "@/lib/actions/currentUser.actions"
import { useState } from "react"
import { redirect, useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.string().min(3, {
    message: "Enter valid Email",
  }),
  password: z.string().min(4, {
    message: "You must enter your password",
  }),
})

export function SignIn() {
  const [errorInLogIn, setErrorInLogIn] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await SignInUser({ email: data.email, password: data.password });
    if(result.success){
      if(result.onboarded === "0"){
        router.push("/onboarding")
      }else{
        router.push("/")
      }
    }else{
      setErrorInLogIn(true)
    }
  }

  return (
      <>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-5">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-100">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter You email" className="no-focus border border-dark-4 bg-dark-3 text-light-1 caret-white " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-100">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" className="no-focus border border-dark-4 bg-dark-3 text-light-1 caret-white " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </Form>
        {errorInLogIn && <h1 className="text-red-700 pt-3">Invalid email or password</h1>}
      </>
  )
}
