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
import { useRouter } from "next/navigation"
import { SignUpValidation } from "@/lib/validations/user"
import { useRegisterMutation } from "@/lib/features/auth/authApi"
import Spinner from "../icons/Spinner"

export function SignUp() {
    const [register, { isLoading, isError }] = useRegisterMutation();
    const router = useRouter();

    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function handleSubmit(data: z.infer<typeof SignUpValidation>) {
        await register({
            email: data.email,
            password: data.password,
        }).unwrap();

        router.push("/sign-in");
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="w-4/5 space-y-5">


                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter Your email" className="no-focus border border-border bg-input text-foreground" {...field} />
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
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" className="no-focus border border-border bg-input text-foreground" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full font-inter font-bold text-primary-foreground hover:bg-popover" disabled={isLoading}>{isLoading ? <><Spinner size={12}/> wait</> : "Sign Up"}</Button>
                </form>
            </Form>
            {isError && <h1 className="text-destructive pt-3">Email is already used</h1>}
        </>
    )
}
