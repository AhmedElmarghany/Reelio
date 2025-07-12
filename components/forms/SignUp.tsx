"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpUser } from "@/lib/actions/register.actions"
import Image from "next/image"
import { SignInUser } from "@/lib/actions/login.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  email: z.string().min(3, {
    message: "Enter valid Email",
  }),
  password: z.string().min(5, {
    message: "Choose a strong password",
  }),
})

export function SignUp() {
    const [errorInRegisteration, setErrorInRegisteration] = useState<boolean>(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result  = await SignUpUser({ username: data.username, email: data.email, password: data.password });
    if(result.success){
      await SignInUser({ email: data.email, password: data.password })
      router.push("/onboarding")
    } else{
      setErrorInRegisteration(true);
    }
  }

  return (
        <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-5">


            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-100">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a Username" className="no-focus border border-dark-4 bg-dark-3 text-light-1 caret-white " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


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
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </Form>
        {errorInRegisteration && <h1 className="text-red-700 pt-3">Email is already used</h1>}
        </>
  )
}
